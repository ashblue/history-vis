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
                pointLight.position.x = 10;
                pointLight.position.y = 50;
                pointLight.position.z = 130;

                // add to the scene
                scene.ref.add(pointLight);
            }
        };

        return lighting;
    }
)