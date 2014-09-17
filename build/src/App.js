define(["require", "exports", "Foo", "jquery", "Store", "Parser", "Nav", 'EditRecipeForm'], function(require, exports, Foo, $, Store, Parser, Nav, EditRecipeForm) {
    

    var App = (function () {
        function App() {
            this.nav = new Nav("#view-container div");
            this.store = new Store.RecipeStore(new Store.ChromeAccessor());
            this.store.getRecipes(function (items) {
                console.log(items, "recipes");
            });
            Parser.init();

            this.omniboxInit();
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
                        _this.ERF = new EditRecipeForm(recipe, _this.store);
                    });
                } else {
                }
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
