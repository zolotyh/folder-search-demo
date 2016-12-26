var jquery = require('jquery/dist/jquery.slim.min.js'),
    Bloodhound = require('typeahead.js/dist/bloodhound.min.js'),
    _ = require('lodash/lodash.js'),
    API = require('./api.js');

var Search = require('./search.js');

require('../node_modules/typeahead.js/dist/typeahead.jquery.min.js');

var api = new API();


FolderPicker.prototype.getFoldersList = function () {
    var substringMatcher = function (searcher) {
        return function findMatches(query, cb) {
            var result = searcher.search(query);
            var matches = result.reduce(function (memo, i) {
                memo.push(i.item.title);
                return memo;
            }, []);

            cb(matches);
        };
    };


    return api.getFoldersList().then(function (data) {
        this.searcher = new Search(data);

        $('.js-input').typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: substringMatcher(this.searcher)
            }
        );
    }.bind(this));
};

FolderPicker.prototype.init = function () {
    this.getFoldersList();
};

function FolderPicker() {
    this.init();
}

module.exports = FolderPicker;


