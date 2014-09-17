define(["require", "exports", "parsers", "parseUri"], function(require, exports, parsers, parseUri) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.parse = function (url, cb) {
            var _this = this;
            var domain = parseUri(url)['host'];

            $.ajax({
                url: url,
                type: "GET",
                contentType: 'text/plain',
                xhrFields: {
                    withCredentials: false
                }
            }).done(function (res) {
                var html = $.parseHTML(res);
                if (_this.parsers[domain]) {
                    cb(_this.parseHtml(_this.parsers[domain], url, html));
                } else
                    return null;
            });
        };

        Parser.parseHtml = function (parser, url, html) {
            var multi = ['ingredients', 'directions'];

            var r = {};
            for (var p in parser) {
                if (multi.some(function (v, i) {
                    return p == v;
                })) {
                    r[p] = [];
                    $(parser[p], html).each(function (i, el) {
                        r[p].push($(el).text().trim().replace(/[\s]{2,}/g, ' '));
                    });
                } else {
                    r[p] = $(parser[p], html).text().trim().replace(/[\s]{2,}/g, ' ');
                }
            }
            return r;
        };

        Parser.init = function () {
            this.parsers = JSON.parse(parsers);
            console.log(this.parsers, "parsers");
        };
        return Parser;
    })();

    
    return Parser;
});
//# sourceMappingURL=Parser.js.map
