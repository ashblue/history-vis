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
        var $CANVAS = $('canvas');
        var $ZOOM_IN = $('#ui-zoom-in');
        var $ZOOM_OUT = $('#ui-zoom-out');
        var $ROTATE = $('#ui-rotate');

        var ZOOM_SENSITIVITY = 50;

        var ROTATE_ANGLE = 0;

        var ROTATE_DEFAULT = new THREE.Vector3(0,0,0);

        var _detectPolarity = function (num) {
            var polarity;

            if (num > 0) {
                polarity = -1;
            } else {
                polarity = 1;
            }

            return polarity;
        };

        var _event = {
            resizeWindow: function () {
                var windowWidth = window.innerWidth,
                    windowHeight = window.innerHeight;

                // Change Canvas rendering area
                renderer.setSize(windowWidth, windowHeight);

                // Tweak camera
                camera.ref.aspect = windowWidth / windowHeight;
                camera.ref.updateProjectionMatrix();
            },

            zoom: function (e) {
                var polarity;

                // Detect mouse delta
                console.log('test');
                if (e.data === null) {
                    polarity = _detectPolarity(e.originalEvent.wheelDelta);
                } else {
                    polarity = e.data.polarity;
                }

                camera.ref.position.z = camera.ref.position.z + (ZOOM_SENSITIVITY * polarity);
            },

            rotate: function (e) {
                camera.rotate = !camera.rotate;
            }
        };

        var camera = {
            rotate: false,

            ref: new THREE.PerspectiveCamera(
                cameraModel.viewAngle,
                cameraModel.aspect,
                cameraModel.near,
                cameraModel.far
            ),

            init: function () {
                this.bind();
                this.ref.position.z = 300;

                return this;
            },

            bind: function () {
                $(window)
                    .resize(_event.resizeWindow)
                    .bind('mousewheel', _event.zoom);

                $ZOOM_IN.bind('mousedown', { polarity: -1 }, _event.zoom);
                $ZOOM_OUT.bind('mousedown', { polarity: 1 }, _event.zoom);
                $ROTATE.bind('mousedown', _event.rotate);
            },

            setScene: function (obj) {
                this.scene = obj;
            }
        };

        return camera;
    }
);