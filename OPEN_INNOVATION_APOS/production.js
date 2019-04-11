module.exports = {
    'apostrophe-express': {
        port: 3000
    },
    'apostrophe-elasticsearch': {
        baseName: 'OPEN_INNOVATION_APOS',
        elasticsearchOptions: {
            host: process.env.ELASTICURL
        },
        fields: ['title', 'description', 'lowSearchText', 'highSearchText', 'type'],
        boosts: {
            description: 100,
            title: 80,
            highSearchText: 1,
            lowSearchText: 1
        },
        indexSettings: {
            "analysis": {
                "filter": {
                    "italian_elision": {
                        "type": "elision",
                        "articles": [
                            "c", "l", "all", "dall", "dell", "nell",
                            "sull", "coll", "pell", "gl", "agl", "dagl", "degl",
                            "negl", "sugl", "un", "m", "t", "s", "v", "d"
                        ]
                    },
                    "italian_stop": {
                        "type": "stop",
                        "stopwords": "_italian_"
                    },
                    "italian_stemmer": {
                        "type": "stemmer",
                        "language": "light_italian"
                    }
                },
                "analyzer": {
                    "italian": {
                        "tokenizer": "standard",
                        "filter": [
                            "lowercase",
                            "asciifolding",
                            "italian_elision",
                            "italian_stop",
                            "italian_stemmer"
                        ]
                    }
                },
                "search_analyzer": {
                    "italian": {
                        "tokenizer": "standard",
                        "filter": [
                            "lowercase",
                            "asciifolding",
                            "italian_elision",
                            "italian_stop",
                            "italian_stemmer"
                        ]
                    }
                }
            }
        },
        analyzer: 'italian',
        analyzers: {
            master: 'italian',
            it: 'italian'
        },
        localeIndexSettings: {
            'it': {
                'analysis': {
                    'analyzer': 'italian'
                }
            }
        },
    }
}