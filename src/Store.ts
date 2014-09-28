///<reference path="../typings/chrome/chrome.d.ts"/>
import IRecipe = require("IRecipe")

export interface IStoreAccessor {
    getItem(key: string, callback: (item) => void): any;
    setItem(key: string, val:any): void;
    removeItem(key: string): void;

}

export class ChromeAccessor implements IStoreAccessor {
    constructor() { }
    getItem(key: string, callback:(item) => void) {
        chrome.storage.local.get(key, (items) => {
            callback(items[key])
        })
    }
    setItem(key: string, value: string) {
        var kv = {}
        kv[key] = value
        chrome.storage.local.set(kv)
    }
    removeItem(key: string) {
        chrome.storage.local.remove(key)
    }
}
//export class DummyStore implements IStoreAccessor {
//    private store = {}
//    constructor() { }
//    getItem(key: string) {
//        return this.store[key]
//    }
//    setItem(key: string, val: string) {
//        this.store[key] = val
//    }
//    removeItem(key) {
//        this.store[key] = undefined
//    }
//}

export interface SearchCriteria {
    url?: string
    text?: string
}

/**
* Using a JSON store to account for window.localStorage
* chrome.storage.local (or .synced) doesn't need JSON.
*/
export class RecipeStore {
    /**
    * @param lStore: local storage accessor
    */
    constructor(public lStore: IStoreAccessor) {
        //validate "recipes" key/value pair in localstorage
        
        this.lStore.getItem("recipes", (recs) => {
            console.log("recipeStore init", recs)
            if (!recs) {
                this.lStore.setItem("recipes", [])
            }
        })
    }
    addRecipe(rec: IRecipe) {
        //this.deleteRecipe(rec.url)
        this.lStore.getItem("recipes", (recs:IRecipe[]) => {
            
            recs = recs.filter((v, i) => {
                return v.url != rec.url 
            })
            recs.push(rec)
            this.lStore.setItem("recipes", recs)
        })
        
    }
    getRecipe(criteria: SearchCriteria, callback:(recs:IRecipe[]) => void) {
        var res:IRecipe[] = []
        this.lStore.getItem("recipes", (recs: IRecipe[]) => {
            recs.forEach((rec, i) => {
                if (criteria.url == rec.url) {
                    res.push(rec)
                    return;
                }
                if (criteria.text) {
                    for (var p in rec) {
                        if (p != "url") {
                            // String.search returns -1 if not found
                            if (rec[p].search(criteria.text) >= 0) {
                                res.push(rec)
                            }
                        }
                    }
                }
                callback(res)
            })
        })
    }
    getRecipes(callback:(items:IRecipe[]) => void) {
        return this.lStore.getItem("recipes", callback)
    }
    /**
    * helper method to get and parse a key/value pair
    */
    //getItem(key: string): IRecipe[] {
    //    return JSON.parse(this.lStore.getItem(key))
    //}
    ///**
    //* helper method to set and stringify a key/value pair
    //*/
    //setItem(key: string, val: any): void {
    //    this.lStore.setItem(key, JSON.stringify(val))
    //}

    deleteRecipe(url: string) {
        this.getRecipes((items) => {
            var matches = []

            // filter out null values
            items = items.filter((v, i) => {
                return (v.url != url)
            })
            this.lStore.setItem("recipes", items)
        })
        
    }

}