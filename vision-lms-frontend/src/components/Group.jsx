import React from "react";
import CreateGroup from './CreateGroup'

class Group extends React.Component {
  state = {
    groupDetails: [
      {
        index: Math.random(),
        // groupName: "",
        // date: "",
        // initiatorIdNumber: "",
        // initiatorNumber: "",
        // initiatorName: "",
        memberIdNumber: "",
        memberNumber: "",
        memberName: "",
      }
    ]
  };
  handleChange = (e) => {
    if (
      ["memberName", "memberIdNumber", "memberNumber"].includes(
        e.target.memberId
      )) {
      let groupDetails = [...this.state.groupDetails];
      groupDetails[e.target.dataset.id][e.target.memberName] = e.target.value;
    } else {
      this.setState({
        [e.target.memberName]: e.target.value
      })
    }
  };

  addNewRow = (e) => {
    this.setState((prevState) => ({
      groupDetails: [
        ...prevState.groupDetails,
        {
          index: Math.random(),
          memberIdNumber: "",
          memberName: "",
          memberName: ""
        }
      ]
    }));
  };

  deleteRow = (index) => {
    this.setState({
      groupDetails: this.state.groupDetails.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
      groupDetails: this.state.groupDetails.filter(r => r !== record)
    });
  }
  render() {
    let { groupDetails } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-1" />
            <div className="col-sm-10">
              <h2 className="text-center">
                Enter Group Details
              </h2>
              <div className="container">
                <div className="row">
                  <CreateGroup
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    groupDetails={groupDetails}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-1" />
          </div>
        </form>
      </div>
    )
  }
}

export default Group;
