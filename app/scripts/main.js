'use strict';

var width, height;

var cluster = d3.layout.cluster();

var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.y, d.x]; });

var svg = d3.select('body').append('svg'),
  	g = svg.append('g')
		    .attr('transform', 'translate(40,0)');

var data = {};


var render = function() {
	width = TreeService.depth * 150;
  height = TreeService.breadth * 50;
  cluster.size([height, width - 160]);

  svg
	  .attr('width', width)
	  .attr('height', height);

  data.nodes = cluster.nodes(TreeService.data);
  data.links = cluster.links(data.nodes);

  // Data join nodes
	var nodes = g.selectAll('.node').data(data.nodes, function(d) { return d.id; });

	// Enter nodes
	var enterNodes = nodes
	  .enter().append('g')
	    .attr('class', 'node')
	    .on('dblclick', function(d) { 
	    	TreeService.generateChildren(d);
	    	render();
	    })

	enterNodes.append('circle')
	    .attr('r', 4.5);

	enterNodes.append('text')
	    .text(function(d) { return d.name; });

	// Update nodes
	nodes.attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })

	nodes.select('text')
			.attr('dx', function(d) { return d.children ? -8 : 8; })
	    .attr('dy', 3)
	    .style('text-anchor', function(d) { return d.children ? 'end' : 'start'; })

  // Exit nodes
  nodes.exit().remove()



  // Data join links
  var links = g.selectAll('.link').data(data.links)

  // Enter links
  links
    .enter().append('path')
      .attr('class', 'link')
  
  // Update links
  links
      .attr('d', diagonal);
  
  // Exit links
  links.exit().remove()
};


var init = function() {
	render();
}

init();
