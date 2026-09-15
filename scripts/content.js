/* ==========================================================================
   RijnMUN Sheet Content Engine
   --------------------------------------------------------------------------
   Reads website content from a published Google Sheet and fills it into the
   pages. Editors only ever touch the Google Sheet — no HTML knowledge needed.

   HOW IT WORKS
   1. Each tab of the sheet is fetched as CSV from Google's gviz endpoint
      (the sheet must be shared as "Anyone with the link" + "Publish to web").
   2. The sheet is the single source of truth. While it loads a small
      loading chip is shown. If Google cannot be reached, visitors with a
      previously loaded page see that cached copy; otherwise a clear error
      banner explains what went wrong (connection problem vs sheet
      misconfiguration). Preview the banner with  ?cs-failtest  on any URL.
   3. The DOM is hydrated through data-attributes (see EDITING.md):
        data-cs="settings.conference_dates"   fill text (supports *fmt*)
        data-cs-attr="href:settings.form"     set attribute(s)
        data-cs-img="board.photo_url"         set image src (Drive links ok)
        data-cs-showif="settings.reg=open"    keep only if matches
        data-cs-hideif="settings.reg=closed"  remove if matches
        data-cs-repeat="news"                 render one <template> per row
          + data-cs-where / data-cs-sort / data-cs-limit / data-cs-group
          + inside template: data-cs-col / data-cs-col-attr / data-cs-col-img
                             / data-cs-col-class / data-cs-default
        data-cs-empty="To be announced"       shown when a repeat has no rows
        data-cs-hideempty                     hide element when repeat empty
   ========================================================================== */

/* ==========================================================================
   PART 1 — pure helpers (no DOM). Also exercised by the Node test-suite.
   ========================================================================== */

var CS_SHEET_ID = "1zwSIutFtt_bld4UvOV4sFnVSrzSZm3MZn_aUzu5LzH8"; // ← the published Google Sheet
var CS_CACHE_KEY = "cs_cache_v1";
var CS_FETCH_TIMEOUT = 7000; // ms before we give up on Google

// tabs that hold one key/value pair per row (2 columns: key | value)
var CS_KV_TABS = ["settings", "home", "contact"];
// tabs that hold a list of items (first row = column headers)
var CS_LIST_TABS = ["news", "registration", "committees", "programme",
    "board", "speakers", "general_info", "venue"];

/* RFC-4180 CSV parser: quoted fields, escaped quotes, commas & newlines. */
function csParseCSV(text) {
    var rows = [], row = [], field = "", inQuotes = false, i = 0;
    if (typeof text !== "string") return rows;
    if (text.charCodeAt(0) === 0xFEFF) i = 1; // strip BOM
    for (; i < text.length; i++) {
        var c = text[i];
        if (inQuotes) {
            if (c === '"') {
                if (text[i + 1] === '"') { field += '"'; i++; }
                else { inQuotes = false; }
            } else { field += c; }
        } else if (c === '"') {
            inQuotes = true;
        } else if (c === ",") {
            row.push(field); field = "";
        } else if (c === "\r") {
            /* skip */
        } else if (c === "\n") {
            row.push(field); rows.push(row); row = []; field = "";
        } else {
            field += c;
        }
    }
    row.push(field); rows.push(row);
    return rows;
}

/* CSV text → array of row objects (first non-empty row = headers). */
function csRowsFromCSV(text) {
    var raw = csParseCSV(text).filter(function (r) {
        return r.some(function (cell) { return String(cell).trim() !== ""; });
    });
    if (!raw.length) return [];
    var head = raw[0].map(function (h) {
        return String(h).trim().toLowerCase().replace(/[\s-]+/g, "_");
    });
    return raw.slice(1)
        .map(function (r) {
            var o = {};
            head.forEach(function (h, idx) {
                if (h) o[h] = String(r[idx] == null ? "" : r[idx]).trim();
            });
            return o;
        })
        .filter(function (o) {
            return Object.keys(o).some(function (k) { return o[k] !== ""; });
        });
}

