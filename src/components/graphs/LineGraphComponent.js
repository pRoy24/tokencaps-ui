import React, { Component } from 'react';
import { VictoryChart,  VictoryLine, VictoryAxis, VictoryContainer, VictoryLabel} from 'victory';
import _ from 'lodash';
import './GraphStyles.css';

export default class LineGraphComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {traceHigh: []}
  }
  componentWillMount() {

    let trace1 = [];
    if (_.isArray(this.props.data)) {
      this.props.data.forEach(function (dataPoint) {
        trace1.push({x: dataPoint.time, y: dataPoint.high});
      });
      this.setState({traceHigh: trace1});
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    return (
      <div className="coin-line-chart">
        <VictoryChart
          width={800}
          padding={{ top: 20, bottom: 0, left: 40, right: 10 }}
          >
          <VictoryLine
            style={{
              data: { stroke: "#00B0F1", strokeWidth: 6},
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            data={this.state.traceHigh}
          />
          <VictoryAxis  style={{
            axis: {stroke: "#ECECEC", strokeOpacity: 0.5,  strokeWidth: 1}}}
            />

          <VictoryAxis dependentAxis
                       tickCount={2}
                       style={{
                         axis: {stroke: "#ECECEC", strokeOpacity: 0.5,  strokeWidth: 1},
                         tickLabels: {fontSize: 65, stroke:"white", fill: "#ECECEC"}
                       }}
                       tickLabelComponent={<VictoryLabel dx={140}/>}

                      />
        </VictoryChart>


      </div>
    )
  }
}