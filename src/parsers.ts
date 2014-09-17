var r = JSON.stringify({
    "allrecipes.com": {
        title: "#itemTitle",
        serves: ".servings span[itemprop='recipeYield']",
        author: ".author",
        desc: 'span[itemprop="description"]',
        time: '.time',
        ingredients: '.ingred-left ul li',
        directions: 'div[itemprop="recipeInstructions"] ol li'
    }
})

export = r 