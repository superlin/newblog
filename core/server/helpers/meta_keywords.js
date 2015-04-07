// # Meta Keywords Helper
// Usage: `{{meta_keywords}}`
//
// Page keywords used for sharing and SEO
//
// We use the name meta_keywords to match the helper for consistency:
// jscs:disable requireCamelCaseOrUpperCaseIdentifiers

var _           = require('lodash'),
    config      = require('../config'),
    filters     = require('../filters'),
    meta_keywords;

meta_keywords = function () {
    var keywords,
        blog;

    if (_.isString(this.relativeUrl)) {
        blog = config.theme;
        if (!this.relativeUrl || this.relativeUrl === '/' || this.relativeUrl === '' || this.relativeUrl.match(/\/page/)) {
            keywords = blog.title;
        } else {
            keywords="";
            if (this.post && this.post.tags) {
                this.post.tags.forEach(function(value) {
                    if (!keywords=="") {
                        keywords+=",";
                    }
                    keywords+=value.name;
                });
                keywords+=","+blog.title;
            }
        }
    }
    return filters.doFilter('meta_keywords', keywords).then(function (keywords) {
        keywords = keywords || "";
        return keywords.trim();
    });
};

module.exports = meta_keywords;
