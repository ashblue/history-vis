define(
	[
		'models/sphere',
		'models/text'
	],
	function( Sphere, Text ) {
		var Article = function( revision ) {
			this.entity = new Sphere( revision.newlen );
			this.revision = revision;
			this.text = new Text( revision.title, this.entity );
			this.title = revision.title;
		};

		Article.prototype.setRevision = function( revision ) {
			if ( revision.oldlen < revision.newlen ) {
				this.entity.grow();

			} else if ( revision.oldlen > revision.newlen ) {
				this.entity.shrink();
			}

			this.revision = revision;
		}

		Article.prototype.update = function() {
			this.entity.update();
			this.text.update();
		};

		return Article;
	}
);
