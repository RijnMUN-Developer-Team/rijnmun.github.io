/* 
STRUCTURE:
"<committee name>": {
    "<phase ("approved", "active", "passed")>": [
        { // new set of braces per reso
            "name": "<main submitter> <committee + issue no.> #<no.>",
            "link": "<link to file>"
        },
    ]
}

EXAMPLE:
"GA1": {
    "approved": [
        { // new set of braces per reso
            "name": "USA GA101 #1",
            "link": "https://www.example.com"
        },
    ]
}
*/

export const resos = {
    "GA1": {
        // for testing, needs to be reset when deployed
        // easy way to update the resos during the conference (?)
        "approved": [
          {
            "name": "UK GA101 #1",
            "link": "/uploads/resolutions/GA1/GA101_1.pdf"
          }

        ],

        "active": [

        ],
        "passed": [

        ]
    },
    "GA3": {
        "approved": [

            {
                "name": "Ukraine GA301 #1",
                "link": "/uploads/resolutions/GA3/GA301_1.pdf"
              },

            {
            "name": "Kenya GA302 #1",
            "link": "/uploads/resolutions/GA3/GA302_1.pdf"
            },

            {
                "name": "Morocco GA301 #2",
                "link": "/uploads/resolutions/GA3/GA301_2.pdf"
            },

            {
                "name": "Colombia GA302 #2",
                "link": "/uploads/resolutions/GA3/GA302_2.pdf"
            }

        ],
        "active": [

            {
                "name": "Ukraine GA301 #1",
                "link": "https://l1nk.dev/rWi1i"
            }

        ],
        "passed": [

        ]
    },
    "GA4": {
        "approved": [

            {
                "name": "USA GA402 #1",
                "link": "/uploads/resolutions/GA4/GA402_1.pdf"
              },

            {
            "name": "Republic of Korea GA402 #2",
            "link": "/uploads/resolutions/GA4/GA402_2.pdf"
            },

            {
                "name": "Afghanistan GA402 #3",
                "link": "/uploads/resolutions/GA4/GA402_3.pdf"
            }

        ],
        "active": [

        ],
        "passed": [

        ]
    },
    "HRC": {
        "approved": [

        ],
        "active": [

        ],
        "passed": [

            {
                "name": "Brazil HRC01 #1",
                "link": "/uploads/resolutions/HRC/HRC01_1.pdf"
            }

        ]
    },
    "SC": {
        "approved": [

        ],
        "active": [

        ],
        "passed": [

        ]
    }
}