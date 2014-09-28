define(["require", "exports", "jquery"], function(require, exports, $) {
    var Nav = (function () {
        function Nav(selector) {
            var _this = this;
            this.views = {};
            this.callbacks = {};
            this.selector = selector;

            var hash = location.hash != "" && location.hash != undefined ? location.hash.match(/#[\w]+/)[0] : "";
            $(this.selector).each(function (i, e) {
                var id = "#" + e.getAttribute("id");
                _this.views[id] = e;

                _this.callbacks[id] = [];

                if (hash != "" && hash != null) {
                    if (id == hash) {
                        _this.currentView = e;
                        $(e).show();
                    } else {
                        $(e).hide();
                    }
                } else {
                    if (i != 0) {
                        $(e).hide();
                    }
                    if (i == 0) {
                        _this.currentView = e;
                        $(e).show();
                    }
                }
            });

            $(window).on("hashchange", function (e) {
                var hash = e.target['location'].hash;
                console.log(hash, _this.callbacks, _this.views);

                $(_this.currentView).hide();

                _this.currentView = _this.views[hash];
                $(_this.currentView).show();

                if (_this.callbacks[hash]) {
                    _this.callbacks[hash].forEach(function (fn) {
                        fn();
                    });
                }
            });
        }
        Nav.prototype.navigateTo = function (hashLoc) {
            if (this.views[hashLoc]) {
                var base = document.URL.split("#")[0];
                location.assign(base + hashLoc);
                console.log("navigating to: ", hashLoc);
            } else {
                return;
            }
        };
        Nav.prototype.addCallback = function (location, cb) {
            this.callbacks[location].push(cb);
        };
        return Nav;
    })();

    
    return Nav;
});
//# sourceMappingURL=Nav.js.map
