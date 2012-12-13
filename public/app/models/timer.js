define(
    [
        'models/delta'
    ],
    function (
        delta
    ) {
        var Timer = function (delay) {
            this.setDelay(delay);
        };

        Timer.prototype.reset = function () {
            this.start = delta.now;
            this.end = delta.now + this.delay;
        };

        Timer.prototype.setDelay = function (delay) {
            this.delay = delay;
            this.reset();
        };

        Timer.prototype.expire = function () {
            if (delta.now >= this.end) {
                return true;
            }

            return false;
        };

        return Timer;
    }
);