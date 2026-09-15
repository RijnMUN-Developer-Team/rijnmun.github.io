/**
 * RijnMUN website — one-time Google Sheet builder
 * ================================================
 * Creates the complete content spreadsheet (all tabs, current data,
 * formatting, dropdowns and link-sharing) in your Google Drive.
 *
 * HOW TO RUN (2 minutes)
 * 1. Open https://script.google.com and click "+ New project"
 * 2. Delete the sample code, then paste this ENTIRE file
 * 3. Press "Run" (▶) with the function  createRijnMUNSheet  selected,
 *    and approve the permission prompt (it only creates one file in
 *    your Drive and changes nothing else)
 * 4. When it finishes, open View → Logs for the spreadsheet link
 * 5. In the new sheet: File → Share → Publish to web → Publish
 * 6. Copy the Sheet ID from the URL (the long code between /d/ and /edit)
 *    into  scripts/content.js  →  var CS_SHEET_ID = "..."
 *
 * After that, editing the sheet edits the website. See EDITING.md.
 */

var ORDER = ["settings","home","news","registration","committees","programme","board","speakers","general_info","venue","contact"];

var COLS = {
  "news": [
    "date",
    "title",
    "text",
    "visible"
  ],
  "registration": [
    "section",
    "text",
    "category",
    "extra",
    "visible",
    "link_url"
  ],
  "committees": [
    "committee",
    "chairs",
    "issue",
    "code",
    "report_url"
  ],
  "programme": [
    "day",
    "time",
    "event",
    "audience"
  ],
  "board": [
    "group",
    "photo_url",
    "names",
    "role"
  ],
  "speakers": [
    "type",
    "name",
    "role",
    "expertise",
    "description",
    "photo_url"
  ],
  "general_info": [
    "section",
    "text"
  ],
  "venue": [
    "section",
    "text"
  ]
};

var VALIDATIONS = {
  "news": {
    "visible": [
      "yes",
      "no"
    ]
  },
  "programme": {
    "day": [
      "Friday",
      "Saturday",
      "Sunday"
    ],
    "audience": [
      "stoff",
      "delegates",
      "mundir",
      "general"
    ]
  },
  "board": {
    "group": [
      "row1",
      "row2"
    ]
  },
  "speakers": {
    "type": [
      "advisor",
      "speaker"
    ]
  },
  "registration": {
    "section": [
      "fees",
      "fee_notes",
      "school_open",
      "school_notopen",
      "school_closed",
      "individual_open",
      "individual_notopen",
      "individual_closed",
      "stoff_open",
      "stoff_notopen",
      "stoff_closed",
      "rlo",
      "note",
      "mailing",
      "deadline"
    ],
    "category": [
      "delegate",
      "stoff",
      "director",
      "other"
    ]
  },
  "general_info": {
    "section": [
      "about_intro",
      "about_more",
      "guidelines",
      "guides_delegate",
      "guides_chair",
      "resources_left",
      "resources_right_links",
      "resources_outro"
    ]
  }
};

var INSTRUCTIONS = [
  "RijnMUN Website Content — READ ME FIRST",
  "",
  "Full editor guide: EDITING.md in the website repository.",
  "",
  "The golden rules",
  "1. Never rename the first row (the column headers) of any tab.",
  "2. Never rename the tabs (settings, home, news, ...).",
  "3. Everything else is fair game: edit text, add rows, delete rows.",
  "",
  "Making text look nice",
  "**bold**   *italic*   __highlighted__   [link text](https://example.com)   ^{superscript}",
  "A new line inside a cell (Ctrl+Enter) becomes a line break on the website.",
  "",
  "What each tab does",
  "settings — dates, fees heading, social links, the 3 registration switches (open / closed / not_open)",
  "home — front page headline, secretariat message, the 3 buttons",
  "news — Latest News box (newest first; visible = yes/no)",
  "registration — fees table, per-section paragraphs, notes, mailing buttons",
  "committees — one row per issue; repeat the committee + chairs on every row",
  "programme — agenda tables (day: Friday/Saturday/Sunday; audience: stoff/delegates/mundir/general)",
  "board — Board of Directors cards (group: row1 = top row, row2 = sectors); paste image links",
  "speakers — advisors + guest speakers (type: advisor/speaker)",
  "general_info — General Information page texts and lists",
  "venue — Venue & Leiden page texts",
  "contact — address lines and the displayed email address",
  "",
  "Deadlines: add rows with section = deadline on the registration tab and the Deadlines table appears automatically.",
  "If something breaks: File → Version history → restore. The website also keeps its own backup copy."
];

