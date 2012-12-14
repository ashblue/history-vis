define(
    [
        'jquery',
        'models/renderer',
        'models/camera'
    ],

    function (
        $,
        renderer,
        cameraModel
    ) {
        var _event = {
            resizeCamera: function () {
                var windowWidth = window.innerWidth,
                    windowHeight = window.innerHeight;

                // Change Canvas rendering area
                renderer.setSize(windowWidth, windowHeight);

                // Tweak camera
                camera.ref.aspect = windowWidth / windowHeight;
                camera.ref.updateProjectionMatrix();
            }
        };

        var camera = {
            ref: new THREE.PerspectiveCamera(
                cameraModel.viewAngle,
                cameraModel.aspect,
                cameraModel.near,
                cameraModel.far
            ),

            init: function () {
                this.bind();

                return this;
            },

            bind: function () {
                $(window).resize(_event.resizeCamera);
            }
        };

        return camera;
    }
);