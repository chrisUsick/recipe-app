declare var jade;

import $ = require("jquery")
import IRecipe = require('IRecipe')
import Store = require('Store')
import EditRecipeForm = require('EditRecipeForm')

export interface ActionParents {
    show: HTMLElement
    edit: HTMLElement
    summarize: HTMLElement
}

export class RecipeMvc {

    // the model
    private recipe: IRecipe
    private parents: ActionParents
    // database accessor
    private store = new Store.RecipeStore(new Store.ChromeAccessor())
    private showCallback:Function
    /*
    * @param create whether to use `data` to create a new recipe in the database or just use `data` for the model
    *       useful for when you already have the data but need to make MVC objects for them.
    */
    constructor(parents: ActionParents, create:boolean, url: string, data:IRecipe) {
        this.parents = parents
        // initialize data
        if (create) { this.create(data, parents.edit) }
        else {
            if (data) { this.recipe = data }
            else {
                this.store.getRecipe(url, (recs) => {
                    this.recipe = recs[0]
                })
            }
        }
        

    }

    /**
    * creates a editRecipeForm and appends it to `parent`
    */
    private create(data: IRecipe, parent: HTMLElement) {
        new EditRecipeForm(data, (rec) => {
            // save recipe
            this.store.addRecipe(rec)
            // add it to this object
            this.recipe = rec
            this.show(this.parents.show)
        })
    }
    public show(parent:HTMLElement) {
        this.showCallback()
        //console.log("recipe from RecipeMvc", this.recipe)
        //console.log("template", jade['jade/_recipe'](this.recipe))
        var html = $(jade['jade/_recipe'](this.recipe))[0]


        $(parent).children().remove()
        $(parent).append(html)
    }
    public summarize(parent: HTMLElement) {
        var html = $(jade['jade/_summarizeRecipe'](this.recipe))[0]
        var self = this

        // show
        $(".title", html).click((ev) => {
            self.show(this.parents.show)
        })

        // delete 
        $("button", html).click((ev) => {
            this.deleteRecipe(html)
        })

        $(parent).append(html)
    }

    public deleteRecipe(html: HTMLElement) {
        console.log('deleting recipe', this)
        //delete from store
        this.store.deleteRecipe(this.recipe.url)
        // remove from view
        $(html).remove()
        // delete this class
        delete this
    }
    /*
    * fired when this.show is called
    */
    public setShowCallback(cb: Function) {
        this.showCallback = cb
    }
}

