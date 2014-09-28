define(["require", "exports"], function(require, exports) {
    var ChromeAccessor = (function () {
        function ChromeAccessor() {
        }
        ChromeAccessor.prototype.getItem = function (key, callback) {
            chrome.storage.local.get(key, function (items) {
                callback(items[key]);
            });
        };
        ChromeAccessor.prototype.setItem = function (key, value) {
            var kv = {};
            kv[key] = value;
            chrome.storage.local.set(kv);
        };
        ChromeAccessor.prototype.removeItem = function (key) {
            chrome.storage.local.remove(key);
        };
        return ChromeAccessor;
    })();
    exports.ChromeAccessor = ChromeAccessor;

    

    var RecipeStore = (function () {
        function RecipeStore(lStore) {
            var _this = this;
            this.lStore = lStore;
            this.lStore.getItem("recipes", function (recs) {
                console.log("recipeStore init", recs);
                if (!recs) {
                    _this.lStore.setItem("recipes", []);
                }
            });
        }
        RecipeStore.prototype.addRecipe = function (rec) {
            var _this = this;
            this.lStore.getItem("recipes", function (recs) {
                recs = recs.filter(function (v, i) {
                    return v.url != rec.url;
                });
                recs.push(rec);
                _this.lStore.setItem("recipes", recs);
            });
        };
        RecipeStore.prototype.getRecipe = function (criteria, callback) {
            var res = [];
            this.lStore.getItem("recipes", function (recs) {
                recs.forEach(function (rec, i) {
                    if (criteria.url == rec.url) {
                        res.push(rec);
                        return;
                    }
                    if (criteria.text) {
                        for (var p in rec) {
                            if (p != "url") {
                                if (rec[p].search(criteria.text) >= 0) {
                                    res.push(rec);
                                }
                            }
                        }
                    }
                    callback(res);
                });
            });
        };
        RecipeStore.prototype.getRecipes = function (callback) {
            return this.lStore.getItem("recipes", callback);
        };

        RecipeStore.prototype.deleteRecipe = function (url) {
            var _this = this;
            this.getRecipes(function (items) {
                var matches = [];

                items = items.filter(function (v, i) {
                    return (v.url != url);
                });
                _this.lStore.setItem("recipes", items);
            });
        };
        return RecipeStore;
    })();
    exports.RecipeStore = RecipeStore;
});
//# sourceMappingURL=Store.js.map
