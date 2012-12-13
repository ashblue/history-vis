require.config({
    paths: {
        jquery: 'lib/jquery'
    }
});

require(
    [
        'lib/animation',
        'controllers/loop'
    ],

    function (
        animation,
        loop
    ) {
        loop.init();
    }
)