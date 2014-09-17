//import IRecipe = require("IRecipe")
//import Store = require("Store")

//export interface SearchCriteria {
//    url?: string
//    text?:string
//}
//export class RecipeStore {
//    constructor(public lStore: Store.IStoreAccessor) {
//        //validate "recipes" key/value pair in localstorage
//        var recs = this.getItem("recipes")
//        if (!recs) {
//            this.setItem("recipes", recs)
//        }
//    }
//    addRecipe(rec: IRecipe) {
//        var recs = this.getItem("recipes")
//        recs.push(rec)
//        this.setItem("recipes", recs)
//    }
//    getRecipe(criteria: SearchCriteria) {
//        var recs = this.getItem("recipes")
//        var res = []
//        recs.forEach((rec, i) => {
//            if (criteria.url) {
//                res.push(rec)
//                return;
//            }
//            if (criteria.text) {
//                for (var p in rec) {
//                    if (p != "url") {
//                        // String.search returns -1 if not found
//                        if (rec[p].search(criteria.text) >= 0) {
//                            res.push(rec)
//                        }
//                    }
//                }
//            }
//        })
//    }
//    /**
//    * helper method to get and parse a key/value pair
//    */
//    private getItem(key:string): IRecipe[] {
//        return JSON.parse(this.lStore.getItem(key))
//    }
//    /**
//    * helper method to set and stringify a key/value pair
//    */
//    private setItem(key: string, val:any):void {
//        this.lStore.setItem(key, JSON.stringify(val))
//    }


//}

////export = RecipeStore