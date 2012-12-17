define(
	[		
		'models/sphere',
		'models/text'
	],
	function( Sphere, Text ) {
		var Article = function( revision ) {
			this.id = revision.pageid;
			this.sphere = new Sphere( revision.newlen );
			this.revision = revision;

// FIXME: add text back when it doesn't look so terrible
//			this.text = new Text( revision.title, this.sphere );
			this.title = revision.title;
console.log('added article:', this);
		};

		Article.prototype.setRevision = function( revision ) {
			if ( revision.oldlen < revision.newlen ) {
				this.sphere.grow();

			} else if ( revision.oldlen > revision.newlen ) {
				this.sphere.shrink();
			}

			this.revision = revision;
		}

		return Article;
	}
);
