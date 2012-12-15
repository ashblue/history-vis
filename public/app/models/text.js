define(
    [
        'controllers/scene'
    ],

    function (
        scene
    ) {
        var DEBUG = false;

        var PRE_CLIPPING_CANVAS_HEIGHT = 100;

        var FONT_STYLE = '40px Tahoma';

        /**
         * @todo Break up logic into storage
         */
        var Text = function (string) {
            // Basic setup
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                heightCalc = 0,
                x,
                y,
                idx;

            if (DEBUG) {
                $('body').prepend(canvas);
            }

            ctx.font = FONT_STYLE;

            // Determine width output of the text
            this.size = ctx.measureText(string);
            console.log(this.size);
            canvas.width = this.size.width;
            canvas.height = PRE_CLIPPING_CANVAS_HEIGHT;
            ctx.textBaseline = 'top';
            ctx.font = FONT_STYLE;
            ctx.fillText(string, 0, 0);

            // Clip height of text
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (x = 0; x < canvas.width; x++) {
                for (y = 0; y < PRE_CLIPPING_CANVAS_HEIGHT; y++) {
                    idx = (x + y * canvas.width) * 4;

                    if (imageData.data[idx + 3] && imageData.data[idx + 3] > heightCalc) {
                        heightCalc = y;
                    }
                }
            }

            //canvas.width = this.size.width;
            canvas.height = heightCalc + 2;
            ctx.textBaseline = 'top';
            ctx.font = FONT_STYLE;
            ctx.fillText(string, 0, 0);

            // Convert flat pre-rendered canvas into a 3D shape
            var texture = new THREE.Texture(canvas);
            texture.needsUpdate = true;

            var material = new THREE.MeshBasicMaterial({
                map: texture,
                transparent: true,
                doubleSided: true
            });

            material.side = THREE.DoubleSide;

            this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(canvas.width / 6, canvas.height / 6), material);
        };

        return Text;
    }
);