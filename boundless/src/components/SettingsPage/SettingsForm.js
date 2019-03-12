import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import * as actions from "../../actions/settingsActions";
import Dropdown from "react-dropdown";
import Select from "react-select";
import firebase from "firebase/app"; //only importing the app cause that is all what we need
import "firebase/firestore"; //The actual database
import "firebase/auth"; //this is for authentication

const courses = [
  { value: "CSC108", label: "CSC108" },
  { value: "CSC148", label: "CSC148" },
  { value: "CSC207", label: "CSC207" },
  { value: "CSC236", label: "CSC236" },
  { value: "CSC209", label: "CSC209" },
  { value: "CSC258", label: "CSC258" },
  { value: "CSC263", label: "CSC263" }
];

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    const c_user = firebase.auth().currentUser;
    this.state = {
      firstName: c_user.firstName,
      lastName: c_user.lastName,
      year: c_user.year,
      email: c_user.email,
      University: c_user.University,
      Program: c_user.Program,
      mycourses: []

      //done: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.updateSettings(this.state);
    console.log("----------------");

    console.log(this.state);

    /*
    if (this.state.password == this.state.passwordConfirmation) {
      this.props.signUpUser(this.state);
    }
    
        if (this.state.done) {
          return <Redirect to="/" />;
        }
        */
  }

  handleAdd = e => {
    console.log(e);
    var newArray = this.state.mycourses;
    newArray.push(e.value);
    this.setState({ mycourses: newArray });
    console.log(this.state);
  };

  handleDelete = e => {
    var newArray = this.state.mycourses;
    newArray.pop(newArray.indexOf(e.value));
    this.setState({ mycourses: newArray });
    console.log(this.state);
  };

  render() {
    console.log("HERE");
    //console.log(firebase.auth.currentUser);
    const newId = firebase.auth().currentUser.uid;
    console.log(newId);

    return (
      <div className="row">
        <div className="container center">
          <h5 className="grey-text text-darken-3">Settings</h5>
        </div>
        <div className="container col s8 left">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label className="control-label">First Name</label>
              <input
                onChange={this.onChange}
                value={this.state.username}
                type="text"
                name="firstName"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="control-label">Last Name</label>
              <input
                onChange={this.onChange}
                value={this.state.lastName}
                type="text"
                name="lastName"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="control-label">Year</label>
              <input
                onChange={this.onChange}
                value={this.state.year}
                type="text"
                name="year"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="control-label">Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                type="text"
                name="email"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="control-label">University</label>
              <input
                onChange={this.onChange}
                value={this.state.University}
                type="text"
                name="University"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label className="control-label">Program</label>
              <input
                onChange={this.onChange}
                value={this.state.Program}
                type="text"
                name="Program"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <button
                onClick={this.onChange}
                className="btn blue lighten-1 z-depth-0"
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="container col s4 right">
          <Select
            placeholder="Add a new course:"
            value={this.state.type}
            onChange={this.handleAdd}
            options={courses}
          />
          <h3>
            Your courses:
            {this.state.mycourses.map(item => (
              <button>{item}</button>
            ))}
          </h3>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default connect(
  mapStateToProps,
  null
)(SettingsForm);
