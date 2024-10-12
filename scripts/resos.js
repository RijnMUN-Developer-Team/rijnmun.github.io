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

        ],
        "active": [

        ],
        "passed": [

        ]
    },
    "HRC": {
        "approved": [
            {
                "name": "Brazil HRC01 #1",
                "link": "/uploads/resolutions/HRC/HRC01_1.pdf"
              }

        ],
        "active": [

        ],
        "passed": [

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