import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBlock,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

import { Link } from "react-router-dom";


class CourseCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { id, name, } = this.props.course;

    let key = this.props.key;


    let CSC108 = "http://www.quickmeme.com/img/73/73da3b2d80dea370c1312e3060fec6af4b9ce54fbb7306324d47e07c746aa9d5.jpg" + id "&w=318&h=180"
    let CSC148 = "http://www.vincentmaccio.com/csc373/memes.html" + id +"&w=318&h=180"
    let CSC207 = "https://i.redd.it/4jidpdnobtk21.jpg" + id +"&w=318&h=180"
    let CSC236 = "http://www.cs.toronto.edu/~ylzhang/csc236/memes/jasmeet-s-2.jpg" + id +"&w=318&h=180"
    let CSC209 = "https://i.redd.it/8y0xty68z7a21.jpg"+ id +"&w=318&h=180"
    let CSC258 = "http://www.cs.toronto.edu/~ylzhang/csc258/memes/ja-8.jpg" + id +"&w=318&h=180"
    let CSC263 = "http://i.imgur.com/sphDT6X.jpg"  + id +"&w=318&h=180"

    return (
      <div style={{margin: 25}}>
          <Card>
          {/* // pass the room ID that we clicked on to the chatroom route */}
          <Link to={{ pathname: "/chatroom", state: {roomID: id}}} >

            <CardImg top width="100%" src=


            alt="Card image cap" />
          </Link>
          <CardBlock>
            <CardTitle>{name} </CardTitle>
            <Button color="danger" onClick={() => this.props.removeCourse(id)}>Leave Chat</Button>
          </CardBlock>
        </Card>

      </div>

    )
  }
}

export default CourseCard;
