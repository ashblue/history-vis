define(
    [
        'controllers/scene',
		'controllers/storage',
        'lib/tween'
    ],

    function (
        scene,
		storage,
        Tween
    ) {
        var TRANSITION_TIME = 2000;
		var MAX_RADIUS = 50;
		var MIN_RADIUS = 5;
		var PI2 = Math.PI * 2;

		var count = 0;
		var lastRadius;

		function getRadius( size ) {
			return Math.min( Math.max( size / 100, MIN_RADIUS ), MAX_RADIUS );
		}

		// Check if one sphere collides with another
		function collides( x, y, radius ) {
			var article, dx, dy, radii, title,
				i = 0;

			for ( title in storage.articles ) {
				article = storage.articles[ title ];

				if ( article ) {
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

		// Generate a random point around the last sphere that doesn't collide
		// with any existing spheres
		function randomPoint( x, y, radius ) {
        	var angle, nx, ny,
				distance = lastRadius + radius + MAX_RADIUS;

			return (function getPoint() {
				angle = Math.random() * PI2;
				nx = x + Math.cos( angle ) * distance;
				ny = y + Math.sin( angle ) * distance;

				if ( !collides( nx, ny, radius ) ) {
				    return {
						x: nx,
						y: ny
					};

				} else {
					return randomPoint( x, y, radius );
				}
			}());
		}

        /**
         * @todo Break up logic into storage
         */
        var Sphere = function( size ) {
			var point;
            var self = this;
            var radius = getRadius( size );
            var segments = Math.max( radius / 2, 15 );
            var rings = Math.max( radius / 2, 15 );

            // Set general properties
            this.radius = radius;
            this.segments = segments;
            this.rings = rings;

            this.mesh = new THREE.Mesh(
                new THREE.SphereGeometry(
                    radius,
                    segments,
                    rings
                ),
				new THREE.MeshLambertMaterial({
					color: 0xffffff,
					shading: THREE.FlatShading
            }));

            // Create tweens
            this.tweenRed = new Tween(this.mesh.material.color.r, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenGreen = new Tween(this.mesh.material.color.g, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenBlue = new Tween(this.mesh.material.color.b, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenSize = new Tween(1, 0, TRANSITION_TIME, 'quadInOut');

			// Update placement position if not the first sphere
            if ( count > 0 ) {
				point = randomPoint( this.mesh.position.x, this.mesh.position.y, radius );

				this.mesh.position.x = point.x;
				this.mesh.position.y = point.y;
            }

			this.update();

            // Add sphere to scene
            scene.ref.add(this.mesh);

            count++;
            lastRadius = radius;
        };

        Sphere.prototype.grow = function () {
            this.tweenGreen.set(
                this.tweenGreen.getValue(),
                0.3,
                TRANSITION_TIME
            );

            this.tweenSize.set(
                this.tweenSize.getValue(),
                0.3,
                TRANSITION_TIME
            );

            this.tweenGreen.reset();
            this.tweenSize.reset();
        };

        Sphere.prototype.shrink = function () {
            this.tweenRed.set(
                this.tweenRed.getValue(),
                0.3,
                TRANSITION_TIME
            );

            this.tweenSize.set(
                this.tweenSize.getValue(),
                -0.3,
                TRANSITION_TIME
            );

            this.tweenRed.reset();
            this.tweenSize.reset();
        };

        Sphere.prototype.update = function () {
            this.mesh.material.color.setRGB(
                this.tweenRed.getValue(),
                this.tweenGreen.getValue(),
                this.tweenBlue.getValue()
            );

            // Set size
            this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = Math.min(this.tweenSize.getValue(), MAX_RADIUS);
        };

        return Sphere;
    }
);
