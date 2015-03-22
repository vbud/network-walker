'use strict';

var TreeService = (function() {

	var tree = {};
	tree.data = {
		id: _.uniqueId(),
		name: 'root',
		depth: 1
	};
	tree.depth = 1;
	tree.breadth = 1;

	function generateChildren(d) {
		// if the data already has children, do nothing
		if(typeof d.children === 'array') return;

		d.children = [];

		// give the node anywhere from 1 to 7 children
		var numChildren = _.random(1,7);
		for(var i=0; i<numChildren; i++) {
			var child = {
				id: _.uniqueId(),
				name: 'child',
				depth: d.depth + 1
			};
			d.children.push(child);
		}

		if(numChildren > tree.breadth) tree.breadth = numChildren;
		if(d.depth + 1 > tree.depth) tree.depth = d.depth + 1;

	}

	return {
		get data() { return tree.data;	},
		get depth() { return tree.depth; },
		get breadth() { return tree.breadth; },
		generateChildren: generateChildren
	}
})();