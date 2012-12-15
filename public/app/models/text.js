define(
    [
        'controllers/scene'
    ],

    function (
        scene
    ) {
        var DEBUG = true;

        var PRE_CLIPPING_CANVAS_HEIGHT = 100;

        var FONT_STYLE = '20px Arial';

        /**
         * @todo Break up logic into storage
         */
        var Text = function (string) {
            // Basic setup
            var canvas = document.createElement('canvas'),
                ctx = canvas.getContext('2d'),
                y;

            if (DEBUG) {
                $('body').prepend(canvas);
            }

            ctx.font = FONT_STYLE;

            // Determine width output of the text
            this.size = ctx.measureText(string);
            canvas.width = this.size.width;
            canvas.height = PRE_CLIPPING_CANVAS_HEIGHT;

            // Determine height output of the text
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (y = 0; y < PRE_CLIPPING_CANVAS_HEIGHT; y++) {

            }

            // Output pre-rendered text on Canvas
            ctx.textBaseline = 'top';
            ctx.fillText(string, 0, 0);
        };

        return Text;
    }
);