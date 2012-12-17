define(
	[],
	function( Sphere, Text ) {
		var Article = function( revision, sphere, text ) {
			this.id = revision.pageid;
			this.sphere = sphere;
			this.revision = revision;
			this.text = text;
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
