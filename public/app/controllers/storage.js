define(
    [],
    function() {
        var storage = {
            articles: {},
            entities: [],

            // Revision dump from 12/13/2012 @ 3:52 PM PST
            // See: http://www.mediawiki.org/wiki/API:Recentchanges
            // Url: http://revisualize.wikia.com/api.php?action=query&list=recentchanges&rclimit=500&rcdir=newer&rctype=new|edit&rcshow=!bot|!redirect&rcprop=ids|timestamp|title|sizes&rcnamespace=0&format=json
            revisions: [
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Revisualize Wiki",
                    "rcid": 6,
                    "pageid": 1461,
                    "revid": 3990,
                    "old_revid": 3984,
                    "oldlen": 695,
                    "newlen": 558,
                    "timestamp": "2012-12-13T19:44:38Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Revisualize Wiki",
                    "rcid": 7,
                    "pageid": 1461,
                    "revid": 3991,
                    "old_revid": 3990,
                    "oldlen": 558,
                    "newlen": 230,
                    "timestamp": "2012-12-13T19:46:42Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Revisualize Wiki",
                    "rcid": 8,
                    "pageid": 1461,
                    "revid": 3992,
                    "old_revid": 3991,
                    "oldlen": 230,
                    "newlen": 342,
                    "timestamp": "2012-12-13T19:48:07Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Revisualize Wiki",
                    "rcid": 9,
                    "pageid": 1461,
                    "revid": 3993,
                    "old_revid": 3992,
                    "oldlen": 342,
                    "newlen": 322,
                    "timestamp": "2012-12-13T19:48:46Z"
                },
                {
                    "type": "new",
                    "ns": 0,
                    "title": "Example Page 1",
                    "rcid": 10,
                    "pageid": 2062,
                    "revid": 3994,
                    "old_revid": 0,
                    "oldlen": 0,
                    "newlen": 20,
                    "timestamp": "2012-12-13T19:49:07Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Example Page 1",
                    "rcid": 11,
                    "pageid": 2062,
                    "revid": 3995,
                    "old_revid": 3994,
                    "oldlen": 20,
                    "newlen": 288,
                    "timestamp": "2012-12-13T19:50:19Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Example Page 1",
                    "rcid": 12,
                    "pageid": 2062,
                    "revid": 3996,
                    "old_revid": 3995,
                    "oldlen": 288,
                    "newlen": 262,
                    "timestamp": "2012-12-13T19:50:38Z"
                },
                {
                    "type": "new",
                    "ns": 0,
                    "title": "Example Page 2",
                    "rcid": 13,
                    "pageid": 2063,
                    "revid": 3997,
                    "old_revid": 0,
                    "oldlen": 0,
                    "newlen": 88,
                    "timestamp": "2012-12-13T19:51:18Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Example Page 2",
                    "rcid": 14,
                    "pageid": 2063,
                    "revid": 3998,
                    "old_revid": 3997,
                    "oldlen": 88,
                    "newlen": 145,
                    "timestamp": "2012-12-13T19:52:14Z"
                },
                {
                    "type": "new",
                    "ns": 0,
                    "title": "Example Page 3",
                    "rcid": 15,
                    "pageid": 2064,
                    "revid": 3999,
                    "old_revid": 0,
                    "oldlen": 0,
                    "newlen": 132,
                    "timestamp": "2012-12-13T19:53:25Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Example Page 3",
                    "rcid": 16,
                    "pageid": 2064,
                    "revid": 4000,
                    "old_revid": 3999,
                    "oldlen": 132,
                    "newlen": 160,
                    "timestamp": "2012-12-13T19:54:40Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Example Page 3",
                    "rcid": 17,
                    "pageid": 2064,
                    "revid": 4001,
                    "old_revid": 4000,
                    "oldlen": 160,
                    "newlen": 132,
                    "timestamp": "2012-12-13T19:55:03Z"
                },
                {
                    "type": "new",
                    "ns": 0,
                    "title": "Bacon Ipsum",
                    "rcid": 18,
                    "pageid": 2065,
                    "revid": 4002,
                    "old_revid": 0,
                    "oldlen": 0,
                    "newlen": 5995,
                    "timestamp": "2012-12-13T19:55:19Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Bacon Ipsum",
                    "rcid": 19,
                    "pageid": 2065,
                    "revid": 4003,
                    "old_revid": 4002,
                    "oldlen": 5995,
                    "newlen": 4522,
                    "timestamp": "2012-12-13T19:56:12Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Bacon Ipsum",
                    "rcid": 20,
                    "pageid": 2065,
                    "revid": 4004,
                    "old_revid": 4003,
                    "oldlen": 4522,
                    "newlen": 3526,
                    "timestamp": "2012-12-13T19:57:21Z"
                },
                {
                    "type": "edit",
                    "ns": 0,
                    "title": "Revisualize Wiki",
                    "rcid": 21,
                    "pageid": 1461,
                    "revid": 4005,
                    "old_revid": 3993,
                    "oldlen": 322,
                    "newlen": 427,
                    "timestamp": "2012-12-13T19:58:50Z"
                }
            ],

            // Links dump from 12/13/2012 @ 5:44 PM PST
            // Url: http://revisualize.wikia.com/api.php?action=query&generator=recentchanges&grclimit=500&grcdir=newer&grctype=new|edit&grcshow=!bot|!redirect&grcprop=ids|timestamp|title|sizes&prop=links&format=json
            links: {
                "1461": {
                    "pageid": 1461,
                    "ns": 0,
                    "title": "Revisualize Wiki",
                    "links": [
                        {
                            "ns": 0,
                            "title": "Bacon Ipsum"
                        }
                    ]
                },
                "2061": {
                    "pageid": 2061,
                    "ns": 1201,
                    "title": "Thread:Kyle Florence/@comment-Sarah Manley-20121213194416"
                },
                "2062": {
                    "pageid": 2062,
                    "ns": 0,
                    "title": "Example Page 1"
                },
                "2063": {
                    "pageid": 2063,
                    "ns": 0,
                    "title": "Example Page 2",
                    "links": [
                        {
                            "ns": 0,
                            "title": "Example Page 1"
                        }
                    ]
                },
                "2064": {
                    "pageid": 2064,
                    "ns": 0,
                    "title": "Example Page 3",
                    "links": [
                        {
                            "ns": 0,
                            "title": "Example Page 1"
                        },
                        {
                            "ns": 0,
                            "title": "Example Page 2"
                        },
                        {
                            "ns": 0,
                            "title": "Revisualize Wiki"
                        }
                    ]
                },
                "2065": {
                    "pageid": 2065,
                    "ns": 0,
                    "title": "Bacon Ipsum"
                }
            },

            addArticle: function( article ) {
                this.entities.push( article.entity );
                this.articles[ article.title ] = article;
            },

            articleExists: function( title ) {
                return !!this.getArticle( title );
            },

            getArticle: function( title ) {
                return this.articles[ title ];
            },

            updateArticle: function( title, revision ) {
                var article;

                if ( typeof title === 'object' ) {
                    revision = title;
                    title = revision.title;
                }

                article = this.getArticle( title );

                if ( article ) {
                    article.setRevision( revision );
                }
            },

            update: function() {
                var title;

                for ( title in this.articles ) {
                    this.articles[ title ].update();
                }
            }
        };

        return storage;
    }
);
