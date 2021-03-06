﻿///<reference path="../typings/jquery/jquery.d.ts"/>
declare var jade
import Foo = require("Foo")
import $ = require("jquery")
import Store = require("Store")
import IRecipe = require("IRecipe")
import Parser = require("Parser")
import Nav = require("Nav")
import EditRecipeForm = require('EditRecipeForm')
import Mvc = require("RecipeMvc")
// comment

//

class App {
    store: Store.RecipeStore
    nav = new Nav("#view-container div")
    ERF: EditRecipeForm
    private parentActions: Mvc.ActionParents = {
        edit: $("div#editRecipe")[0],
        show: $("div#recipe")[0],
        summarize: $("div#allRecipes")[0]
    }
    constructor() {
        this.store = new Store.RecipeStore(new Store.ChromeAccessor())
        this.store.getRecipes((items) => {
            console.log(items, "recipes")
        })
        Parser.init()
        //Parser.parse("http://allrecipes.com/Recipe/Amatriciana/Detail.aspx?soid=carousel_0_rotd&prop24=rotd", (res) => {
        //    console.log(res)
        //})

        this.omniboxInit()
        this.allRecipes()
    }
    run() {
        var foo = new Foo()
        $("#msg").text("foo")
    }
    /**
    * add omnibox handlers
    */
    omniboxInit() {
        $("#omnibox").submit((ev) => {
            ev.preventDefault()
            var data = $("input", ev.target).val().trim()
            // get better text for a url!!!
            if (data.search(' ') == -1 ) {
                // data is url
                Parser.parse(data, (recipe) => {
                    this.nav.navigateTo("#editRecipe")
                    var r = new Mvc.RecipeMvc(this.parentActions, true, null, recipe)
                    r.setShowCallback(() => {
                        this.nav.navigateTo("#recipe")
                    })
                })
            } else {
                // data is search text
                // do nothing for now
            }
        })
    }
    allRecipes() {
        this.nav.addCallback("#allRecipes", () => {
            // clear div
            $("div#allRecipes").children().remove()
            // run allRecipes view
            this.store.getRecipes((recipes) => {
                console.log(recipes)
                recipes.forEach((rec, i) => {
                    var r = new Mvc.RecipeMvc(this.parentActions, false, null, rec)
                    r.setShowCallback(() => {
                        this.nav.navigateTo("#recipe")
                    })
                    r.summarize(this.parentActions.summarize)
                })

            })
        })
    }
    deleteRecipe() {
        $(".delRecipe").click((e) => {

        })
    }
}

function test() {
    $.ajax({
        //url: "http://www.google.com",
        //url: 'http://updates.html5rocks.com',
        url: "http://allrecipes.com/Recipe/Amatriciana/Detail.aspx?soid=carousel_0_rotd&prop24=rotd",
        type: "GET",
        //headers: {"Access-Control-Allow-Origin":"*"},
        contentType: 'text/plain',
        xhrFields: {
            withCredentials: false
        }
    }).done((res) => {
        //console.log("done", $("body", res))
        var html = $.parseHTML(res)
    })
}
function allRecipes(url: string, html: Node[]) {
    function getIngredients() {
        var ingreds = []
        //p[itemprop="ingredients"]
        $('.ingred-left ul li', html).each((i, el) => {
            ingreds.push($(el).text().trim().replace(/[\s]{2,}/g, ' '))
        })
        return ingreds;
    }
    function getDirs() {
        var dirs = []
        $('div[itemprop="recipeInstructions"] ol li', html).each((i, el) => {
            dirs.push(el.textContent.trim())
        })
        return dirs
    }
    var recipe: IRecipe = {
        url: url,
        title: $("#itemTitle", html).text(),
        serves: $(".servings span[itemprop='recipeYield']", html).text(),
        author: $(".author",html).text(),
        desc: $('span[itemprop="description"]', html).text(),
        time: $('.time', html).text(),
        ingredients: getIngredients(),
        directions: getDirs()
    }
    return recipe
}

export = App