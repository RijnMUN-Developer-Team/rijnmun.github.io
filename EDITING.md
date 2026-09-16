# Editing the RijnMUN website (no coding needed!)

All text on the website lives in our **Google Sheet**. You edit the sheet,
the website updates itself. You never need to touch HTML or code.

> If you can edit a spreadsheet, you can edit the website.

---

## The golden rules

1. **Never rename the first row** (the column headers) of any tab.
2. **Never rename a tab** (the names at the bottom: `settings`, `home`, …).
3. Don't delete other people's rows — you can always add your own.
4. Everything else is fair game: change text, add rows, delete rows.

## Making text look nice

A few simple tricks work everywhere (news, programme, registration…):

| What you type | What visitors see |
|---|---|
| `**important**` | **important** |
| `*notice*` | *notice* |
| `__highlighted__` | highlighted (blue-ish, like elsewhere on the site) |
| `[click here](https://example.com)` | a link: [click here](https://example.com) |
| `^{th}` | a superscript: 20^th^ (as in "20th November") |
| a new line in the cell (`Ctrl`+`Enter`) | a line break on the website |

Anything else you type (normal text) shows up exactly as written.

---

## What each tab does

| Tab | Controls |
|---|---|
| `settings` | Conference dates, the countdown target, fees heading, social media links, the "last updated" date, and the three **registration switches** (see below) |
| `home` | Big headline on the front page, the secretariat message, the three buttons |
| `news` | The "Latest News" box on the front page. Newest first — put a date like `10/05/2026`, and set `visible` to `no` to hide an item without deleting it |
| `registration` | Everything on the Registration page: fees table, each registration section's paragraphs, the notes list, mailing buttons |
| `committees` | The Committees & Issues page. One row per **issue**; repeat the committee name (and chairs) on every row of that committee |
| `programme` | The agenda tables. `day` must be `Friday`, `Saturday` or `Sunday`. `audience` is one of `stoff`, `delegates`, `mundir` or `general` (it colours the time cell). Leave the tab empty to show "To be announced" |
| `board` | Board of Directors photo cards. `group` is `row1` (top row: BoD, SG, Secretariat) or `row2` (the five sectors). Paste an image link into `photo_url` |
| `speakers` | Advisors and guest speakers. `type` must be `advisor` or `speaker`. Empty tab shows "will be announced soon" |
| `general_info` | The General Information page: intro text, guidelines list, the two "how to" lists, resources |
| `venue` | Venue & Leiden page texts |
| `contact` | Address lines and the displayed email address |

## The countdown

The footer countdown reads the `countdown_date` key on the `settings` tab.
You can write the date however you like — for example `20/11/2026`,
`2026-11-20` or `20 November 2026`. Add a time as `... 11:30` to count down
to a specific moment; **without a time it counts down to noon (12:00)**.

Leave `countdown_date` blank and the countdown uses the first date from
`conference_dates` automatically, so you usually don't need to touch it.

## The registration switches

On the `settings` tab you'll find:

| Key | Values | What it does |
|---|---|---|
| `school_reg` | `open` / `closed` / `not_open` | Swaps the text shown in the "School Registrations" box |
| `individual_reg` | `open` / `closed` / `not_open` | Same for "Individual Registrations" |
| `stoff_reg` | `open` / `closed` / `not_open` | Same for "StOff Registrations" |

You edit the wording of each state on the `registration` tab: rows whose
`section` is e.g. `school_open` show when the switch says `open`,
`school_closed` shows when it says `closed`, and `school_notopen` shows when
it says `not_open`.

**Deadlines:** add rows with `section = deadline` (text = the date, extra =
the event, category = a colour like `stoff`/`delegates`) and the Deadlines
table appears automatically. Delete those rows and it goes back to "will be
provided soon".

## Adding photos (Board, Speakers)

1. Upload the photo to **Google Drive**.
2. Right-click the file → *Share* → *Anyone with the link → Viewer*.
3. **Copy the link** and paste it into `photo_url`. The website converts it
   into a viewable image automatically.

Links from any other website (Imgur, the school site, …) work too.

## I broke something!

Don't panic:

- **Google Sheets keeps history** — File → Version history → See version
  history → restore an earlier version.
- If the website ever shows an error message instead of content, Google
  Sheets couldn't be reached. This fixes itself — try again in a few
  minutes. Nothing you edit in the sheet can permanently break the website.
- If something looks permanently wrong, contact the developer team.
