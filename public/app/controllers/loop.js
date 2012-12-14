define(
    [
        'jquery',
        'controllers/camera',
        'models/camera',
        'controllers/scene',
        'models/sphere',
        'controllers/lighting',
        'controllers/storage',
        'models/delta',
        'models/timer'
    ],
    function (
        $,
        camera,
        cameraModel,
        scene,
        Sphere,
        lighting,
        storage,
        delta,
        Timer
    ) {
        var $app = $('#app');

        var _timerNewNode = null;

        var _private = {
            animate: function () {
                window.requestAnimFrame(_private.animate);
                loop.render();
            }
        };

        var loop = {
            renderer: new THREE.WebGLRenderer(),

            init: function () {
                // Initialize all necessary objects and setup
                camera.init();
                scene.init();
                this.renderer.setSize(cameraModel.width, cameraModel.height);

                // Inject the setup DOM element
                $app.html(this.renderer.domElement);

                // Build the scene
                storage.add(new Sphere(50, 16, 16), 1);
                lighting.init();

                // Begin looping
                _timerNewNode = new Timer(3000);
                _private.animate();
            },

            render: function () {
                var now = Date.now();
                delta.delay = now - (this.time || now);
                delta.now = now;

                console.log('looping like a boss');

                if (_timerNewNode.expire()) {
                    console.log('create new node');
                    //storage.entities[0].removeText();
                    storage.entities[0].addText();
                    _timerNewNode.reset();
                }

                var storageLength = storage.entities.length;
                for (var i = 0; i < storageLength; i++) {
                    storage.entities[i].update();
                }

                this.renderer.render(scene.ref, camera.ref);
            }
        };

        return loop;
    }
);