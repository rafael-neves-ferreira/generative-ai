const HorosConfig = [
    {
        name: 'Horoscope Quotidien',
        id: 1,
        rubrics: [
            {
                name: 'Compatibilite',
                id: 1,
                type: 1,
                defaultValue: 250
            },
            {
                name: 'Amour couple',
                id: 2,
                type: 2,
                defaultValue: 250
            },
            {
                name: 'Amour celibataire',
                id: 3,
                type: 2,
                defaultValue: 250
            },
            {
                name: 'Conseil amoureux',
                id: 4,
                type: 2,
                defaultValue: 250
            },
            {
                name: 'Compatibilité amoureuse',
                id: 5,
                type: 3,
                defaultValue: 250
            },
            {
                name: 'Travail',
                id: 6,
                type: 2,
                defaultValue: 250
            },
            {
                name: 'Finance',
                id: 7,
                type: 2,
                defaultValue: 250
            },
            {
                name: 'Bien être',
                id: 8,
                type: 2,
                defaultValue: 250
            },
            {
                name: 'Vos proches / votre entourage',
                id: 9,
                type: 2,
                defaultValue: 250
            },

        ],
        initialPrompt: `En utilisant un ton dynamique et une orientation honnête, rédiger des textes pour chaque signe, pour l'horoscope Quotidien,
        Rédiger en français(FR), anglais(EN), espagnol(ES), allemand(DE). 
        Réponse par signe et langue sous la forme:
            BELIER
        FR: texte 
        EN: texte, etc. 
        puis signe suivant. 
        
        Aucun autre texte, le résultat est destiné à une base de données.Ecrire pour Touts les Signes.

            Rubriques:
        `
    },
    {
        name: 'Horoscope a la semaine',
        id: 2,
        rubrics: [
            {
                name: 'Compatibilite',
                type: 2
            },
            {
                name: 'Acu Astro',
                type: 2
            },

        ],
        initialPrompt: "Prompt"
    },
    {
        name: 'Compatibilité à la semaine',
        id: 3,
        rubrics: [
            {
                name: 'Compatibilite',
                type: 2
            },
            {
                name: 'Acu Astro',
                type: 2
            },

        ],
        initialPrompt: "Prompt"
    },
    {
        name: 'Compatibilité au mois',
        id: 4,
        rubrics: [
            {
                name: 'Compatibilite',
                type: 2
            },
            {
                name: 'Acu Astro',
                type: 2
            },

        ],
        initialPrompt: "Prompt"
    },
    {
        name: 'Compatibilité annuel',
        id: 5,
        rubrics: [
            {
                name: 'Compatibilite',
                type: 2
            },
            {
                name: 'Acu Astro',
                type: 2
            },

        ],
        initialPrompt: "Prompt"
    },
    {
        name: 'Horoscope chinois au mois',
        id: 6,
        rubrics: [
            {
                name: 'Compatibilite',
                type: 2
            },
            {
                name: 'Acu Astro',
                type: 2
            },

        ],
        initialPrompt: "Prompt"
    },
];

export default HorosConfig;