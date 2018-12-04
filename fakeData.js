var fakeData = {
    fennel_bulb: {
        id: "fennel_bulb",
        color: "green",
        classification: ["vegetable"],
        description: "test",
        form:["root","vegetable","fresh"],
        name: {
            scientific: "",
            english: ["Fennel Bulb"],
            spanish: ["canela"]
        },
        cuisine:{
            chinese: {
                dishes:["char_siu"],
                other:["five_spice_powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: ["aniseed","star_anise"],
    },
    tomato: {
        id: "tomato",
        color: "red",
        classification: ["vegetable"],
        description: "test",
        form:["vegetable","fresh"],
        name: {
            scientific: "",
            english: ["Tomato"],
            french: ["Tomate"]
        },
        cuisine:{
            italian: {
                dishes:["pasta_sauce"],
                other:[]
            }
        },
        similiar: [],
        mistaken: [],
    },
    aniseed: {
        id: "aniseed",
        color: "darkgreen",
        classification: ["spice"],
        description: "A flowering plant in the family Apiaceae native to the eastern Mediterranean region and Southwest Asia",
        form:["whole","ground"],
        name: {
            scientific: "",
            english: ["aniseed","anise"],
        },
        cuisine:{
            italian: {
                dishes:["char_siu"],
                other:["five_spice_powder"]
            }
        },
        similiar: ["fennel_seed"],
        mistaken: ["star_anise","fennel_seed"],
    },
    star_anise: {
        id: "star_anise",
        color: "saddlebrown",
        classification: ["spice"],
        description: "test",
        form:["whole"],
        name: {
            scientific: "",
            english: ["star anise","anise","Illicium"],
            persian: ["bādiyān","بادیان"]
        },
        cuisine:{
            chinese: {
                dishes:["char_siu"],
                other:["five_spice_powder"]
            }
        },
        similiar: ["fennel_seed","aniseed"],
        mistaken: ["aniseed","fennel"],
    },
    cinnamon: {
        id: "cinnamon",
        color: "brown",
        classification: ["spice"],
        description: "A spice obtained from the inner bark of several tree species from the genus Cinnamomum. Cinnamon is used mainly as an aromatic condiment and flavouring additive in a wide variety of cuisines, sweet and savoury dishes, breakfast cereals, snackfoods, tea and traditional foods.",
        form:["whole","ground"],
        name: {
            scientific: "Cinnamomum verum",
            english: ["cinnamon","cassia"],
            spanish: ["canela"]
        },
        cuisine:{
            chinese: {
                dishes:["char_siu"],
                other:["five_spice_powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: [],
    },
    fennel_seed: {
        id: "fennel_seed",
        color: "lightgreen",
        classification: ["spice"],
        description: "test",
        form:["whole","ground","mixes"],
        name: {
            scientific: "",
            english: ["fennel seed"],
            spanish: ["canela"]
        },
        cuisine:{
            chinese: {
                dishes:["char_siu"],
                other:["five_spice_powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: ["aniseed","star_anise"],
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