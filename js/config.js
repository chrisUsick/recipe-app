require.config({
    baseUrl: "../build/src",
    paths: {
        "jquery": "../../js/jquery"
    },
    shim: {
        jquery: {
            exports: "$"
        }
    }
})