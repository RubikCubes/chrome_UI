import { Button } from 'react-bootstrap'
import React from 'react';

import {TextFieldExampleCustomize} from './ViewCurrentPitches'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';



import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

const getTheme = () => {
  let overwrites = {
    "dialog": {
        "bodyColor": "#3f51b5"
    }
};
  return getMuiTheme(baseTheme, overwrites);
}

const customContentStyle = {
    width: '80%',
    maxWidth: 'none',
    position: 'absolute',
    top: '0%',
    left: '10%'

};

const buttonSpacing = {
  margin: 12,
};

export function ListNames(props){
    function handleClick(){
        console.log('this ran')
        props.updateListOfPitchNames()
    }
    return(
        <Button className='button-margin' bsStyle="primary" onClick={handleClick}>Update List Names</Button>
    )
};

export function ViewHeaders(props){
    return (
        props.pitchKeys.map((pitchGroupName, index) => {
            console.log(pitchGroupName)
            return (
                <div key={index}>
                    <h1 style={buttonSpacing}> {pitchGroupName} </h1>
                    <div className='card-parent'>
                        <ViewPitches key={index} props ={props} pitches={props.pitches} pitchGroupName={pitchGroupName}/>
                    </div>
                </div>
            )
        })
    )
};


function ViewPitches(props) {
    
    return(
        props.pitches.map((pitch, index) => {
            console.log(pitch)
            if (pitch.groupName == props.pitchGroupName) {
                return (
                    <div key={index}>
                        <ViewCurrentPitch
                            pitch={pitch}
                            editPitch={props.props.state.editPitch}
                            deletePitch= {props.props.deletePitch}
                            handleSave={props.props.handleSave}
                            toggleEdit={props.props.toggleEdit}
                            closeEditPitch = {props.props.closeEditPitch}
                            updatePitchBeingEdited = {props.props.updatePitchBeingEdited}
                            savePitchBeingEdited = {props.props.savePitchBeingEdited}
                            pitchBeingEdited = {props.props.state.pitchBeingEdited}
                        />
                    </div>
                )    
            }
        })
    )
}


export function ViewCurrentPitch(props){
    const actions = [
        <RaisedButton
        label="Cancel"
        primary={true}
        onClick={props.closeEditPitch}
        style={buttonSpacing}
      />,
      <RaisedButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={props.savePitchBeingEdited}
        style={buttonSpacing}
      />,
    ];

    // console.log(props)
    return (
        <Card key={props.pitch.id} className = 'form-margin card-width' zDepth={5}>
            <CardText>
                <strong>Pitch Name:</strong> {props.pitch.pitchName}<br/>
                <strong>Linkedin Project Name: </strong> {props.pitch.projectName}<br/>
                <strong>ShortCut: </strong> {props.pitch.shortCut} <br/>
            </CardText>
            <CardText><strong>Subject: </strong>{props.pitch.subject} </CardText>
            <CardText className='card'><strong>Message:</strong><br/>{props.pitch.pitch}</CardText>
            <CardActions className= 'this-is-a-test'>
                <RaisedButton default={true} className= 'flat-button' label="Edit" onClick={(e) => {props.toggleEdit(e, props.pitch); console.log(props.state)}}/>
                    <Dialog
                        className="dialogBox"
                        title="Test"
                        actions={actions}
                        open={props.editPitch}
                        contentStyle={customContentStyle}
                        autoScrollBodyContent={true}
                    >
                        <TextFieldExampleCustomize currentValue = {props.pitchBeingEdited} updateNewPitch = {props.updatePitchBeingEdited} />
                    </Dialog>
                <RaisedButton default={true} label="Delete" onClick={(e) => {props.deletePitch(e, props.pitch)}} />
            </CardActions>
        </Card>
    )
}

// <ViewDialogBox pitchBeingEdited={props.pitchBeingEdited} actions={actions} toggleEdit={props.toggleEdit} savePitchBeingEdited={props.savePitchBeingEdited} />


// function ViewDialogBox(props) {
//     // console.log(props)
//     return (
//         <Dialog
//             className="dialogBox"
//             title="Test"
//             modal={false}
//             actions={props.actions}
//             open={props.toggleEdit}
//             contentStyle={customContentStyle}
//             autoScrollBodyContent={true}
//         >
//             <TextFieldExampleCustomize currentValue = {props.pitchBeingEdited} updateNewPitch = {props.updatePitchBeingEdited} />
//         </Dialog>
//     )

// }

