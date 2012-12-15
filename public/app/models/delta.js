define(
    [],
    function () {
        var delta = {
            now: Date.now(),
            delay: 0,
            update: function() {
	            var now = Date.now();

	            this.delay = 0.001 * ( now - this.now );
	            this.now = now;
            }
        };

        return delta;
    }
);