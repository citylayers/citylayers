
class SunburstGraphics{
    static opacities = {
        0: 1,
        1: 0.75,
        2: 0.5
    }
    static colors = {
        "Beauty": "#C4B5F0",
        "Nature": "#B1CDEF"
    }
}


class EventsHandler{
    static mouseover(d) {
      
        var sequenceArray = SunburstDiagram.getAncestors(d);
        
      
        // Fade all the segments.
        d3.selectAll("path")
          .style("opacity", 0.3);
      
        // Then highlight only those that are an ancestor of the current segment.
        d3.selectAll("path")
          .filter(function(node) {
            return (sequenceArray.indexOf(node) >= 0);
          })
          .style("opacity", function(d) {
            return d.depth>0 ? SunburstGraphics.opacities[d.depth - 1] : 0;
          });
      }

    static mouseleave(d) {
      // Deactivate all segments during transition.
      d3.selectAll("path").on("mouseover", null);
      // Transition each segment to full opacity and then reactivate it.
      d3.selectAll("path")
        .transition()
        .duration(1000)
        .style("opacity", function(d) {
          return d.depth>0 ? opacities[d.depth - 1] : 0;
        })
        .each("end", function() {
          d3.select(this).on("mouseover", mouseover);
        });
    }
}

class SunburstDiagram{
    static arcPrefix = "piearc"
    static containerClass = "container";
    static _breadcrumb = {
        w: 75,
        h: 30,
        s: 3,
        t: 10
    }

    static arc = d3.svg.arc()
    .startAngle(function(d) {
        return d.x;
    })
    .endAngle(function(d) {
        return d.x + d.dx;
    })
    .innerRadius(function(d) {
        return Math.sqrt(d.y);
    })
    .outerRadius(function(d) {
        return Math.sqrt(d.y + d.dy);
    });

    static getAncestors(node) {
        var path = [];
        var current = node;
        while (current.parent) {
          path.unshift(current);
          current = current.parent;
        }
        return path;
      }

    constructor(content, containerId){
        this._content = content ? content : {};
        this._containerId = containerId ? containerId : "section-project";
        this._totalSize = 0;
    }

    make(){
        return this._make();
    }

    _addLabels(vis, nodes, path){
      //return vis.data([this._content]).selectAll("path")
      return path.data(nodes)
      .enter().append("text")
            .attr("x", 30)
            .attr("dy", 12)
            .attr("text-anchor", "start")
            .append("textPath")
              .attr("xlink:href",function(d, i){return `#${SunburstDiagram.arcPrefix}_${i}`;})
              .text(function(d){
                return d.depth > 0 ? d.name : ""})
    }

    _createBase(vis){
        let radius = this._getRadius();
        vis.append("svg:circle")
        .attr("r", radius)
        .style("opacity", 0);
    }

    _createPolygons(vis, nodes){
        let path = vis.data([this._content]).selectAll("path");
        path.data(nodes)
            .enter().append("svg:path")
            .attr("d", SunburstDiagram.arc)
            .attr("id", function(d,i) { return `${SunburstDiagram.arcPrefix}_${i}`; })
            .attr("display", function(d) {return d.depth ? null : "none";})
        .attr("fill-rule", "evenodd")
        .style("fill", function(d) {
            if (d.depth==2){
                return SunburstGraphics.colors[d.parent.name];
            }
            else if (d.depth==3){
                return SunburstGraphics.colors[d.parent.parent.name];
            }
            else {
                return SunburstGraphics.colors[d.name];
            }
        
        })
        .style("opacity", function(d) {
            return d.depth>0 ? SunburstGraphics.opacities[d.depth - 1] : 0;
        })
        .on("mouseover", EventsHandler.mouseover);
        return path;
    }

    _getRadius(){
        let width = this._getWidth();
        return 0.45 * width;
    }

    _getWidth(){        
        return document.getElementById(this._containerId).getBoundingClientRect().width;
    }

    _initVis(){
        let width = this._getWidth();
        return d3.select(`#${this._containerId}`).append("svg:svg")
                    .attr("width", width)
                    .attr("height", width)
                    .append("svg:g")
                    .attr("id", `${this._containerId}`)
                    .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");
    }

    _initPartition(){
        let radius = this._getRadius();
        return d3.layout.partition()
                .sort(null)
                .size([2 * Math.PI, radius * radius])
                .value(function(d) {
                return 1;
                    });
    }

    _make(){

        let vis = this._initVis();
        
        let partition = this._initPartition();
        this._createBase(vis);

        let nodes = partition.nodes(this._content)
            .filter(function(d) {
                return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
            });
            
            let path = this._createPolygons(vis, nodes);
            this._addLabels(vis, nodes, path);
            
            d3.select(`#${SunburstDiagram.containerClass}`).on("mouseleave", EventsHandler.mouseleave);
        return vis;
};
}

function testData() {
    return {
      "name": "ref",
      "children": [{
          "name": "Beauty",
          "children": [{
              "name": "Architecture & sights",
              "children": [{
                  "name": "Landmarks"
                },
                {
                  "name": "Colours"
                },
                {
                  "name": "Street Art"
                },    
                {
                  "name": "Buildings"
                },
              
              ]
            },
            {
              "name": "Nature",
              "children": [{
                  "name": "Trees"
                },
                {
                  "name": "Plants"
                },
                {
                  "name": "Gardens"
                },    
                {
                  "name": "Water"
                },
              
              ]
            }
          
          ]
          
          }],
  
        }
    };
  


