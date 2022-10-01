import { useState } from "react";
import Graph from "react-graph-vis";

const VisNetwork = ({nodes, edges}) => {

    const options = {
        layout: {
          hierarchical: false
        },
        edges: {
          color: "#000"
        },
        nodes: {
            shape: "dot",
            scaling: {
              customScalingFunction: function (min, max, total, value) {
                return value / total;
              },
              min: 5,
              max: 150,
            },
        }
      };
            

    const [state] = useState({
        graph: {
        nodes, edges
        }
    })

    const { graph, events } = state;

    return (
        <Graph 
            graph={graph} 
            options={options} 
            events={events} 
            style={{ height: "400px", backgroundColor: "#e9e9e9", border:'1px solid lightgray' }} />
        )

};

export default VisNetwork;