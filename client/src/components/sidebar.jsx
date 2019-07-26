import React, { Component } from "react";

class Navbar extends Component {
  state = {};
  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    this.setState({ file }); /// if you want to upload latter
  }

  render() {
    return (
      <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <input
                id="myInput"
                type="file"
                ref={ref => (this.myInput = ref)}
                style={{ display: "none" }}
                onChange={this.onChangeFile.bind(this)}
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
                onClick={() => this.props.onChart()}
                href=""
              >
                Temperature History
              </button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
