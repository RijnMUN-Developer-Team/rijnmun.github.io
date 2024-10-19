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
                "name": "Norway GA101 #2",
                "link": "/uploads/resolutions/GA1/GA101_2.pdf"
            }

        ],

        "active": [

        ],

        "passed": [

            {
                "name": "UK GA101 #1",
                "link": "/uploads/resolutions/GA1/GA101_1.pdf"
            },

            {
                "name": "Saudi Arabia GA102 #1",
                "link": "/uploads/resolutions/GA1/GA102_1.pdf"
            }

        ]
    },


    "GA3": {
        "approved": [

            {
                "name": "Kenya GA302 #1",
                "link": "/uploads/resolutions/GA3/GA302_1.pdf"
            },

            {
                "name": "Morocco GA301 #2",
                "link": "/uploads/resolutions/GA3/GA301_2.pdf"
            },

            {
                "name": "UAE GA301 #4",
                "link": "/uploads/resolutions/GA3/GA301_4.pdf"
            }

        ],
        "active": [
            
        ],
        "passed": [
            
            {
                "name": "Ukraine GA301 #1",
                "link": "/uploads/resolutions/GA3/GA301_1"
            },
            
            {
                "name": "Colombia GA302 #2",
                "link": "/uploads/resolutions/GA3/GA302_2"
            },
            
            {
                "name": "Chad GA301 #3",
                "link": "/uploads/resolutions/GA301_3.pdf"
            }

        ]
    },

    "GA4": {
        "approved": [

            // failed resos deleted

            // {
            //     "name": "Republic of Korea GA402 #2",
            //     "link": "/uploads/resolutions/GA4/GA402_2.pdf"
            // },

            // {
            //     "name": "Afghanistan GA402 #3",
            //     "link": "/uploads/resolutions/GA4/GA402_3.pdf"
            // },

            // {
            //     "name": "Russia GA401 #2",
            //     "link": "/uploads/resolutions/GA4/GA401_2.pdf"
            // },

            {
                "name": "Egypt GA401 #4",
                "link": "/uploads/resolutions/GA4/GA401_4.pdf"
            }

        ],
        "active": [

        ],
        "passed": [

            {
                "name": "USA GA402 #1",
                "link": "/uploads/resolutions/GA4/GA402_1.pdf"
            },

            {
                "name": "Republic of Korea GA401 #3",
                "link": "/uploads/resolutions/GA401_3.pdf"
            },
            
            {
                "name": "The Netherlands GA401 #1",
                "link": "/uploads/resolutions/GA4/GA401_1.pdf"
            }
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
            },

            {
                "name": "Yemen HRC02 #1",
                "link": "/uploads/resolutions/HRC/HRC02_1.pdf"
            },

            {
                "name": "Ukraine HRC03 #1",
                "link": "/uploads/resolutions/HRC/HRC03_1.pdf"
            }

        ]
    },
    
    "SC": {
        "approved": [

        ],
        "active": [

        ],
        "passed": [

            {
                "name": "SC01 #1",
                "link": "/uploads/resolutions/SC/SC01_1.pdf"
            },

            {
                "name": "SC02 #1",
                "link": "/uploads/resolutions/SC/SC02_1.pdf"
            }

        ]
    }
}