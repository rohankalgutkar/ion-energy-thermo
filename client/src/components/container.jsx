import React, { Component } from "react";
// import SideBar from "./sidebar";
import FileToShow from "./fileToShow.jsx";
import Chart from "./chart";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartOn: false
    };

    this.onChangeFile = this.onChangeFile.bind(this);
    this.showChart = this.showChart.bind(this);
  }

  toggleBrowse = () => {
    console.log("browse clicked");

    this.setState({
      browseOn: !this.state.browseOn,
      chartOn: this.state.chartOn ? false : false
    });
  };

  toggleChart = () => {
    this.setState({
      chartOn: !this.state.chartOn,
      browseOn: this.state.browseOn ? false : false
    });
  };

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState({
      fileToUpload: file,
      fileName: file.name,
      FileToShow: !this.state.FileToShow,
      chartOn: this.state.chartOn ? false : false
    }); /// if you want to upload latter
  }

  showChart() {
    console.log("Will show Chart");
    var newState = this.state.chartOn ? false : true;
    this.setState({
      chartOn: !this.state.chartOn,
      FileToShow: this.state.FileToShow ? false : false
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <input
                    id="myInput"
                    type="file"
                    ref={ref => (this.myInput = ref)}
                    style={{ display: "none" }}
                    onChange={this.onChangeFile}
                  />
                  <button
                    className="btn btn-primary active"
                    onClick={e => this.myInput.click()}
                  >
                    <span data-feather="home" />
                    Browse Data
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-primary mt-2"
                    onClick={this.showChart}
                    href=""
                  >
                    Temperature History
                  </button>
                </li>
              </ul>
            </div>
          </nav>
          {this.state.FileToShow && (
            <FileToShow
              fileName={this.state.fileName}
              fileToSend={this.state.fileToUpload}
            />
          )}
          {this.state.chartOn && <Chart />}
        </div>
      </div>
    );
  }
}

export default Container;
