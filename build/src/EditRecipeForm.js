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
        function EditRecipeForm(data, formCallback) {
            this.formCallback = formCallback;
            this.url = data.url;
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
                _this.formCallback(_this.formToRecipe());

                delete _this;
            });
            var width = innerWidth / 8;
            $("textarea", this.html).attr("cols", "" + width);
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
                    console.log(e.prop("id"));
                    switch (e.prop('id')) {
                        case 'Title':
                            r.title = e.val();
                            break;
                        case 'Description':
                            r.desc = e.val();
                            break;
                        case 'Author':
                            r.author = e.val();
                            break;
                        case 'Serves':
                            r.serves = e.val();
                            break;
                        case 'Time':
                            r.time = e.val();
                            break;
                    }
                }
            });

            r.url = this.url;
            console.log(r);
            return r;
        };
        return EditRecipeForm;
    })();

    
    return EditRecipeForm;
});
//# sourceMappingURL=EditRecipeForm.js.map
