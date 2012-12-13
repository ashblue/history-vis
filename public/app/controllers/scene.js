define(
    [
        'controllers/camera'
    ],

    function (
        camera
    ) {
        var scene = {
            ref: new THREE.Scene(),

            init: function () {
                this.ref.add(camera.ref);
                camera.ref.position.z = 300;
            }
        };

        return scene;
    }
);