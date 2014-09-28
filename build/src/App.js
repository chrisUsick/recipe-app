define(["require", "exports", "Foo", "jquery", "Store", "Parser", "Nav", "RecipeMvc"], function(require, exports, Foo, $, Store, Parser, Nav, Mvc) {
    

    var App = (function () {
        function App() {
            this.nav = new Nav("#view-container div");
            this.parentActions = {
                edit: $("div#editRecipe")[0],
                show: $("div#recipe")[0],
                summarize: $("div#allRecipes")[0]
            };
            this.store = new Store.RecipeStore(new Store.ChromeAccessor());
            this.store.getRecipes(function (items) {
                console.log(items, "recipes");
            });
            Parser.init();

            this.omniboxInit();
            this.allRecipes();
        }
        App.prototype.run = function () {
            var foo = new Foo();
            $("#msg").text("foo");
        };

        App.prototype.omniboxInit = function () {
            var _this = this;
            $("#omnibox").submit(function (ev) {
                ev.preventDefault();
                var data = $("input", ev.target).val().trim();

                if (data.search(' ') == -1) {
                    Parser.parse(data, function (recipe) {
                        _this.nav.navigateTo("#editRecipe");
                        var r = new Mvc.RecipeMvc(_this.parentActions, true, null, recipe);
                        r.setShowCallback(function () {
                            _this.nav.navigateTo("#recipe");
                        });
                    });
                } else {
                }
            });
        };
        App.prototype.allRecipes = function () {
            var _this = this;
            this.nav.addCallback("#allRecipes", function () {
                $("div#allRecipes").children().remove();

                _this.store.getRecipes(function (recipes) {
                    console.log(recipes);
                    recipes.forEach(function (rec, i) {
                        var r = new Mvc.RecipeMvc(_this.parentActions, false, null, rec);
                        r.setShowCallback(function () {
                            _this.nav.navigateTo("#recipe");
                        });
                        r.summarize(_this.parentActions.summarize);
                    });
                });
            });
        };
        App.prototype.deleteRecipe = function () {
            $(".delRecipe").click(function (e) {
            });
        };
        return App;
    })();

    function test() {
        $.ajax({
            url: "http://allrecipes.com/Recipe/Amatriciana/Detail.aspx?soid=carousel_0_rotd&prop24=rotd",
            type: "GET",
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            }
        }).done(function (res) {
            var html = $.parseHTML(res);
        });
    }
    function allRecipes(url, html) {
        function getIngredients() {
            var ingreds = [];

            $('.ingred-left ul li', html).each(function (i, el) {
                ingreds.push($(el).text().trim().replace(/[\s]{2,}/g, ' '));
            });
            return ingreds;
        }
        function getDirs() {
            var dirs = [];
            $('div[itemprop="recipeInstructions"] ol li', html).each(function (i, el) {
                dirs.push(el.textContent.trim());
            });
            return dirs;
        }
        var recipe = {
            url: url,
            title: $("#itemTitle", html).text(),
            serves: $(".servings span[itemprop='recipeYield']", html).text(),
            author: $(".author", html).text(),
            desc: $('span[itemprop="description"]', html).text(),
            time: $('.time', html).text(),
            ingredients: getIngredients(),
            directions: getDirs()
        };
        return recipe;
    }

    
    return App;
});
//# sourceMappingURL=App.js.map
