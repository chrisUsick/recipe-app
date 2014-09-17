declare var jade;

import $ = require('jquery')
import IRecipe = require('IRecipe')
import Store = require('Store')

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
class EditRecipeForm {
    private html: HTMLElement
    private store: Store.RecipeStore
    constructor(data: IRecipe, storeAccessor: Store.RecipeStore) {
        this.store = storeAccessor
        this.reset(data)
    }
    reset(data: IRecipe) {
        $("#editRecipe").children().remove()
        this.html = $(jade['jade/_editRecipeForm'](data))[0]
        $("#editRecipe").append(this.html)
        $(this.html).submit((ev) => {
            ev.preventDefault()
            console.log('form submited')
            this.store.addRecipe(this.formToRecipe())
        })
    }

    private formToRecipe():IRecipe {
        var r: IRecipe = new Recipe()
        var a = $('input, textarea', this.html).each((i, el) => {
            var e:JQuery = $(el)
            if (e.parents().hasClass('ingredientList')) {
                r.ingredients.push(e.val())
            } else if (e.parents().hasClass('directionList')) {
                r.directions.push(e.val())
            } else {
                switch (e.prop('id')) {
                    case 'Title': r.title = e.val()
                    case 'Description': r.desc = e.val()
                    case 'Autor': r.author = e.val()
                    case 'Serves': r.serves = e.val()
                    case 'Time': r.time = e.val()
                }
            }
        })
        console.log(r)
        return r
    }
}

export = EditRecipeForm