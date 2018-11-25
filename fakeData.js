var fakeData = {
    fennel_bulb: {
        id: "fennel_bulb",
        color: "green",
        classification: ["vegetable"],
        form:["root","vegetable","fresh"],
        name: {
            scientific: "",
            english: ["Fennel Bulb"],
            spanish: ["canela"]
        },
        cuisine:{
            chinese: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: ["anise","star_anise"],
    },
    tomato: {
        id: "tomato",
        color: "red",
        classification: ["vegetable"],
        form:["vegetable","fresh"],
        name: {
            scientific: "",
            english: ["Tomato"],
            french: ["Tomate"]
        },
        cuisine:{
            italian: {
                dishes:["pasta sauce"],
                other:[]
            }
        },
        similiar: [],
        mistaken: [],
    },
    anise: {
        id: "anise",
        color: "darkgreen",
        classification: ["spice"],
        form:["whole","ground"],
        name: {
            scientific: "",
            english: ["anise","aniseed"],
        },
        cuisine:{
            italian: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["fennel seed","anise seed"],
        mistaken: ["star_anise","fennel seed"],
    },
    star_anise: {
        id: "star_anise",
        color: "saddlebrown",
        classification: ["spice"],
        form:["whole"],
        name: {
            scientific: "",
            english: ["star anise","anise","Illicium"],
            persian: ["bādiyān","بادیان"]
        },
        cuisine:{
            chinese: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["fennel seed","aniseed"],
        mistaken: ["anise","fennel"],
    },
    cinnamon: {
        id: "cinnamon",
        color: "brown",
        classification: ["spice"],
        form:["whole","ground"],
        name: {
            scientific: "",
            english: ["cinnamon"],
            spanish: ["canela"]
        },
        cuisine:{
            chinese: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: [],
    },
    fennel_seed: {
        id: "fennel_seed",
        color: "lightgreen",
        classification: ["spice"],
        form:["whole","ground","mixes"],
        name: {
            scientific: "",
            english: ["fennel seed"],
            spanish: ["canela"]
        },
        cuisine:{
            chinese: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: ["anise","star_anise"],
    },
    
}

var fakeBlog = [
    {
        date:"8/8/2019",
        title:"Fennel Bulb: Licorice in Vegetable Form",
        text:"The fennel bulb is an underutilized vegetable.",
        images: {
            image1: {
                src: "fennel_bulb",
                style: "blog-image-header",
                caption: "Fennel bulb.",
            }
        }
    }
]