define(
    [
        'controllers/scene',
        'models/text',
        'lib/tween'
    ],

    function (
        scene,
        Text,
        Tween
    ) {
        var DEFAULT_HEX_COLOR = 0x999999;

        var DEFAULT_RGB_COLOR = 0.5;

        var TRANSITION_TIME = 2000;

        var x = 0;
        var y = 0;
        var z = 0;

		var MAX_RADIUS = 50;
		var MIN_RADIUS = 5;

		var count = 0;
		var last;

        /**
         * @todo Break up logic into storage
         */
        var Sphere = function ( size ) {
            var self = this;
            var radius = Math.min( Math.max( size / 100, MIN_RADIUS ), MAX_RADIUS );
            var segments = Math.max( radius / 2, 15 );
            var rings = Math.max( radius / 2, 15 );
console.log('new sphere:', size, radius, segments);
            // Set general properties
            this.radius = radius;
            this.segments = segments;
            this.rings = rings;
            this.setMaterial();

            this.mesh = new THREE.Mesh(
                new THREE.SphereGeometry(
                    radius,
                    segments,
                    rings
                ), self.material
            );

            // Create text
            //this.text = new Text('test');

            // Add to scene
            scene.ref.add(this.mesh);

            if ( count > 0 ) {
	            x += last.radius + radius / 2 + MIN_RADIUS;
	            y += last.radius + radius / 2 + MIN_RADIUS;
	            this.mesh.position.x = x;
	            this.mesh.position.y = y;
            }

            // Create tweens
            this.tweenRed = new Tween(DEFAULT_RGB_COLOR, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenGreen = new Tween(DEFAULT_RGB_COLOR, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenBlue = new Tween(DEFAULT_RGB_COLOR, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenSize = new Tween(1, 0, TRANSITION_TIME, 'quadInOut');

            count++;
            last = this;
        };

        Sphere.prototype.setMaterial = function () {
            this.material = new THREE.MeshLambertMaterial(
                {
                  color: DEFAULT_HEX_COLOR
                }
            );

            return this;
        };

        Sphere.prototype.update = function () {
            // Set color
            this.material.color.setRGB(
                this.tweenRed.getValue(),
                this.tweenGreen.getValue(),
                this.tweenBlue.getValue()
            );

            // Set size
            this.mesh.scale.x = this.mesh.scale.y = this.tweenSize.getValue();
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

        return Sphere;
    }
);