var DATA = {
  "settings": {
    "site_name": "RijnMUN",
    "conference_edition": "RijnMUN 2026",
    "conference_dates": "9^{th} to 11^{th} October 2026",
    "committees_tagline": "Convergence: where perspectives unite for global progress",
    "fees_heading": "Conference Fees 2026",
    "school_reg": "open",
    "individual_reg": "open",
    "stoff_reg": "open",
    "instagram_url": "https://www.instagram.com/rijn.mun?igsh=cWtvcHhlZzN3N2R5",
    "tiktok_url": "https://www.tiktok.com/@rijn_mun",
    "last_updated": "23/05/2025"
  },
  "home": {
    "headline": "Rijnlands Lyceum Oegstgeest\nModel United Nations",
    "message_title": "Dear MUN directors, advisors, delegates, student officers, admins, and guests,",
    "message": "**Dear MUN directors, advisors, delegates, student officers, admins, and guests,**\n\nThis second edition of RijnMUN has been a joyous success, with 120 delegates and over 60 student volunteers supporting the conference. We thank everyone who was present and made this event possible. Throughout the weekend, there were many fun and unforgettable highlights, captured in the photos made by our wonderful photography team.\nOn behalf of the RijnMUN Board of Directors, we hope to see you all again at RijnMUN 2026!\n\n**Signing off,\nThe RijnMUN 2025 Secretariat**",
    "btn1_text": "What is MUN?",
    "btn1_url": "/rijnmun-2026/general-information",
    "btn2_text": "See the issues",
    "btn2_url": "/rijnmun-2026/committees-and-issues",
    "btn3_text": "Agenda",
    "btn3_url": "/rijnmun-2026/programme-of-events"
  },
  "news": [
    {
      "date": "10/05/2026",
      "title": "Committees and Issues Released",
      "text": "Committees and issues can now be found [here](/rijnmun-2026/committees-and-issues).",
      "visible": "yes"
    },
    {
      "date": "12/10/2025",
      "title": "RijnMUN 2025 Photos",
      "text": "Photos of RijnMUN 2025 are uploaded in the [RijnMUN photo archives](https://archive.rijnmun.org/photos).",
      "visible": "yes"
    },
    {
      "date": "31/12/2024",
      "title": "RijnMUN Archives",
      "text": "You can now find RijnMUN archives and photos at [archive.rijnmun.org](https://archive.rijnmun.org/).",
      "visible": "yes"
    }
  ],
  "registration": [
    {
      "section": "fees",
      "text": "Delegate",
      "category": "delegate",
      "extra": "€35"
    },
    {
      "section": "fees",
      "text": "Student Officer",
      "category": "stoff",
      "extra": "€15"
    },
    {
      "section": "fees",
      "text": "MUN Directors/Visitors",
      "category": "director",
      "extra": "€15"
    },
    {
      "section": "fees",
      "text": "Lost badges",
      "category": "other",
      "extra": "€5"
    },
    {
      "section": "fee_notes",
      "text": "Conference fee include a badge and lunch for two days."
    },
    {
      "section": "fee_notes",
      "text": "There are no extra fees for school registrations."
    },
    {
      "section": "school_open",
      "text": "To sign up as a school, please fill in [this form](https://forms.gle/YnfHWGUubXNuQQWn9)."
    },
    {
      "section": "school_open",
      "text": "*Preliminary Form* (open from 6th May to the 31st August 2026): are now open."
    },
    {
      "section": "school_open",
      "text": "*Confirmation Form* (open from late August to early September 2026): confirm details such as names, dietary restrictions, experience level...etc of your delegation with a size within a two-delegate margin of your previous estimate."
    },
    {
      "section": "school_open",
      "text": "Please feel free to [contact us](/contact) for any questions or amendments regarding your applications."
    },
    {
      "section": "school_notopen",
      "text": "School applications for RijnMUN 2026 are not yet open. Please come back later."
    },
    {
      "section": "school_closed",
      "text": "School registration forms have been closed. Please [contact us](/contact) if you have any questions."
    },
    {
      "section": "individual_open",
      "text": "Individual applications for RijnMUN 2026 are now open! To sign up please fill in [this form](https://forms.gle/3txXmHfF5M9DBeUQ8)."
    },
    {
      "section": "individual_open",
      "text": "Please feel free to [contact us](/contact) for any questions."
    },
    {
      "section": "individual_notopen",
      "text": "Individual applications for RijnMUN 2026 are not yet open. Please come back later."
    },
    {
      "section": "individual_closed",
      "text": "Applications for delegates at RijnMUN 2026 are now closed. Position-assignments have been sent to all delegates."
    },
    {
      "section": "stoff_open",
      "text": "Are you a motivated and organised person? Have you already been to multiple MUN conferences and are you ready for a new challenge? Try being a chair at our RijnMUN conference!"
    },
    {
      "section": "stoff_open",
      "text": "**[Submit your application](https://docs.google.com/forms/d/e/1FAIpQLScubMI5XszXKzvep6ih1ThUTQ7YzUzyiV0PmpQ_ZFarnyq3Vw/viewform?usp=header)!**"
    },
    {
      "section": "stoff_open",
      "text": "Please [contact us](/contact) in case of any questions or concerns."
    },
    {
      "section": "stoff_notopen",
      "text": "StOff applications for RijnMUN 2026 are not yet open. Please come back later."
    },
    {
      "section": "stoff_closed",
      "text": "Applications for Student Officers at RijnMUN 2026 are now closed and all applicants have been informed of their application status."
    },
    {
      "section": "rlo",
      "text": "Do you want to be part of MUN debates in RLO? All students MP3/2e klas or older as of school year 2026-26 are welcome to join our after-school MUN debate practice, every Thursday 6th period in n103. Beginners are always welcome!"
    },
    {
      "section": "rlo",
      "text": "*De voertal van Model United Nations is wel Engels maar alle studenten van RLO zijn van harte welkom!*",
      "visible": "yes"
    },
    {
      "section": "rlo",
      "text": "For fulfilling CAS or SA requirements with RijnMUN, please consult your tutor and supervisors."
    },
    {
      "section": "rlo",
      "text": "To sign up please fill in [this form](https://forms.gle/3txXmHfF5M9DBeUQ8)."
    },
    {
      "section": "rlo",
      "text": "Questions? [Send us an email](/contact) or dm us on [Instagram](https://www.instagram.com/rijn.mun?igsh=cWtvcHhlZzN3N2R5)."
    },
    {
      "section": "note",
      "text": "RijnMUN 2026 will not be providing any accomodation;"
    },
    {
      "section": "note",
      "text": "Any guests that are allergic to gluten are kindly requested to bring their own lunch."
    },
    {
      "section": "mailing",
      "text": "1^{st} Mailing",
      "link_url": ""
    },
    {
      "section": "mailing",
      "text": "Last Mailing",
      "link_url": ""
    },
    {
      "section": "mailing",
      "text": "3^{rd} Mailing",
      "link_url": ""
    },
    {
      "section": "mailing",
      "text": "4^{th} Mailing",
      "link_url": ""
    },
    {
      "section": "mailing",
      "text": "5^{th} Mailing",
      "link_url": ""
    }
  ],
  "committees": [
    {
      "committee": "GA1 - International Security and Disarmement",
      "chairs": "",
      "issue": "The regulation of autonomous weapons systems",
      "code": "GA101",
      "report_url": ""
    },
    {
      "committee": "GA1 - International Security and Disarmement",
      "chairs": "",
      "issue": "Preventing cyber warfare against civilian infrastructure",
      "code": "GA102",
      "report_url": ""
    },
    {
      "committee": "GA3 - Social, Humanitarian and Cultural",
      "chairs": "",
      "issue": "Protecting indigenous communities amid development projects",
      "code": "GA301",
      "report_url": ""
    },
    {
      "committee": "GA3 - Social, Humanitarian and Cultural",
      "chairs": "",
      "issue": "Advancing gender equality in humanitarian response systems",
      "code": "GA302",
      "report_url": ""
    },
    {
      "committee": "GA4 - Special Political and Decolonization",
      "chairs": "",
      "issue": "The question of the Western Sahara",
      "code": "GA401",
      "report_url": ""
    },
    {
      "committee": "GA4 - Special Political and Decolonization",
      "chairs": "",
      "issue": "Addressing the rights of the Chagossian peoples of Diego Garcia",
      "code": "GA402",
      "report_url": ""
    },
    {
      "committee": "HRC - Human Rights Council",
      "chairs": "",
      "issue": "The protection of journalists in conflict zones",
      "code": "HRC01",
      "report_url": ""
    },
    {
      "committee": "HRC - Human Rights Council",
      "chairs": "",
      "issue": "Ensuring humanitarian access to conflict zones",
      "code": "HRC02",
      "report_url": ""
    },
    {
      "committee": "SC - Security Council",
      "chairs": "",
      "issue": "The situation in Sudan",
      "code": "SC01",
      "report_url": ""
    },
    {
      "committee": "SC - Security Council",
      "chairs": "",
      "issue": "Maritime security in the Red Sea",
      "code": "SC02",
      "report_url": ""
    }
  ],
  "programme": [],
  "board": [
    {
      "group": "row1",
      "photo_url": "",
      "names": "Board of Directors",
      "role": "RijnMUN 2026"
    },
    {
      "group": "row1",
      "photo_url": "",
      "names": "Ruby O'Regan",
      "role": "Secretary General"
    },
    {
      "group": "row1",
      "photo_url": "",
      "names": "Ruby O'Regan, Azlan Shurjeel Tousif, Tereza Valkyova",
      "role": "RijnMUN Secretariat"
    },
    {
      "group": "row2",
      "photo_url": "",
      "names": "To be announced soon!",
      "role": "Management"
    },
    {
      "group": "row2",
      "photo_url": "",
      "names": "To be announced soon!",
      "role": "Finance"
    },
    {
      "group": "row2",
      "photo_url": "",
      "names": "To be announced soon!",
      "role": "External Affairs"
    },
    {
      "group": "row2",
      "photo_url": "",
      "names": "To be announced soon!",
      "role": "Internal Affairs"
    },
    {
      "group": "row2",
      "photo_url": "",
      "names": "To be announced soon!",
      "role": "Press & Publicity"
    }
  ],
  "speakers": [],
  "general_info": [
    {
      "section": "about_intro",
      "text": "Model United Nations (MUN) is an educational simulation where students take on the role of a country's representative (known as a *delegate*) and debate on current global issues with other delegates. Students will be given real-world issues with the goal of reaching a solution together with other delegates during the conference, each debating from the perspective of their representing countries. Debates will be moderated by *student officers*, who are experienced MUN students selected by the RijnMUN Board of Directors."
    },
    {
      "section": "about_more",
      "text": "MUN is for all students of any age between 14-18, any race, religion, gender, etc. As an educational model of the United Nations, participants can improve their public speaking skills, critical thinking, as well as honing their knowledge about international relations and real issues in the global community."
    },
    {
      "section": "about_more",
      "text": "RijnMUN is a Model United Nations conference hosted by students of Het Rijnlands Lyceum Oegstgeest. It is a small conference aimed for high-school beginner delegates to familiarize themselves with the MUN rules of procedure and to get involved with the MUN community. RijnMUN follows the THIMUN rules of procedures, which can be found on the [THIMUN website](https://foundation.thimun.org/wp-content/uploads/2023/08/Booklet-11-General-Rules-of-Procedure.pdf)."
    },
    {
      "section": "about_more",
      "text": "*Please note that housing for delegates, staff, or any other visitors will not be provided by RijnMUN 2026.*"
    },
    {
      "section": "guidelines",
      "text": "All must abide by the [THIMUN guidelines](https://foundation.thimun.org/participation/guidelines/) on top of the following RijnMUN specific guidelines below:"
    },
    {
      "section": "guidelines",
      "text": "Delegates must respect all other staff and delegates associated with the conference;"
    },
    {
      "section": "guidelines",
      "text": "Visitors will only be allowed into the conference with a badge, which will be distributed on the first day upon arrival;"
    },
    {
      "section": "guidelines",
      "text": "All people associated with RijnMUN must treat the building and corresponding properties with respect and care. Anyone caught in violation of this rule will be held accountable by the RijnMUN Board of Directors, who will decide upon appropriate consequences;"
    },
    {
      "section": "guidelines",
      "text": "Wear appropriate attire. Males shall wear a suit, tie, and formal footwear, while female delegates are expected to wear formal clothing, for example a blouse and appropriate length skirt."
    },
    {
      "section": "guidelines",
      "text": "**Note paper:** Delegates are required to bring their own note paper to RijnMUN. A template can be found [here](/uploads/RijnMUN%20Note%20Paper%20Template.pdf)."
    },
    {
      "section": "guides_delegate",
      "text": "[Register for RijnMUN!](/registration) We are a beginner-friendly conference and in the three-day event you will receive workshops to help you find your way in the MUN community! Make sure you follow all the steps in the registration page."
    },
    {
      "section": "guides_delegate",
      "text": "Check out the issues you will be discussing in your committee on the [Committees and Issues](/rijnmun-2026/committees-and-issues) page. Make sure to read the research reports your chairs have written for you."
    },
    {
      "section": "guides_delegate",
      "text": "[Find out more about the country which you are representing](https://foundation.thimun.org/wp-content/uploads/2023/08/Booklet-4-Research-and-Preparation.pdf): we recommend using the [CIA World Factbook](https://www.cia.gov/the-world-factbook/) or the list of [UN member states](https://www.un.org/en/about-us/member-states) as a starting point!"
    },
    {
      "section": "guides_delegate",
      "text": "Understand the stance of your country on the issues that you will be discussing. Is your country in favor or against a certain solution? Are there already alliances with certain countries in order to solve the issue?"
    },
    {
      "section": "guides_delegate",
      "text": "Prepare clauses, [resolutions](https://foundation.thimun.org/wp-content/uploads/2023/08/Booklet-7-Draft-Resolutions.pdf) and or [policy statements](https://foundation.thimun.org/wp-content/uploads/2023/08/Booklet-5-Developing-a-Policy.pdf): check out the [guides](https://foundation.thimun.org/participation/guidelines/) provided by the THIMUN foundation to help you!"
    },
    {
      "section": "guides_delegate",
      "text": "Be prepared to dress formally for RijnMUN, and bring a device, charger, pen, paper and lunch (for Friday) for the conference!"
    },
    {
      "section": "guides_chair",
      "text": "Are you a motivated and organized person? Have you participated in at least two conferences and are you ready for a new challenge? Are you passionate about providing newcomers a great impression of MUN? [Apply to be a chair](/registration)!"
    },
    {
      "section": "guides_chair",
      "text": "Pre-Conference preparation: understand the [issues](/rijnmun-2026/committees-and-issues) being debated in your committee, and write a coherent research report before the research report deadline following tips and guidelines set by the RijnMUN BoD."
    },
    {
      "section": "guides_chair",
      "text": "Pre-Conference preparation: familiarize yourself with the [THIMUN Rules of Procedures](https://foundation.thimun.org/wp-content/uploads/2023/08/Booklet-11-General-Rules-of-Procedure.pdf)"
    },
    {
      "section": "guides_chair",
      "text": "Pre- and During-Conference: maintain good communication with the RijnMUN Board of Directors."
    },
    {
      "section": "guides_chair",
      "text": "During the Conference: set a good example for your committee, ensuring fruitful and productive debates while making sure the new delegates also feel immersed in the experience."
    },
    {
      "section": "guides_chair",
      "text": "General tip: be confident in your ability to chair!"
    },
    {
      "section": "resources_left",
      "text": "**Note paper:** Delegates are required to bring their own note paper to RijnMUN. A template can be found [here](/uploads/RijnMUN%20Note%20Paper%20Template.pdf)."
    },
    {
      "section": "resources_left",
      "text": "**Research reports:** Research reports have been written for you by your chairs. You can find the research reports for your issues [here](/rijnmun-2026/committees-and-issues)."
    },
    {
      "section": "resources_left",
      "text": "**Delegate handbook:** A delegate handbook has been written for you to help you better prepare for RijnMUN 2026, which can be found [here](/uploads/RijnMUN_Delegate_Handbook.pdf)."
    },
    {
      "section": "resources_left",
      "text": "**MUN Attire:** Don't know what to wear at RijnMUN? Checkout other MUN conferences' past photos, such as the [photo gallery of THIMUN](https://thehague.thimun.org/impressions/photo/) or [the facebook page of MUNISH](https://www.facebook.com/Model-United-Nations-at-The-International-School-of-The-Hague-1554093008213683) to get an idea of what people dress like."
    },
    {
      "section": "resources_left",
      "text": "**Empty Resolution Template**: Feel free to directly copy/paste the template from [here](/uploads/RijnMUN%202026%20Resolution%20Template.odt) for your resolution!"
    },
    {
      "section": "resources_left",
      "text": "**Annoted Example Resolution**: See our [annotated sample resolution](/uploads/RijnMUN_Resolution_Annotations.pdf) provided by our Head of Approval Panel!"
    },
    {
      "section": "resources_right_links",
      "text": "[Gapminder](https://www.gapminder.org/)"
    },
    {
      "section": "resources_right_links",
      "text": "[Human Development Index](https://hdr.undp.org/data-center/human-development-index#/indicies/HDI)"
    },
    {
      "section": "resources_right_links",
      "text": "[The World Factbook](https://www.cia.gov/the-world-factbook/)"
    },
    {
      "section": "resources_outro",
      "text": "The RijnMUN staff hopes these resources will help you prepare for RijnMUN, and highly recommends you use them as they help provide a more enjoyable conference experience. Should you have any questions or concerns, please don't hesitate to [contact us](/contact)."
    }
  ],
  "venue": [
    {
      "section": "about_rlo",
      "text": "[Het Rijnlands Lyceum Oegstgeest](https://www.rlo.nl/) is part of the Het Rijnlands Lyceum Foundation first established in 1936. RLO was first founded in 1956 as a Dutch secondary school. It soon founded its TTO (bilingual) education and IB programs, where 2026 marks the 40^{th} anniversary of the IB's establishment in RLO."
    },
    {
      "section": "about_rlo",
      "text": "Having HAVO, VWO-TTO, VWO and IB programs all under the same roof, Het Rijnlands Lyceum Oegstgeest is a unique and diverse place for students to be in. Having over 1500 students, amongst them 350 of which are international students from over 40 countries and 150 staff members, RLO is home to many wonderful opportunities."
    },
    {
      "section": "travel_intro",
      "text": "The conference will be hosted at __Het Rijnlands Lyceum Oegstgeest__, at the address [Apollolaan 1, 2341 BA Oegstgeest](https://maps.app.goo.gl/eAHMe1EkFLLd3BHS7)"
    },
    {
      "section": "by_car",
      "text": "RLO is located near __Exit 7: Oegstgeest | Rijnsburg__ on the A44. Please note that there are limited parking spaces around the school."
    },
    {
      "section": "by_public_transport",
      "text": "RLO is a 10-minute walk from the bus stop __Leidsebuurt__. Visitors are recommended to take a train to __Leiden Centraal__ followed by either bus 20, 21 or 57 to the bus station Leidsebuurt."
    },
    {
      "section": "by_public_transport",
      "text": "We recommend using an app such as [9292.nl](https://9292.nl/) or [ns.nl](https://ns.nl) to assist your travel planning with public transport."
    },
    {
      "section": "leiden_1",
      "text": "Leiden is a beautiful city with a rich history and academic life. The city houses the oldest university in the Netherlands- __Leiden University__, which was founded in 1575 and is now a leading research university with seven different faculties. It now houses over 29,000 students and 6500 staff members from around the world."
    },
    {
      "section": "leiden_2",
      "text": "In Leiden, you can also find over 2800 __historical monuments__ if you know where to look for them. These monuments range from courtyards, city gates, gardens to mills.\n[Learn more](https://www.visitleiden.nl/nl/cultuur/monumenten) about monuments in Leiden."
    }
  ],
  "contact": {
    "address_lines": "Het Rijnlands Lyceum Oegstgeest\n[Apollolaan 1, 2341 BA Oegstgeest](https://www.google.com/maps/place/Rijnlands+Lyceum+Oegstgeest/@52.181015,4.4591849,17z/data=!3m1!4b1!4m6!3m5!1s0x47c5c7261b8f7c3d:0x90ba89f8621db50!8m2!3d52.1810117!4d4.4617652!16s%2Fm%2F0g9_3z6?entry=ttu)",
    "email": "info@rijnmun.org"
  }
};

