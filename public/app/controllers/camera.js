define(
    [
        'models/camera'
    ],

    function (
        cameraModel
    ) {
        var camera = {
            ref: new THREE.PerspectiveCamera(
                cameraModel.viewAngle,
                cameraModel.aspect,
                cameraModel.near,
                cameraModel.far
            ),

            init: function () {

                return this;
            }
        };

        return camera;
    }
);