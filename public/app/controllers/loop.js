define(
    [
        'jquery',
        'controllers/camera',
        'models/camera',
        'controllers/scene',
        'models/sphere',
        'controllers/lighting',
        'controllers/storage'
    ],
    function (
        $,
        camera,
        cameraModel,
        scene,
        Sphere,
        lighting,
        storage
    ) {
        var $app = $('#app');

        var loop = {
            renderer: new THREE.WebGLRenderer(),

            init: function () {
                // Initialize all necessary objects and setup
                camera.init();
                scene.init();
                this.renderer.setSize(cameraModel.width, cameraModel.height);

                // Inject the setup DOM element
                $app.html(this.renderer.domElement);

                // Inject sphere
                storage.add(new Sphere(50, 16, 16), 1);

                lighting.init();

                this.renderer.render(scene.ref, camera.ref);
            },

            renderer: function () {
                console.log('looping like a boss');
            }
        };

        return loop;
    }
);