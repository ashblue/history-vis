define(
    [
        'controllers/scene',
        'lib/tween'
    ],

    function (
        scene,
        Tween
    ) {
        var TRANSITION_TIME = 2000;

        /**
         * @todo Break up logic into storage
         */
        var Sphere = function( x, y, z, radius ) {
			var point;
            var self = this;
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

            this.tweenRed = new Tween(this.mesh.material.color.r, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenGreen = new Tween(this.mesh.material.color.g, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenBlue = new Tween(this.mesh.material.color.b, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenSize = new Tween(1, 0, TRANSITION_TIME, 'quadInOut');

			this.mesh.position.set( x, y, z );

            scene.ref.add(this.mesh);
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

            this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = this.tweenSize.getValue();
        };

        return Sphere;
    }
);
