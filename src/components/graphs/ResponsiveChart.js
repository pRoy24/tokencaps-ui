// pRoy24 TokenPlex
import React, {Component} from 'react';
import Measure from 'react-measure'
import classNames from 'classnames'
import {VictoryChart, VictoryAxis,
  VictoryZoomContainer, VictoryLine,VictoryTooltip, Flyout, VictoryBrushContainer } from 'victory';
import Dimensions from 'react-dimensions'

class ResponsiveChart extends Component {

  render() {

    return (
           <VictoryChart width={this.props.containerWidth} height={this.props.containerHeight}
                          scale={{x: "time"}}
                          containerComponent={this.props.containerComponent}>
              {this.props.children}
            </VictoryChart>
    )
  }
}

export default Dimensions()(ResponsiveChart)