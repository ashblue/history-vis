define(
	[
		'models/sphere'
	],
	function( Sphere ) {
		var Article = function( revision ) {
			this.entity = new Sphere( revision.newlen );
			this.revision = revision;
			this.title = revision.title;
		};

		Article.prototype.update = function( revision ) {
			if ( revision.oldlen < revision.newlen ) {
				this.entity.grow();

			} else if ( revision.oldlen > revision.newlen ) {
				this.entity.shrink();
			}

			this.revision = revision;
		}

		return Article;
	}
);