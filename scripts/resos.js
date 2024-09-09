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
*/

export const resos = {
    "GA1": {
        // for testing, needs to be reset when deployed
        // easy way to update the resos during the conference (?)
        "approved": [
            {
                "link": "/",
                "name": "USA GA102 #2"
            },
            {
                "link": "/",
                "name": "Japan GA103 #2"
            }
        ],
        "active": [
            {
                "link": "/",
                "name": "Senegal GA101 #2"
            }
        ],
        "passed": [
            {
                "link": "/",
                "name": "France GA101 #1"
            },
            {
                "link": "/",
                "name": "Cuba GA102 #2"
            },
            {
                "link": "/",
                "name": "Cambodia GA103 #3"
            }
        ]
    },
    "GA3": {
        "approved": [],
        "active": [],
        "passed": []
    },
    "GA4": {
        "approved": [],
        "active": [],
        "passed": []
    },
    "HRC": {
        "approved": [],
        "active": [],
        "passed": []
    },
    "SC": {
        "approved": [],
        "active": [],
        "passed": []
    }
}