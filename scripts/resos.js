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

            

        ],

        "active": [

        ],

        "passed": [


        ]
    },


    "GA3": {
        "approved": [


        ],
        "active": [
            
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