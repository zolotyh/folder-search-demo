var Fuse = require('fuse.js/src/fuse.min.js');

var OPTIONS = {
    include: ["matches", "score"],
    shouldSort: true,
    tokenize: true,
    findAllMatches: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: [
        "title"
    ]
};

function Search(data) {

    this.init(data);
}

Search.prototype.init = function (data) {
    this.fuse = new Fuse(data.data, OPTIONS);
};

Search.prototype.search = function (q) {
    return this.fuse.search(q)
};

module.exports = Search;
