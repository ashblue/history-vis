define(
    [],
    function () {
        var camera = {
            // Viewing window
            width: 400,
            height: 300,

            // Various attributes
            viewAngle: 45,
            aspect: 400 / 300,
            near: 0.1,
            far: 10000
        };

        return camera;
    }
);