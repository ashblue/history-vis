define(
    [
        'controllers/scene'
    ],

    function (
        scene
    ) {
        var lighting = {
            init: function () {
                var light = new THREE.DirectionalLight( 0xffffff );

				light.position.set( 0, 0, 1 );

                scene.ref.add( light );
            }
        };

        return lighting;
    }
)
