define(
    [
        'models/delta'
    ],
    function (
        delta
    ) {
        var Timer = function( delay ) {
            this.delay = delay;
            this.expired = false;
            this.running = false;
        };

        Timer.prototype.start = function() {
        	this.startTime = delta.now;
        	this.endTime = this.startTime + this.delay;
	        this.running = true;
        }

        Timer.prototype.stop = function() {
        	this.endTime = delta.now;
	        this.running = false;
        }

        Timer.prototype.tick = function() {
	        this.expired = delta.now >= this.endTime;
        }

        return Timer;
    }
);