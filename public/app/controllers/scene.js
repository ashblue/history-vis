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
                camera.setScene(this.ref);
            }
        };

        return scene;
    }
);