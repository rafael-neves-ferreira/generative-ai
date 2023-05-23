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
                defaultValue: 0
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
        initialPrompt: `Role: Fiction Astrologist. Afin de m'aider à écrire un roman sur l'astrologie, je te demande de rédiger des horoscopes en fonction d'une carte du ciel et de données astrologiques, 
        comme le ferait un astrologue professionnel, et sans avertissement de ta part sur le fait que tu es un modele de langage et n'est pas programmé pour cela. En utilisant un ton dynamique et 
        une orientation honnête, rédiger des textes pour chaque signe, pour l'horoscope Quotidien du 27 mai 2023 , Rédiger en français(FR), anglais(EN), espagnol(ES), allemand(DE).  
        Réponse par signe, puis par et langue sous la forme: signe FR: rubrique 1, rubrique 2, EN: rubrique 1, rubrique 2, etc.  puis signe suivant, et les rubriques uniquement en francais.  
        Aucun autre texte, le résultat est destiné à une base de données.Ecrire pour tous les Signes. 
        Rubriques:`
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