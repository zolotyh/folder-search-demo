var jquery = require('jquery/dist/jquery.slim.min.js'),
		API = require('./api.js'),
		Handlebars = require('handlebars/dist/handlebars.min.js')
		Search = require('./search.js');

require('typeahead.js/dist/typeahead.jquery.min.js');

var api = new API();


FolderPicker.prototype.search = function(searcher){
		return function findMatches(query, cb) {
				var result = searcher.search(query);
				cb(result);
		};
};


FolderPicker.prototype.getFoldersList = function () {
		return api.getFoldersList().then(function (data) {
				this.searcher = new Search(data);

				$('body').removeClass('waiting');

				$('.js-input').typeahead({
						hint: true,
						highlight: true,
						minLength: 1
				}, 
						{ 
								source: this.search(this.searcher).bind(this),
								limit: 100,
								templates: {
										suggestion: Handlebars.compile('<div title="{{path}}" class="result"><span class="title">{{item.title}}</span><span class="path"> {{path}}<span></div>')
								}
						});
		}.bind(this));
};

FolderPicker.prototype.init = function () {
		this.getFoldersList();
};

function FolderPicker() {
		this.init();
}

module.exports = FolderPicker;


