define(
    ['controllers/scene'],

    function (
        scene
    ) {
        var DEFAULT_COLOR = 0xCC0000;

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

        return Sphere;
    }
);