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
                recs.push(rec);
                _this.lStore.setItem("recipes", recs);
            });
        };

        RecipeStore.prototype.getRecipes = function (callback) {
            return this.lStore.getItem("recipes", callback);
        };
        return RecipeStore;
    })();
    exports.RecipeStore = RecipeStore;
});
//# sourceMappingURL=Store.js.map
