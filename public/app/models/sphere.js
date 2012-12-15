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

        /**
         * @todo Break up logic into storage
         */
        var Sphere = function (radius, segments, rings) {
            var self = this;

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
            scene.ref.add(self.mesh);

            // Create tweens
            this.tweenRed = new Tween(DEFAULT_RGB_COLOR, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenGreen = new Tween(DEFAULT_RGB_COLOR, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenBlue = new Tween(DEFAULT_RGB_COLOR, 0, TRANSITION_TIME, 'quadInOut');
            this.tweenSize = new Tween(1, 0, TRANSITION_TIME, 'quadInOut');
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

            //this.material.color.setRGB(1, 0.5, 0.5);

            // Set size
            // tweenSize
            this.mesh.scale.x = this.mesh.scale.y = this.tweenSize.getValue();
            //this.mesh.scale.x = 1.2;

        };

        Sphere.prototype.addText = function () {
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

        Sphere.prototype.removeText = function () {
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