define(
    [
        'controllers/scene'
    ],

    function (scene) {
        var storage = {
            library: {},
            entities: [],

            add: function (ref, id) {
                this.entities.push(ref);
                this.library[id] = ref;
            },

            get: function (id) {
                return this.library[id];
            }
        };

        return storage;
    }
);