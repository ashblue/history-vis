define(
    [],
    function () {
        var camera = {
            // Viewing window
            width: window.innerWidth,
            height: window.innerHeight,

            // Various attributes
            viewAngle: 45,
            aspect: window.innerWidth / window.innerHeight,
            near: 1,
            far: 10000
        };

        return camera;
    }
);