/* key/value rows → plain object */
function csKvFromRows(rows) {
    var o = {};
    (rows || []).forEach(function (r) {
        if (r && r.key) o[r.key] = String(r.value == null ? "" : r.value).trim();
    });
    return o;
}

/* {key:value} → [{key, value}] (used to unify lookups) */
function csObjToRows(obj) {
    return Object.keys(obj || {}).map(function (k) {
        return { key: k, value: String(obj[k] == null ? "" : obj[k]) };
    });
}

/* Follow "settings.fee_delegate" / "news.0.title" through the data tree. */
function csLookup(data, path) {
    if (!path) return undefined;
    var cur = data;
    var parts = String(path).split(".");
    for (var i = 0; i < parts.length; i++) {
        if (cur == null) return undefined;
        if (Array.isArray(cur)) {
            var idx = Number(parts[i]);
            if (isNaN(idx)) return undefined;
            cur = cur[idx];
        } else {
            cur = cur[parts[i]];
        }
    }
    return cur;
}

/* Escape every HTML character before any formatting is applied. */
function csEscape(s) {
    return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

/* Mini-markdown for editors. Input is escaped first, so this is safe.
   **bold**  *italic*  __emphasis__  ^{superscript}  [text](url)  newline→<br> */
function csFormat(raw) {
    var s = csEscape(raw);
    s = s.replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^)\s]+)\)/g,
        function (m, t, u) {
            return '<a href="' + u + '" target="_blank" rel="noopener noreferrer">' + t + "</a>";
        });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/__([^_]+)__/g, '<span class="emphasis">$1</span>');
    s = s.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
    s = s.replace(/\^\{([^}]+)\}/g, "<sup>$1</sup>");
    s = s.replace(/\r?\n/g, "<br>");
    return s;
}

/* Google Drive share links → direct-viewable image URLs. */
function csDirectImage(url) {
    var u = String(url || "").trim(), m;
    if ((m = u.match(/drive\.google\.com\/file\/d\/([\w-]+)/))) {
        return "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w1000";
    }
    if ((m = u.match(/drive\.google\.com\/(?:open|uc)\?(?:\S*&)?id=([\w-]+)/))) {
        return "https://drive.google.com/thumbnail?id=" + m[1] + "&sz=w1000";
    }
    return u;
}

/* Parse common date spellings (dd/mm/yyyy, dd-mm-yyyy, ISO, …). */
function csDate(v) {
    var s = String(v == null ? "" : v).trim(), m;
    if ((m = s.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/))) {
        return new Date(+m[3], +m[2] - 1, +m[1]).getTime();
    }
    var t = Date.parse(s);
    return isNaN(t) ? 0 : t;
}

/* data-cs-where="col:value" row filter (case-insensitive). */
function csWhere(rows, where) {
    if (!where) return rows;
    var ci = where.indexOf(":");
    if (ci < 0) return rows;
    var col = where.slice(0, ci).trim();
    var val = where.slice(ci + 1).trim().toLowerCase();
    return rows.filter(function (r) {
        return String(r[col] == null ? "" : r[col]).trim().toLowerCase() === val;
    });
}

/* data-cs-sort="date:desc" */
function csSortRows(rows, spec) {
    if (!spec) return rows;
    var bits = spec.split(":"), col = bits[0].trim(), dir = (bits[1] || "").trim();
    var mul = dir === "desc" ? -1 : 1;
    return rows.slice().sort(function (a, b) {
        return (csDate(a[col]) - csDate(b[col])) * mul;
    });
}

/* Group rows by a column, preserving first-appearance order. */
function csGroup(rows, col) {
    var order = [], map = {};
    rows.forEach(function (r) {
        var k = String(r[col] == null ? "" : r[col]).trim();
        if (!map[k]) { map[k] = []; order.push(k); }
        map[k].push(r);
    });
    return order.map(function (k) { return { key: k, rows: map[k] }; });
}

