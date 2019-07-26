import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import LoadingOverlay from 'react-loading-overlay';
import axios from "axios";

import _ from "lodash";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: ["Week 0"],
        datasets: [
          {
            label: "Temperature (2015)",
            data: [0],
            showLine: false,
            pointBackgroundColor: "rgba(52, 152, 219,1.0)",
            beginAtZero: true
          }
        ]
      },
      loadMask: true
    };
  }

  getTempData() {
    console.log("Get data from DB");

    axios
      .get("/fetch-data")
      .then(res => {
        console.log("data fetched", res.data);
        var valArr = [];
        var tsArr = [];

        var sortedArr = _.sortBy(res.data, ['_id']);
        _.each(sortedArr, value => {
          valArr.push(value.average);
          tsArr.push("Week " + value._id);
        });
        var updatedData = this.state.data;
        updatedData.datasets[0].data = valArr;
        updatedData.labels = tsArr;
        this.setState({
          data: updatedData,
          loadMask: false
        });


      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getTempData();
  }

  render() {
    return (
      <LoadingOverlay
        active={this.state.loadMask}
        spinner
        text='Loading your content...'
      >
        <div className="container m-4">
          <div className="row">
            <p>Temperature History</p>
          </div>
          <div className="row">
            <Line
              options={{
                responsive: true
              }}
              data={this.state.data}
            />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Chart;
