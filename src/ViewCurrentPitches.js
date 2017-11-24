import React from 'react';
// import { Button } from 'react-bootstrap'

import './App.css'

// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
    width: '80%',
    maxWidth: 'none',
    position: 'absolute',
    top: '0%',
    left: '10%'

};

const style = {
  margin: 12,
};

export function NewPitch (props) {
    const actions = [
        <FlatButton
        label="Cancel"
        primary={true}
        onClick={props.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={props.handleSave}
      />,
    ];

    return (
        <div>
            <RaisedButton label="Add New Pitch" style={style} onClick={props.handleOpen} />
            <Dialog
                className="dialogBox"
                title="Add New Pitch"
                actions={actions}
                modal={true}
                open={props.state}
                onRequestClose={props.handleClose}
                autoScrollBodyContent={true}
                contentStyle={customContentStyle}
            >
                <TextFieldExampleCustomize currentValue = {props.currentValue} updateNewPitch = {props.updateNewPitch} />
            </Dialog>
      </div>
    )
}

export const TextFieldExampleCustomize = (props) => {
    return (
        <div>
            <TextField style={style} floatingLabelText="Linkedin Project Name" name="projectName" value={props.currentValue.projectName} onChange = {props.updateNewPitch} />
            <TextField style={style} floatingLabelText="Group Name" name="groupName" value={props.currentValue.groupName} onChange = {props.updateNewPitch} />
            <TextField floatingLabelText="Pitch Name" name="pitchName" value={props.currentValue.pitchName} onChange = {props.updateNewPitch} /> <div/>
            <TextField floatingLabelText="Shortcut" name="shortCut" value={props.currentValue.shortCut} onChange = {props.updateNewPitch} /> <div/>
            <TextField floatingLabelText="Subject" name="subject" value={props.currentValue.subject} onChange = {props.updateNewPitch} /> <div/>
            <TextField
                    name="pitch"
                    value={props.currentValue.pitch}
                    onChange = {props.updateNewPitch}
                    fullWidth= {true}
                    multiLine={true} 
                    hintText="Pitch" 
                    floatingLabelText="Pitch"
            /> <div/>
        </div>
    ) 
}







