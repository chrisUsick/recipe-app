import parsers = require("parsers")

import parseUri = require("parseUri")

class Parser {
    static parsers
    /**
    * load a recipe and parse it
    */
    static parse(url: string, cb:(res) => void) {
        // get domain
        var domain = parseUri(url)['host']
        
        $.ajax({
            url:url,
            type: "GET",
            //headers: {"Access-Control-Allow-Origin":"*"},
            contentType: 'text/plain',
            xhrFields: {
                withCredentials: false
            }
        }).done((res) => {
                //console.log("done", $("body", res))
            var html = $.parseHTML(res)
            if (this.parsers[domain]) {
                cb(this.parseHtml(this.parsers[domain], url, html))
            } else return null
       })
        // parse
        
    }
    /**
    * parse an html file (which is a list of DOM Nodes) and return a recipe
    */
    static parseHtml(parser:Object, url: string, html: Node[]) {
        // fields that are arrays instead of strings
        var multi = ['ingredients', 'directions']
        //var parser = JSON.parse(json)
        var r = {}
        for (var p in parser) {
                // initialize r.ingredients and r.directions as arrays
                if (multi.some((v, i) => {return p == v })) {
                    r[p] = []
                    $(parser[p], html).each((i, el) => {
                        r[p].push($(el).text().trim().replace(/[\s]{2,}/g, ' '))
                    })
                } else {
                    r[p] = $(parser[p], html).text().trim().replace(/[\s]{2,}/g, ' ')
                }

        }
        // add the url here so that it can be used later
        r["url"] = url
        console.log("parsed recipe", r)
        return r
    }
    /**
    * JSON.parse the parsers.json file; makes for efficient accessing of a specific parser.
    */
    static init() {
        this.parsers = JSON.parse(parsers)
        console.log(this.parsers, "parsers")
    }
}

export = Parser