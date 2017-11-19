import React from 'react';
import TextField from 'material-ui/TextField';

const buttonSpacing = {
  margin: 12,
};

function SendInmailShortCut(props) {
    return (
        <TextField helperText="Some important text" style={buttonSpacing} value={props.currentState} onChange={props.updateState} name= "sendInmailShortCut" floatingLabelText="Send Inmail Shortcut" />
    )
}

function AdvanceProfile(props) {
    return (
        <TextField style={buttonSpacing} name= "advanceProfileShortCut" value={props.currentState} onChange={props.updateState} floatingLabelText="Advance Profile"/>
    )
}

function AddToGreenhouse(props) {
    return (
        <TextField style={buttonSpacing} name= "addToGreenhouseShortCut" value={props.currentState} onChange={props.updateState} floatingLabelText="Add to Greenhouse"/>
    )
}

export default function ShortCuts(props) {
    return(
        <div id="shortcuts">
            <SendInmailShortCut updateState={props.updateShortCuts} currentState = {props.shortCuts.sendInmailShortCut} />
            <AdvanceProfile updateState={props.updateShortCuts} currentState = {props.shortCuts.advanceProfileShortcut}/>
            <AddToGreenhouse updateState={props.updateShortCuts} currentState = {props.shortCuts.addToGreenhouseShortCut}/>
            <h4 style={buttonSpacing} >Remember to add a space between shortcut letters. i.e. "shift n p" </h4><br/>
        </div>
    )
}