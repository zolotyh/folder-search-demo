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

var RESULT_LENGTH = 100;

function Search(data) {
		this.data = data.data;
		this.init(this.data);
}

Search.prototype.init = function () {
		this.rebuildTree();
		this.fuse = new Fuse(this.data, OPTIONS);
};

Search.prototype.search = function (q) {
		return this.fuse.search(q).slice(0, RESULT_LENGTH - 1).reduce(function(memo, item){
				item.path = this.createPath(item.item.id)
				memo.push(item);
				return memo;
		}.bind(this), []);
};

Search.prototype.createPath = function(id){
		if(id){
				var parent = this.index[id].parents[0];
				var parentPath = this.createPath(parent);

				return (parentPath ? parentPath : '') + '/' + this.index[id].title;
		}
};

Search.prototype.rebuildTree = function(){
		this.index = this.mapFromArray(this.data);

		// rebuild index add parents
		var index = Object.keys(this.index)
				.reduce(function(memo, id){
						var elem = memo[id]; 

						if(!elem.parents){
								elem.parents = [];
						}

						memo[id] = elem;

						// iterate by childIds
						elem.childIds.forEach(function(child){
								if(!memo[child]){
										var childElem = this.index[child]
										memo[child] = childElem;
								}
								if(!memo[child].parents){
										memo[child].parents = [];
								}
								memo[child].parents.push(id);
								return true;
						}.bind(this));

						return memo;
				}.bind(this), this.index);

		this.index = index;
};


Search.prototype.mapFromArray = function(rawArray){
		return rawArray.reduce(function(memo, item){
				memo[item.id] = item;
				return memo;
		}, {});
}

module.exports = Search;
