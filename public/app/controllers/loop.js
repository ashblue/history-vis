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
        var ROTATE_DEFAULT = new THREE.Vector3(0,0,0);

        var $app = $('#app');

        var _index = 0;
        var _length = storage.revisions.length;
        var _revision;
        var _timer = new Timer(2000);
        var _rotateCount = Date.now();

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

                if (camera.rotate === true) {
                    var timer = _rotateCount * 0.0005;
                    camera.ref.position.x = Math.cos( timer ) * 200;
                    camera.ref.position.z = Math.sin( timer ) * 200;
                    camera.ref.lookAt(ROTATE_DEFAULT);
                    _rotateCount += 20;
                }

                renderer.render(scene.ref, camera.ref);
            }
        };

        return loop;
    }
);