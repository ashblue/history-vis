define(
    [
        'controllers/scene'
    ],

    function (
        scene
    ) {
        var lighting = {
            init: function () {
                var pointLight =
                  new THREE.PointLight(0xFFFFFF);

                // set its position
                pointLight.position.x = 0;
                pointLight.position.y = 0;
                pointLight.position.z = 300;

                // add to the scene
                scene.ref.add(pointLight);
            }
        };

        return lighting;
    }
)