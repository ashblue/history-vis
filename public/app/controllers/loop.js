define(
    [
        'jquery',
        'controllers/camera',
        'models/camera',
        'controllers/scene',
        'controllers/lighting',
        'controllers/storage',
        'models/delta',
        'models/timer',
        'models/renderer'
    ],
    function (
        $,
        camera,
        cameraModel,
        scene,
        lighting,
        storage,
        delta,
        Timer,
        renderer
    ) {
        var $app = $('#app');

        var _index = 0;
        var _length = storage.revisions.length;
        var _revision;
        var _timer = new Timer(2000);

        function animate() {
        	loop.render();
            window.requestAnimFrame(animate);
        }

        var loop = {
            init: function () {
                // Initialize all necessary objects and setup
                camera.init();
                lighting.init();
                scene.init();

                renderer.setSize(cameraModel.width, cameraModel.height);

                // Inject the setup DOM element
                $app.html(renderer.domElement);

                // Begin looping
                animate();
            },

            render: function() {
            	delta.update();
            	_timer.tick();

                console.log('looping');

                if (_index === 0 || _index < _length && _timer.running && _timer.expired) {
                	_revision = storage.revisions[_index];

                	if (!storage.articleExists(_revision.title)) {
	                	storage.addArticle(_revision);

                	} else {
	                	storage.updateArticle(_revision);
                	}

                	_index++;
	                _timer.start();
                }

                //physics.update();
                storage.updateEntities();

                renderer.render(scene.ref, camera.ref);
            }
        };

        return loop;
    }
);