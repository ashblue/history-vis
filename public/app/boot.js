require.config({
    paths: {
        jquery: 'lib/jquery'
    }
});

require(
    [
        'controllers/loop'
    ],

    function (
        loop
    ) {
        loop.init();
    }
)