function createRijnMUNSheet() {
  var ss = SpreadsheetApp.create("RijnMUN Website Content");
  var first = ss.getSheets()[0];

  ORDER.forEach(function (tab, i) {
    var sheet = (i === 0) ? first : ss.insertSheet();
    sheet.setName(tab);
    fillTab(sheet, tab);
  });

  var instr = ss.insertSheet("Instructions");
  instr.getRange(1, 1, INSTRUCTIONS.length, 1).setValues(INSTRUCTIONS.map(function (l) { return [l]; }));
  instr.setColumnWidth(1, 800);
  instr.getRange(1, 1).setFontSize(14).setFontWeight("bold");
  ss.setActiveSheet(instr);
  ss.moveActiveSheet(1);

  DriveApp.getFileById(ss.getId())
      .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  Logger.log("Created spreadsheet: " + ss.getUrl());
  ss.toast("Done! Open View > Logs here for the link. Next: File > Share > Publish to web.",
           "RijnMUN sheet created", 60);
}

function isKvTab(tab) {
  return tab === "settings" || tab === "home" || tab === "contact";
}

function fillTab(sheet, tab) {
  var headers = isKvTab(tab) ? ["key", "value"] : COLS[tab].slice();
  var dataRows = DATA[tab] || [];

  var values = [headers];
  if (isKvTab(tab)) {
    Object.keys(dataRows).forEach(function (k) { values.push([k, dataRows[k]]); });
  } else {
    dataRows.forEach(function (r) {
      values.push(headers.map(function (h) { return (r[h] == null) ? "" : r[h]; }));
    });
  }

  sheet.getRange(1, 1, values.length, headers.length).setValues(values);
  sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight("bold").setBackground("#235690").setFontColor("#ffffff");
  sheet.setFrozenRows(1);

  for (var c = 0; c < headers.length; c++) {
    var max = headers[c].length;
    for (var r = 1; r < values.length; r++) {
      var v = String(values[r][c] == null ? "" : values[r][c]);
      var longest = 0;
      v.split("\n").forEach(function (s) { if (s.length > longest) longest = s.length; });
      if (longest > max) max = longest;
    }
    sheet.setColumnWidth(c + 1, Math.min(Math.max(max + 2, 12), 72) * 7);
  }
  if (values.length > 1) {
    sheet.getRange(2, 1, values.length - 1, headers.length)
        .setWrap(true).setVerticalAlignment("top");
  }

  applyValidations(sheet, tab, headers, values);
}

function applyValidations(sheet, tab, headers, values) {
  function addList(row, col, options) {
    var rule = SpreadsheetApp.newDataValidation()
        .requireValueInList(options, true).setAllowInvalid(true)
        .setHelpText("Allowed: " + options.join(", "))
        .build();
    sheet.getRange(row, col).setDataValidation(rule);
  }

  if (isKvTab(tab) && tab === "settings") {
    ["school_reg", "individual_reg", "stoff_reg"].forEach(function (k) {
      for (var r = 2; r <= values.length; r++) {
        if (values[r - 1][0] === k) addList(r, 2, ["open", "closed", "not_open"]);
      }
    });
    return;
  }

  var spec = VALIDATIONS[tab];
  if (!spec) return;
  var colIndex = {};
  headers.forEach(function (h, i) { colIndex[h] = i + 1; });
  Object.keys(spec).forEach(function (col) {
    if (!colIndex[col]) return;
    for (var r = 2; r <= values.length; r++) addList(r, colIndex[col], spec[col]);
  });
}
