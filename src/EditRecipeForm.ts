declare var jade;

import $ = require('jquery')
import IRecipe = require('IRecipe')
import Store = require('Store')

/**
 * a simple constructor class for the IRecipe interface
 */
class Recipe implements IRecipe {
    url:string = ''
    title: string = ''
    author: string = ''
    ingredients: string[] = [] 
    directions: string[] = []
    desc: string = ''
    time:string = ''
    serves: string = ''
    notes: string = ''

    constructor() {
    }
}
/*
 * controls the editRecipeForm
*/
class EditRecipeForm {
    private html: HTMLElement
    // save the url for formToRecipe so it doesn't get lost in the conversion
    private url:string
    /*
    * @param formCallback callback ran when form is submitted
    */
    constructor(data: IRecipe, public formCallback: (recipe:IRecipe) => void) {
        this.url = data.url
        this.reset(data)
    }
    /**
    * emtpy the #editRecipe div and populates it with a form
    */
    reset(data: IRecipe) {
        $("#editRecipe").children().remove()
        this.html = $(jade['jade/_editRecipeForm'](data))[0]
        $("#editRecipe").append(this.html)
        $(this.html).submit((ev) => {
            ev.preventDefault()
            console.log('form submited')
            this.formCallback(this.formToRecipe())
            // after form submits this object is useless
            delete this;
        })
        var width = innerWidth/8
        $("textarea", this.html).attr("cols", "" + width)
    }

    /**
    * @returns the edited recipe from a form
    */
    private formToRecipe():IRecipe {
        var r: IRecipe = new Recipe()
        var a = $('input, textarea', this.html).each((i, el) => {
            var e:JQuery = $(el)
            if (e.parents().hasClass('ingredientList')) {
                r.ingredients.push(e.val())
            } else if (e.parents().hasClass('directionList')) {
                r.directions.push(e.val())
            } else {
                console.log(e.prop("id"))
                switch (e.prop('id')) {
                    case 'Title': r.title = e.val(); break;
                    case 'Description': r.desc = e.val(); break;
                    case 'Author': r.author = e.val(); break;
                    case 'Serves': r.serves = e.val(); break;
                    case 'Time': r.time = e.val(); break;
                }
            }
        })
        
        r.url = this.url
        console.log(r)
        return r
    }
}

export = EditRecipeForm