/* Is a whole row blank? */
function csRowEmpty(r) {
    return !Object.keys(r || {}).some(function (k) {
        return k !== "visible" && String(r[k]).trim() !== "";
    });
}

// __TEST_CUT__ (everything below touches the DOM)

/* ==========================================================================
   PART 2 — DOM hydration
   ========================================================================== */

(function () {
    if (typeof document === "undefined") return; // Node test mode

    var CS = {
        data: null,
        source: "none",
        ready: false,
        // exposed for the Node test-suite:
        _test: { hydrate: hydrate, setData: function (d) { CS.data = d; } }
    };
    window.CS = CS;

    /* ---------- low-level bind helpers ---------- */

    function isBlank(v) { return v == null || String(v).trim() === ""; }

    function bindText(el, value) {
        var def = el.getAttribute("data-cs-default");
        if (isBlank(value)) {
            // during a total outage, elements marked data-cs-failure-keep
            // keep the static text that ships in the HTML (e.g. the site
            // title on the front page) instead of being hidden
            if (CS.errorCause && el.hasAttribute("data-cs-failure-keep")) return;
            if (def != null) { el.innerHTML = csFormat(def); return; }
            el.style.display = "none";
            return;
        }
        el.innerHTML = csFormat(value);
    }

    /* "href:settings.form target:_blank" → set each attr; blank = leave as-is */
    function applyAttr(el, spec, row, colPrefix) {
        spec.split(/\s+/).forEach(function (pair) {
            if (!pair) return;
            var ci = pair.indexOf(":");
            if (ci < 0) return;
            var attr = pair.slice(0, ci), path = pair.slice(ci + 1);
            var v = colPrefix ? row[path] : csLookup(CS.data, path);
            if (!isBlank(v)) el.setAttribute(attr, String(v).trim());
        });
    }

    function bindImg(el, v) {
        if (isBlank(v)) return; // keep the default placeholder in the HTML
        el.setAttribute("src", csDirectImage(v));
    }

    function bindClasses(el, v) {
        if (isBlank(v)) return;
        String(v).split(/[\s,]+/).forEach(function (c) {
            if (c) el.classList.add(c);
        });
    }

    function emptyAlert(el, msg) {
        el.removeAttribute("href");
        el.removeAttribute("target");
        el.style.cursor = "pointer";
        el.addEventListener("click", function (e) {
            e.preventDefault();
            alert(msg || "This link is not available yet.");
        });
    }

    /* ---------- repeats ---------- */

    function hydrateRepeat(container, scope) {
        var path = container.getAttribute("data-cs-repeat");
        var groupCol = container.getAttribute("data-cs-group");
        var where = container.getAttribute("data-cs-where");
        var sort = container.getAttribute("data-cs-sort");
        var limit = parseInt(container.getAttribute("data-cs-limit") || "", 10);
        var overflowSel = container.getAttribute("data-cs-overflow");
        var visibleCount = parseInt(container.getAttribute("data-cs-visible") || "", 10);
        var tmpl = container.querySelector("template[data-cs-item]");
        if (!tmpl) return;

        var rows = scope ? scope.rows : csLookup(CS.data, path);
        if (!Array.isArray(rows)) rows = [];
        rows = rows.filter(function (r) { return !csRowEmpty(r); });
        rows = csWhere(rows, where);
        rows = csSortRows(rows, sort);
        rows = rows.filter(function (r) {
            return String(r.visible == null ? "yes" : r.visible).trim().toLowerCase() !== "no";
        });

        // remove previously rendered items (keeps repeat idempotent)
        Array.prototype.slice.call(
            container.querySelectorAll("[data-cs-rendered]")
        ).forEach(function (n) { n.remove(); });

        var overflowEl = overflowSel ? document.querySelector(overflowSel) : null;
        if (overflowEl) {
            Array.prototype.slice.call(
                overflowEl.querySelectorAll("[data-cs-rendered]")
            ).forEach(function (n) { n.remove(); });
        }

        var rendered = 0;

        if (groupCol) {
            csGroup(rows, groupCol).forEach(function (g) {
                var frag = tmpl.content.cloneNode(true);
                container.appendChild(frag);
                // the group node is the last element child we just appended
                var kids = Array.prototype.filter.call(container.children, function (c) {
                    return c.tagName !== "TEMPLATE";
                });
                el = kids[kids.length - 1];
                if (!el) return;
                el.setAttribute("data-cs-rendered", "1");
                rendered++;

                var keyEl = el.querySelector("[data-cs-group-key]");
                if (keyEl) keyEl.innerHTML = csFormat(g.key);
                Array.prototype.slice.call(
                    el.querySelectorAll("[data-cs-group-col]")
                ).forEach(function (e) {
                    bindText(e, g.rows[0][e.getAttribute("data-cs-group-col")]);
                });
                Array.prototype.slice.call(
                    el.querySelectorAll("[data-cs-group-attr]")
                ).forEach(function (e) {
                    applyAttr(e, e.getAttribute("data-cs-group-attr"), g.rows[0], true);
                });

                var inner = el.querySelector("[data-cs-group-rows]");
                if (inner) hydrateRepeat(inner, { rows: g.rows });

                hydrateRowBindings(el, g.rows[0], true);
            });
        } else {
            rows.forEach(function (row, i) {
                var frag = tmpl.content.cloneNode(true);
                container.appendChild(frag);
                var kids = Array.prototype.filter.call(container.children, function (c) {
                    return c.tagName !== "TEMPLATE";
                });
                var el = kids[kids.length - 1];
                if (!el) return;
                el.setAttribute("data-cs-rendered", "1");
                var target = overflowEl && !isNaN(visibleCount) && i >= visibleCount
                    ? overflowEl : container;
                if (target !== container) target.appendChild(el);
                rendered++;

                hydrateRowBindings(el, row, false);
            });
        }

        // empty-state handling ("parent" scope lets the empty text live
        // next to e.g. a <table> that is itself the repeat container)
        var emptyRoot = container.getAttribute("data-cs-empty-scope") === "parent"
            ? container.parentElement : container;
        var emptyEls = Array.prototype.filter.call(
            emptyRoot.querySelectorAll("[data-cs-empty]"),
            function (e) { return !e.closest("template"); }
        );
        emptyEls.forEach(function (e) {
            e.style.display = rendered === 0 ? "" : "none";
        });
        if (rendered === 0 && container.hasAttribute("data-cs-hideempty")) {
            container.style.display = "none";
        }
    }

    /* selector match on root itself + descendants */
    function selfAndDescendants(root, selector) {
        var out = Array.prototype.slice.call(root.querySelectorAll(selector));
        if (root.matches && root.matches(selector)) out.unshift(root);
        return out;
    }

    /* data-cs-col / -col-attr / -col-img / -col-class bindings inside a clone */
    function hydrateRowBindings(root, row, isGroup) {
        selfAndDescendants(root, "[data-cs-col]").forEach(function (el) {
            bindText(el, row[el.getAttribute("data-cs-col")]);
        });
        selfAndDescendants(root, "[data-cs-col-attr]").forEach(function (el) {
            applyAttr(el, el.getAttribute("data-cs-col-attr"), row, true);
            if (el.hasAttribute("data-cs-emptyalert") && isBlank(el.getAttribute("href"))) {
                emptyAlert(el, el.getAttribute("data-cs-emptyalert"));
            }
        });
        selfAndDescendants(root, "[data-cs-col-img]").forEach(function (el) {
            bindImg(el, row[el.getAttribute("data-cs-col-img")]);
        });
        selfAndDescendants(root, "[data-cs-col-class]").forEach(function (el) {
            bindClasses(el, row[el.getAttribute("data-cs-col-class")]);
        });
        if (!isGroup) {
            selfAndDescendants(root, "[data-cs-col-showif]").forEach(function (el) {
                var spec = el.getAttribute("data-cs-col-showif") || "";
                var ci = spec.indexOf("=");
                if (ci < 0) return;
                var col = spec.slice(0, ci).trim();
                var val = spec.slice(ci + 1).trim().toLowerCase();
                var actual = String(row[col] == null ? "" : row[col]).trim().toLowerCase();
                el.style.display = actual === val ? "" : "none";
            });
        }
    }

    /* ---------- whole-page hydration ---------- */

    function hydrate() {
        if (!CS.data) return;

        // repeating containers (skip ones living inside templates)
        Array.prototype.slice.call(
            document.querySelectorAll("[data-cs-repeat]")
        ).forEach(function (c) {
            if (c.closest("template")) return;
            hydrateRepeat(c, null);
        });

        // scalar text
        Array.prototype.slice.call(
            document.querySelectorAll("[data-cs]")
        ).forEach(function (el) {
            if (el.closest("template")) return;
            bindText(el, csLookup(CS.data, el.getAttribute("data-cs")));
        });

        // attributes on static elements
        Array.prototype.slice.call(
            document.querySelectorAll("[data-cs-attr]")
        ).forEach(function (el) {
            if (el.closest("template")) return;
            applyAttr(el, el.getAttribute("data-cs-attr"), null, false);
        });

        // images
        Array.prototype.slice.call(
            document.querySelectorAll("[data-cs-img]")
        ).forEach(function (el) {
            if (el.closest("template")) return;
            bindImg(el, csLookup(CS.data, el.getAttribute("data-cs-img")));
        });

        // conditional visibility
        Array.prototype.slice.call(
            document.querySelectorAll("[data-cs-showif],[data-cs-hideif]")
        ).forEach(function (el) {
            if (el.closest("template")) return;
            ["data-cs-showif", "data-cs-hideif"].forEach(function (kind) {
                var spec = el.getAttribute(kind);
                if (!spec) return;
                var ci = spec.indexOf("=");
                if (ci < 0) return;
                var actual = String(
                    csLookup(CS.data, spec.slice(0, ci).trim()) == null
                        ? "" : csLookup(CS.data, spec.slice(0, ci).trim())
                ).trim().toLowerCase();
                var want = spec.slice(ci + 1).trim().toLowerCase();
                var match = actual === want;
                var shouldShow = kind === "data-cs-showif" ? match : !match;
                el.style.display = shouldShow ? "" : "none";
            });
        });
    }

    /* ---------- loading indicator ----------
       A small status chip shown while sheet content loads, so a slow
       connection never looks like a broken page. Only appears after a
       short delay to avoid flashing on fast connections. */

    var CS_LOADER_SHOW_DELAY = 300; // ms
    var loaderEl = null, loaderTimer = null;

    var CS_LOADER_CSS =
        "#cs-loader{position:fixed;bottom:18px;right:18px;z-index:99999;" +
        "display:flex;align-items:center;gap:10px;padding:10px 18px;" +
        'font-family:"Open Sans",Arial,sans-serif;font-size:14px;color:#fff;' +
        "background:#235690;border-radius:24px;box-shadow:0 4px 16px rgba(0,0,0,.3);" +
        "transition:opacity .4s;}" +
        "#cs-loader.cs-error{background:#9e3b3b;max-width:280px;}" +
        "#cs-loader .cs-spin{width:15px;height:15px;flex:none;" +
        "border:2px solid rgba(255,255,255,.35);border-top-color:#fff;" +
        "border-radius:50%;animation:cs-spin .8s linear infinite;}" +
        "#cs-loader.cs-error .cs-spin{display:none;}" +
        "#cs-loader.cs-done{opacity:0;pointer-events:none;}" +
        "@keyframes cs-spin{to{transform:rotate(360deg);}}" +
        "@media (prefers-reduced-motion:reduce){#cs-loader .cs-spin{animation-duration:1.6s;}}";

    function csLoaderEnsure(error, text) {
        if (loaderEl) {
            if (text) {
                var textEl = loaderEl.querySelector(".cs-loader-text");
                if (textEl) textEl.textContent = text;
            }
            return loaderEl;
        }
        var style = document.createElement("style");
        style.textContent = CS_LOADER_CSS;
        document.head.appendChild(style);
        loaderEl = document.createElement("div");
        loaderEl.id = "cs-loader";
        loaderEl.setAttribute("data-nosnippet", "");
        loaderEl.setAttribute("role", "status");
        loaderEl.setAttribute("aria-live", "polite");
        loaderEl.className = error ? "cs-error" : "";
        loaderEl.innerHTML = '<span class="cs-spin"></span>' +
            '<span class="cs-loader-text">' + (text || "Loading content\u2026") + "</span>";
        document.body.appendChild(loaderEl);
        return loaderEl;
    }

    function csLoader(action, cause) {
        if (action === "show") {
            if (loaderTimer) return;
            loaderTimer = setTimeout(function () {
                loaderTimer = null;
                csLoaderEnsure(false);
            }, CS_LOADER_SHOW_DELAY);
        } else if (action === "error") {
            if (loaderTimer) { clearTimeout(loaderTimer); loaderTimer = null; }
            csLoaderEnsure(true, csChipText(cause));
        } else { // hide
            if (loaderTimer) { clearTimeout(loaderTimer); loaderTimer = null; }
            if (loaderEl) loaderEl.classList.add("cs-done");
        }
    }

    /* ---------- total-failure banner ----------
       If the sheet and the browser cache both fail, replace the page's
       main content container with a prominent apology — including the
       diagnosed cause. */

    var CS_ERROR_CSS =
        /* width:100% + flex:none + auto margins keep the banner centered
           no matter how a page lays out .container (index.html uses flex) */
        "#cs-error-banner{width:100%;max-width:640px;margin:40px auto;flex:none;" +
        "padding:28px 32px;" +
        'font-family:"Open Sans",Arial,sans-serif;text-align:center;color:#333;' +
        "background:#fdf2f2;border:1px solid #e5b8b8;border-left:6px solid #9e3b3b;" +
        "border-radius:10px;box-shadow:0 4px 16px rgba(0,0,0,.08);}" +
        "#cs-error-banner h2{color:#9e3b3b;margin:0 0 12px;font-size:22px;}" +
        "#cs-error-banner h2 i{margin-right:8px;}" +
        "#cs-error-banner p{margin:8px 0;line-height:1.5;}" +
        "#cs-error-banner .cs-cause{font-size:14px;color:#555;background:#fff;" +
        "border:1px solid #e5b8b8;border-radius:8px;padding:10px 14px;margin:14px 0;}" +
        "#cs-error-banner a{color:#235690;font-weight:600;}" +
        "#cs-error-banner button{margin-top:14px;padding:10px 22px;border:none;" +
        "border-radius:20px;background:#235690;color:#fff;" +
        'font-family:inherit;font-size:14px;cursor:pointer;}' +
        "#cs-error-banner button:hover{background:#1a4270;}";

    function csErrorBanner(cause) {
        if (document.getElementById("cs-error-banner")) return;
        var style = document.createElement("style");
        style.textContent = CS_ERROR_CSS;
        document.head.appendChild(style);

        var banner = document.createElement("div");
        banner.id = "cs-error-banner";
        banner.setAttribute("data-nosnippet", "");
        banner.setAttribute("role", "alert");
        banner.innerHTML =
            "<h2><i class=\"fa fa-exclamation-triangle\"></i>Something went wrong</h2>" +
            "<p>An internal error occurred while loading the content of this page. " +
            "We are very sorry for the inconvenience!</p>" +
            "<p class=\"cs-cause\">" + csFormat(csCauseMessage(cause)) + "</p>" +
            "<p>You can try to email us at <a href=\"mailto:info@rijnmun.org\">info@rijnmun.org</a> if you have any questions, " +
            "or if this error isn\u2019t fixed soon.</p>" +
            "<button type=\"button\" onclick=\"location.reload()\">Refresh the page</button>";

        // wipe the page's main content container and show only the banner
        var container = document.querySelector("main .container") ||
            document.querySelector("main") || document.body;
        container.innerHTML = "";
        container.appendChild(banner);
    }

    /* ---------- data loading ---------- */

    function fetchTab(tab) {
        var url = "https://docs.google.com/spreadsheets/d/" + CS_SHEET_ID +
            "/gviz/tq?tqx=out:csv&headers=1&sheet=" + encodeURIComponent(tab);
        var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
        var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, CS_FETCH_TIMEOUT);
        return fetch(url, ctrl ? { signal: ctrl.signal } : undefined)
            .then(function (res) {
                if (!res.ok) {
                    var httpErr = new Error("HTTP " + res.status + " for tab " + tab);
                    httpErr.code = res.status === 404 ? "not_found"
                        : (res.status === 403 || res.status === 401) ? "forbidden"
                        : "other";
                    throw httpErr;
                }
                return res.text();
            })
            .then(function (text) {
                // an unpublished sheet answers with the sign-in page, not CSV
                var t = String(text).trim();
                if (/^<!doctype|^<html/i.test(t)) {
                    var pubErr = new Error("Sheet tab \"" + tab + "\" is not published to the web");
                    pubErr.code = "not_published";
                    throw pubErr;
                }
                return text;
            })
            .then(function (text) { return csRowsFromCSV(text); })
            .catch(function (e) {
                if (e && e.code) throw e;
                if (e && e.name === "AbortError") e.code = "timeout";
                else if (typeof TypeError !== "undefined" && e instanceof TypeError) e.code = "network";
                else e.code = "other";
                throw e;
            })
            .finally(function () { clearTimeout(timer); });
    }

    function shapeData(tabRows) {
        var data = {};
        CS_KV_TABS.forEach(function (t) {
            if (tabRows[t] != null) data[t] = csKvFromRows(tabRows[t]);
        });
        CS_LIST_TABS.forEach(function (t) {
            if (tabRows[t] != null) data[t] = tabRows[t];
        });
        return data;
    }

    /* Reduce per-tab failure codes to one human-explainable cause. */
    function csClassifyError(err) {
        var codes = (err && err.csCodes) || [(err && err.code) || "other"];
        var priority = ["not_published", "not_found", "forbidden",
            "timeout", "network", "other"];
        for (var i = 0; i < priority.length; i++) {
            if (codes.indexOf(priority[i]) !== -1) return priority[i];
        }
        return "other";
    }

    var CS_ERROR_MESSAGES = {
        network: "**Google Sheets could not be reached.** This is usually temporary \u2014 it may be your internet connection, or Google may be briefly down. Please try again in a few minutes.",
        timeout: "**Google Sheets took too long to respond.** This is usually temporary \u2014 please try again in a few minutes.",
        not_published: "**The content sheet is not published to the web.** In Google Sheets, use File \u2192 Share \u2192 Publish to web.",
        not_found: "**The content sheet could not be found.** It may have been deleted, or the sheet ID in the website configuration is incorrect.",
        forbidden: "**The content sheet is not publicly accessible.** Its sharing settings may have been changed \u2014 set it to \u201cAnyone with the link\u201d.",
        not_configured: "**The website\u2019s content source is not configured.** The sheet ID is missing from the website settings.",
        test: "This is a simulated failure for testing purposes (?cs-failtest in the address bar).",
        other: "**The content could not be loaded from Google Sheets.**"
    };

    function csCauseMessage(cause) {
        return CS_ERROR_MESSAGES[cause] || CS_ERROR_MESSAGES.other;
    }

    function csChipText(cause) {
        if (cause === "network" || cause === "timeout") {
            return "Content couldn\u2019t be loaded \u2014 check your connection and refresh the page.";
        }
        if (cause === "test") {
            return "Simulated failure (?cs-failtest) \u2014 content could not be loaded.";
        }
        return "The content is temporarily unavailable. Please try again later.";
    }

    function loadCache() {
        try {
            var raw = localStorage.getItem(CS_CACHE_KEY);
            return raw ? JSON.parse(raw).data : null;
        } catch (e) { return null; }
    }

    function cacheData(data) {
        try { localStorage.setItem(CS_CACHE_KEY, JSON.stringify({ ts: Date.now(), data: data })); }
        catch (e) { /* storage full/blocked — not fatal */ }
    }

    function tabsMissing(data) {
        var all = CS_KV_TABS.concat(CS_LIST_TABS);
        return all.filter(function (t) { return data[t] == null; });
    }

    function loadGoogle() {
        if (!CS_SHEET_ID) return Promise.resolve(null); // not configured
        var allTabs = CS_KV_TABS.concat(CS_LIST_TABS);
        return Promise.all(allTabs.map(function (t) {
            return fetchTab(t).then(
                function (rows) { return { tab: t, rows: rows }; },
                function (e) { return { tab: t, error: e }; }
            );
        })).then(function (results) {
            var failures = results.filter(function (r) { return r.error; });
            if (failures.length) {
                var err = new Error("Could not load sheet tabs: " +
                    failures.map(function (f) {
                        return f.tab + " (" + (f.error.code || "error") + ")";
                    }).join(", "));
                err.csCodes = failures.map(function (f) {
                    return (f.error && f.error.code) || "other";
                });
                throw err;
            }
            var map = {};
            results.forEach(function (r) { map[r.tab] = r.rows; });
            return map;
        });
    }

    /* Dev/testing hook: append ?cs-failtest to any page URL to preview the
       total-failure experience (error banner) without editing any files. */
    function csFailTestRequested() {
        try {
            return /(?:^\?|&)cs-failtest(?:=|&|$)/.test(window.location.search || "");
        } catch (e) { return false; }
    }
    var CS_FAIL_TEST = false; // overridable constant (used by the test harness)

    function boot() {
        csLoader("show");
        var acquire;
        if (CS_FAIL_TEST || csFailTestRequested()) {
            acquire = Promise.resolve({ data: {}, source: "none", cause: "test" });
        } else if (!CS_SHEET_ID) {
            acquire = Promise.resolve({ data: {}, source: "none", cause: "not_configured" });
        } else {
            acquire = loadGoogle()
                .then(function (google) {
                    // the sheet answered: it is the single source of truth
                    var data = shapeData(google);
                    CS.source = "google";
                    cacheData(data);
                    return { data: data, source: "google" };
                })
                .catch(function (e) {
                    // Google could not be used → last resort: the visitor's
                    // cached copy from an earlier successful load
                    var cause = csClassifyError(e);
                    if (typeof console !== "undefined" && console.error) {
                        console.error("RijnMUN content engine:", (e && e.message) || e);
                    }
                    var cached = loadCache();
                    var usable = cached && Object.keys(cached).length;
                    return usable
                        ? { data: cached, source: "cache", cause: cause }
                        : { data: {}, source: "none", cause: cause };
                });
        }
        return acquire
            .then(function (r) {
                CS.source = r.source;
                CS.data = r.data || {};
                CS.errorCause = r.cause || null;
            })
            .catch(function (e) {
                // absolute safety net: any unexpected failure ends in the
                // error state instead of a stuck loading chip
                if (typeof console !== "undefined" && console.error) {
                    console.error("RijnMUN content engine:", e);
                }
                CS.data = {};
                CS.source = "none";
                CS.errorCause = "other";
            })
            .then(function () {
                try {
                    hydrate();
                } catch (e) {
                    // a hydration bug must never leave a stuck spinner behind
                    if (typeof console !== "undefined" && console.error) {
                        console.error("RijnMUN content engine:", e);
                    }
                    CS.source = "error";
                }
                CS.ready = true;
                var failed = (CS.source === "none" || CS.source === "error");
                if (failed) {
                    csLoader("error", CS.errorCause);
                    csErrorBanner(CS.errorCause);
                } else {
                    csLoader("hide");
                }
                document.dispatchEvent(new CustomEvent("cs:ready"));
            });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
