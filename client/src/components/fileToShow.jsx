import React, { Component } from "react";
import axios from "axios";

class FileToShow extends Component {
  state = {};

  handleSend = event => {
    event.preventDefault();
    console.log("sending ", this.props.fileName);
    // console.log("actual file", this.props.fileToSend);

    let payload = this.props.fileName;
    axios({
      url: "/load-data",
      method: "post",
      data: payload
    })
      .then(res => {
        if (res.data) {
          console.log("Data Sent");
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      //   <h1>
      //     qwe
      //     {console.log(this.props.fileName)}
      //   </h1>
      <div className="m-4">
        <div className="card">
          <div className="card-body">
            <span className="badge badge-warning">{this.props.fileName}</span>{" "}
            Selected
          </div>
        </div>
        <form onSubmit={this.handleSend}>
          <input className="btn btn-info mt-2" type="submit" value="Send" />
        </form>

        {/* <button className="btn btn-primary">Send</button> */}
      </div>
    );
  }
}

export default FileToShow;
