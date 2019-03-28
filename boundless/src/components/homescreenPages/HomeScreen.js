import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import CourseCard from "./CourseCard";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Container, Row, Col } from "reactstrap";
import * as actions from "../../actions/settingsActions";
import * as chatActions from '../../actions/chatActions'
import Messages from "../chatroomPages/Messages/Messages";
import MetaPanel from "../chatroomPages/MetaPanel/MetaPanel";
import ColorPanel from "../chatroomPages/ColorPanel/ColorPanel";
import "../../index.css";
// import { updateLastSeen } from "../../actions/chatActions";

import firebase from 'firebase'

//comment
class HomeScreen extends Component {


  constructor(props) {
    super(props);
    this.removeCourse = this.removeCourse.bind(this);

    this.state = {
      courseList: null,
  
  
      currChatIndex: 0,
  
      
    };

  }

  setChat(newIndex, oldIndex) {
    console.log({newIndex, oldIndex});
    
    const data = {
      oldCourseName: this.props.profile.courses[oldIndex],
      newCourseName: this.props.profile.courses[newIndex],
      name: this.props.profile.firstName,
    }

    this.props.updateUserList(data)

    this.setState({
      currChatIndex: newIndex
    })
    //action
    
    // this.setState(  { 
    //   currChatIndex: newIndex,
  
    // }, () => {

    //   const id = this.state.currChatID;
    //   var db = firebase.firestore();
    //   const userID = this.props.auth.uid;
  
    //   var chatroom = db.collection("messages").doc(id);
    //   var user = db.collection("users").doc(userID)
    //   var name;

    //   user.get().then( (doc) => {
    //     name = doc.data()['firstName']
    //   })
  
    //   chatroom.get().then(function(doc){
  
    //     var userList= doc.data()['userList']
  
    //     console.log('userList (setChat): ' + userList)

    //     if(!userList) {
    //       chatroom.update({userList: []});

    //     } else {

    //       if(!userList.includes(name)) {
    //         userList.push(name);
    //       } else {
    //         var userIndex = userList.indexOf(name);

    //         userList.splice(userIndex, 1);
    //       }

    //       const newUserList = userList;
    //       chatroom.update({userList: newUserList});


    //     }
        
    //     // chatroom.update({userList: currChatID})
    //   })
    //   // console.log("Switching to " + this.state.currChatIndex + ' ' + this.state.currChatID);
    // });




  }
  componentDidMount() {
    document.body.style.height = "100%";
    document.getElementById("root").style.height = "100%";
    document.getElementsByClassName("App")[0].style.height = "100%";



    //this.props.updateLastSeen(this.props.auth.uid);
  }

  removeCourse(courseToRemove) {
    // updateProfile
    const { courses } = this.props.profile;
    console.log(courses);
    var newCourses = courses;
    var cc = newCourses.filter(function(val, index, arr) {
      return val !== courseToRemove;
    });

    console.log(cc);
    var newDetails = this.props.profile;
    newDetails.courses = cc;
    console.log(newDetails);

    this.props.updateProfile(newDetails);
  }

  getOnline(users) {
    var online = []
    if (!users) {
      return online;
    }

    // console.log('users: ' + JSON.stringify(users));

    // console.log('chatroom: ' + JSON.stringify(this.props.chatroom))

    users.forEach(function(elem) {
      if (Date.now() - elem['lastSeen'] < 900000) {
        online.push(elem.firstName);
      }
    });
    return online;
  }

  getUsersInCurrChat(currChatID) {

    var userList = this.props.chatroom[0].userList;

    // console.log('userList (asdddssssd): ' + JSON.stringify(userList));

    return userList;
    
  }


  renderCourseCards(courseList, numPerRow) {
    

    const content2 = courseList.map((channel, i) => (
      <div style={{ display: "flex", flexDirection: "row" }} key={i}>
        {/* // map courses in the row as columns */}
        <ul className="list-group">
            <li
              className="list-group-item"
              style={{ display: "inline-block", float: "left" }}
            >
              <CourseCard
                key={i}
                removeCourse={this.removeCourse.bind(this)}
                setChat={this.setChat.bind(this)}
                oldIndex={this.state.currChatIndex}
                course={{ name: channel, id: i }}
              />
            </li>
        
        </ul>
      </div>
      
    ))


    return (
      <div style={{ transform: "scaleX(-1)" }}>
        {content2}
      </div>
    );
  }

  render() {
    if (!this.props.auth) {
      return <Redirect to="/" />;
    }
    var { courses } = this.props.profile;

    if (courses == undefined) return <div />;

    
    if (!courses.includes("room1")) {
      courses.unshift("room1");
    }
    var online = []
    if (this.props.auth.isLoaded) {
      this.props.updateLastSeen(this.props.auth.uid);
      online = this.getOnline(this.props.users);
    }
    var usersInCurrChat = [];

    var result = this.getUsersInCurrChat()

    if(result) {
      usersInCurrChat = result;
    }



    // console.log('usersCurrChat (render) ' + usersInCurrChat)


    
    return (
      // <Container fluid>
      <div className="container-fluid" style={{ height: "90%" }}>
        <div className="row" style={{ height: "100%" }}>
          <div
            className="col-md-2 card"
            style={{
              height: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
              paddingRight: "0px",
              paddingLeft: "0px",
              transform: "scaleX(-1)"
            }}
          >
            {this.renderCourseCards(courses, 3)}
          </div>

          <div
            className="col-md-8 card"
            style={{
              height: "100%",
              paddingLeft: "0px",
              paddingRight: "0px",
              scrollbarWidth: "none"
            }}
          >
            <Messages
              key={courses[this.state.currChatIndex]}
              user={this.props.profile}
              roomID={courses[this.state.currChatIndex]}
              roomName={courses[this.state.currChatIndex]}
            />
          </div>


          <div className="card col-md-2" style={{ width: "100%" }}>
            <MetaPanel online={usersInCurrChat}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    users: state.firestore.ordered.users,

    chatroom: state.firestore.ordered.messages,

    ordered: state.firestore,
  };
};
const allActions = {...actions, ...chatActions}
export default compose(
connect(
  mapStateToProps,
  allActions,
),
  firestoreConnect((props) =>  [
    `users`,
    `messages`
  ])
)(HomeScreen);
