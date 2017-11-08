import React from 'react';
import { Button } from 'react-bootstrap'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import FlatButton from 'material-ui/FlatButton';

const customContentStyle = {
    width: '80%',
    maxWidth: 'none',
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
            <RaisedButton label="Add New Pitch" onClick={props.handleOpen} />
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
            <TextField floatingLabelText="Linkedin Project Name" name="projectName" value={props.currentValue.projectName} onChange = {props.updateNewPitch} /> <div/>
            <TextField floatingLabelText="Pitch Name" name="pitchName" value={props.currentValue.pitchName} onChange = {props.updateNewPitch} /> <div/>
            <TextField floatingLabelText="Shortcut" name="shortCut" value={props.currentValue.shortcut} onChange = {props.updateNewPitch} /> <div/>
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

export function ViewCurrentPitches2(props) {
    const actions = [
        <FlatButton
        label="Cancel"
        primary={true}
        onClick={props.closeEditPitch}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={props.savePitchBeingEdited}
      />,
    ];
    
    return (
        props.state.savedPitches.map((pitch, i) => {
            return(
                <Card key={pitch.id} className = 'form-margin card-width' zDepth={3}>
                    <CardText>{pitch.subject} </CardText>
                    <CardText className='card'>{pitch.pitch}</CardText>
                    <CardActions>
                        <FlatButton label="Edit" onClick={(e) => {props.toggleEdit(e, pitch); console.log(props.state.pitchBeingEdited)}}/>
                            <Dialog
                                id='centerpoint'
                                className="dialogBox"
                                title="Test"
                                modal={false}
                                actions={actions}
                                open={props.state.editPitch}
                                contentStyle={customContentStyle}
                            >
                                <TextFieldExampleCustomize currentValue = {props.state.pitchBeingEdited} updateNewPitch = {props.updatePitchBeingEdited} />
                            </Dialog>

                        <FlatButton label="Delete" onClick={(e) => {props.deletePitch(e, pitch)}} />
                    </CardActions>
                </Card>
            )
            
        })
    )
}