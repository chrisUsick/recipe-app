interface IRecipe {
    url:string // this will function as their idenifier
    title: string
    author: string
    // could have ingredients and directions as arrays of strings - one item per string - which would
    // greatly improve rendering
    ingredients: string[] // string[]
    directions: string[] // string[]
    desc: string
    time?:string
    serves?: string
    notes?: string
    
}

export = IRecipe