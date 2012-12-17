define(
    [
		'models/article',
		'models/data',
		'models/line',
		'models/sphere',
		'models/text'
	],
    function(
		Article,
		data,
		Line,
		Sphere,
		Text
	) {
		var _articleCount = 0;
		var _lastPoint = { x: 0, y: 0, z: 0 };
		var _lastRadius = 0;
		var _linksToAdd = [];
		var _linksToAddCount = 0;

		var MAX_RADIUS = 50;
		var MIN_RADIUS = 5;
		var PI2 = Math.PI * 2;

		function getRadius( size ) {
			return Math.min( Math.max( size / 100, MIN_RADIUS ), MAX_RADIUS );
		}

		// Check if one sphere collides with another
		function collides( x, y, radius ) {
			var article, dx, dy, radii, title,
				i = 0;

			for ( title in this.articles ) {
				if ( article = this.getArticle( title ) ) {
					dx = article.sphere.mesh.position.x - x;
					dy = article.sphere.mesh.position.y - y;
					radii = radius + ( article.sphere.mesh.geometry.radius * article.sphere.mesh.scale.x );

					if ( ( dx * dx )  + ( dy * dy ) < radii * radii ) {
						return true;
					}
				}
			}

			return false;
		}

		// Generate a random point around the center that doesn't collide
		// with any existing spheres
		function getRandomPoint( radius ) {
        	var angle, nx, ny,
				distance = _lastRadius + radius + MAX_RADIUS,
				x = _lastPoint.x,
				y = _lastPoint.y,
				z = _lastPoint.z;

			if ( _articleCount === 0 ) {
				return _lastPoint;
			}

			return (function getPoint() {
				angle = Math.random() * PI2;
				nx = x + Math.cos( angle ) * distance;
				ny = y + Math.sin( angle ) * distance;

				if ( !collides( nx, ny, radius ) ) {
				    return {
						x: nx,
						y: ny,
						z: z
					};

				} else {
					return getPoint();
				}
			}());
		}

        var storage = {
            articles: {},
			lines: {},
            entities: [],

            addArticle: function( article ) {
				var linkFrom = data.links[ article.id ];

                this.entities.push( article.sphere );
				//this.entities.push( article.text );

                this.articles[ article.title ] = article;

				if ( linkFrom && linkFrom.links ) {
					_linksToAdd.push( linkFrom );
					_linksToAddCount += linkFrom.links.length;
				}
            },

			addLine: function( line ) {
				this.entities.push( line );

				if ( !this.lines[ line.articleFrom.title ] ) {
					this.lines[ line.articleFrom.title ] = {};
				}

				if ( !this.lines[ line.articleTo.title ] ) {
					this.lines[ line.articleTo.title ] = {};
				}

				this.lines[ line.articleFrom.title ][ line.articleTo.title ]
					= this.lines[ line.articleTo.title ][ line.articleFrom.title ]
					= line;
			},

			addRevision: function( revision ) {
				var article, point, radius;

                if ( !this.articleExists( revision.title ) ) {
					radius = getRadius( revision.newlen );
					point = getRandomPoint( radius );
					sphere = new Sphere( point.x, point.y, point.z, radius );

					// FIXME: add this back when text doesn't look so terrible
					//text = new Text( revision.title, sphere );
					article = new Article( revision, sphere/*, text */);

	                this.addArticle( article );

					_articleCount++;
					_lastPoint = point;
					_lastRadius = radius;

                } else {
	                this.updateArticle( revision );
                }
			},

            articleExists: function( title ) {
                return !!this.getArticle( title );
            },

            getArticle: function( title ) {
                return this.articles[ title ];
            },

			getLine: function( fromTitle, toTitle ) {
				var line;
				return ( line = this.lines[ fromTitle ] ) && line[ toTitle ];
			},

			lineExists: function( fromTitle, toTitle ) {
				return !!this.getLine( fromTitle, toTitle );
			},

			getRevision: function( index ) {
				return data.revisions[ index ];
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
                var articleFrom, articleTo, entitiesLength, j, l, linkFrom, linkTo,
					i = 0,
					linksLength = _linksToAdd.length;

				if ( _linksToAddCount && linksLength ) {
					for ( ; i < linksLength; i++ ) {
						linkFrom = _linksToAdd[ i ];

						if ( linkFrom.links ) {
							articleFrom = this.getArticle( linkFrom.title );

							for ( j = 0, l = linkFrom.links.length; j < l; j++ ) {
								linkTo = linkFrom.links[ j ];
								articleTo = this.getArticle( linkTo.title );

								if ( articleTo ) {
									if ( !this.lineExists( linkFrom.title, linkTo.title ) ) {
										this.addLine( new Line( articleFrom, articleTo ) );
									}

									_linksToAddCount--;
								}
							}
						}
					}
				}

				for ( i = 0, entitiesLength = this.entities.length; i < entitiesLength; i++ ) {
					this.entities[ i ].update();
				}
            }
        };

        return storage;
    }
);
