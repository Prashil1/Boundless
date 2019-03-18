import React from 'react';
import { connect } from 'react-redux'
import { Segment, Input, Button } from 'semantic-ui-react';
import * as actions from '../../../actions/messageActions'
class ChatForm extends React.Component {

    state = {
        message: ""
    }

    handleOnChange = (e) => {
        this.setState({
            message: e.target.value
        })
        console.log(this.state.message);
        
    }

    handleOnSubmit = (e) => {
        if (this.state.message == "") {
            return;
        }
        const msg = {
            message: this.state.message,
            user: this.props.user
        }
        this.props.newMessage(msg)
        this.setState({
            message: ""
        })
    }
onKeyPress = (e) => {
    if(e.which === 13) {
      this.handleOnSubmit();
    }
  }

    render() {
        // console.log(this.props.profile);
        console.log(this.props.user,'-------');
        
        return (
            
            <Segment className="chatForm" style={{display: "flex", flexDirection: "row", margin: 5}}>

                <Input
                    fluid
                    name="chatMessage"
                    style={{ width: "80%", margin: '0.5em'}}
                    label={<Button icon={'add'} /> }
                    value={this.state.message}
                    labelPosition="left"
                    onChange={this.handleOnChange}
                    placeholder="Enter your message"
                    onKeyPress={this.onKeyPress}
                />


                <Button
                    primary
                    // color="grey"
                    content="Send"
                    labelPosition="right"
                    icon="edit"
                    onClick={this.handleOnSubmit}
                />
                {/* <Button.Group icon widths="2">


                
                
                </Button.Group> */}
        
            </Segment>


        )
    }
}




export default connect(null, actions)(ChatForm)