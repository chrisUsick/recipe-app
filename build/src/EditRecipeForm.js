define(["require", "exports", 'jquery'], function(require, exports, $) {
    var Recipe = (function () {
        function Recipe() {
            this.url = '';
            this.title = '';
            this.author = '';
            this.ingredients = [];
            this.directions = [];
            this.desc = '';
            this.time = '';
            this.serves = '';
            this.notes = '';
        }
        return Recipe;
    })();
    var EditRecipeForm = (function () {
        function EditRecipeForm(data, storeAccessor) {
            this.store = storeAccessor;
            this.reset(data);
        }
        EditRecipeForm.prototype.reset = function (data) {
            var _this = this;
            $("#editRecipe").children().remove();
            this.html = $(jade['jade/_editRecipeForm'](data))[0];
            $("#editRecipe").append(this.html);
            $(this.html).submit(function (ev) {
                ev.preventDefault();
                console.log('form submited');
                _this.store.addRecipe(_this.formToRecipe());
            });
        };

        EditRecipeForm.prototype.formToRecipe = function () {
            var r = new Recipe();
            var a = $('input, textarea', this.html).each(function (i, el) {
                var e = $(el);
                if (e.parents().hasClass('ingredientList')) {
                    r.ingredients.push(e.val());
                } else if (e.parents().hasClass('directionList')) {
                    r.directions.push(e.val());
                } else {
                    switch (e.prop('id')) {
                        case 'Title':
                            r.title = e.val();
                        case 'Description':
                            r.desc = e.val();
                        case 'Autor':
                            r.author = e.val();
                        case 'Serves':
                            r.serves = e.val();
                        case 'Time':
                            r.time = e.val();
                    }
                }
            });
            console.log(r);
            return r;
        };
        return EditRecipeForm;
    })();

    
    return EditRecipeForm;
});
//# sourceMappingURL=EditRecipeForm.js.map
