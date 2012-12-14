define(
    [
        'controllers/scene',
        'lib/tween'
    ],

    function (
        scene,
        Tween
    ) {
        var DEFAULT_COLOR = 0x999999;

        var _tweenColor = new Tween(0, 1, 1000, 'linear');

        var _tweenSize = new Tween(0, 1, 1000, 'linear');

        /**
         * @todo Break up logic into storage
         */
        var Sphere = function (radius, segments, rings) {
            var self = this;
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

            console.log(this.mesh, this.material);

            scene.ref.add(self.mesh);
        };

        Sphere.prototype.setMaterial = function () {
            this.material = new THREE.MeshLambertMaterial(
                {
                  color: DEFAULT_COLOR
                }
            );

            return this;
        };

        Sphere.prototype.update = function () {
            // Set color
            //this.material.color.setRGB(1, 0.5, 0.5);

            // Set size
            //this.mesh.scale.y = 1.2;
            //this.mesh.scale.x = 1.2;

        };

        Sphere.prototype.addText = function () {

        };

        return Sphere;
    }
);