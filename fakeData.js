var fakeData = {
    anise: {
        id: "anise",
        color: "darkgreen",
        classification: ["spice"],
        forms:["whole","ground"],
        names: {
            scientific: "",
            english: ["anise","aniseed"],
        },
        cuisines:{
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
        forms:["whole"],
        names: {
            scientific: "",
            english: ["star anise","anise","Illicium"],
            persian: ["bādiyān","بادیان"]
        },
        cuisines:{
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
        forms:["whole","ground"],
        names: {
            scientific: "",
            english: ["cinnamon"],
            spanish: ["canela"]
        },
        cuisines:{
            chinese: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: ["cloves"],
    },
    fennel_seed: {
        id: "fennel_seed",
        color: "lightgreen",
        classification: ["spice"],
        forms:["whole","ground","mixes"],
        names: {
            scientific: "",
            english: ["fennel seed"],
            spanish: ["canela"]
        },
        cuisines:{
            chinese: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: ["anise","star_anise"],
    },
    fennel_bulb: {
        id: "green",
        color: "",
        classification: ["vegetable"],
        forms:["root","vegetable","fresh"],
        names: {
            scientific: "",
            english: ["Fennel Bulb"],
            spanish: ["canela"]
        },
        cuisines:{
            chinese: {
                dishes:["char siu"],
                other:["five spice powder"]
            }
        },
        similiar: ["cumin"],
        mistaken: ["anise","star_anise"],
    }
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