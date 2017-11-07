import React from 'react';
import { Button } from 'react-bootstrap'

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export function ViewCurrentPitches(props){
    return (
        props.state.savedPitches.map((pitch, i) => {
            // return (
            return pitch['update']
                ?
                <div key={pitch.id} className="form-group small-width form-margin">
                    <div><input className= 'form-control' name="projectName" onChange = {props.handleEditUpdate} value={props.state.editPitch.projectName} placeholder="Project Name" /></div>
                    <div><input className= 'form-control' name="pitchName" onChange = {props.handleEditUpdate} value={props.state.editPitch.pitchName} placeholder="Pitch Name" /></div>
                    <div><input className= 'form-control' name="shortCut" onChange = {props.handleEditUpdate} value={props.state.editPitch.shortCut} placeholder="Short cut" /></div>
                    <div><input className= 'form-control' name="subject" onChange = {props.handleEditUpdate} value={props.state.editPitch.subject} placeholder="Subject" /></div>
                    <div><textarea className= 'form-control' name="pitch" onChange = {props.handleEditUpdate} value={props.state.editPitch.pitch} placeholder="Enter Pitch" /></div>
                    <Button className='button-margin' bsStyle="primary" type="submit" onClick={props.completeEditUpdate}>Save</Button>
                </div>
                : 
                <div key={pitch.id} className="bs-example pitch-width form-margin border-0">
                    <div>
                        <div>
                            <strong>Project Name: </strong>
                            <span>{pitch.projectName}</span>
                        </div>
                        <div>
                            <strong>Pitch name: </strong>
                            <span>{pitch.pitchName}</span>
                        </div>
                        <div>
                            <strong>Short cut: </strong> 
                            <span>{pitch.shortCut}</span>
                        </div>
                        <div>
                            <strong>Subject: </strong>
                            <span>{pitch.subject}</span>
                        </div>
                        <pre>{pitch.pitch}</pre>
                    </div>
                    <Button onClick={(e) => {props.edit(e, pitch)}} className='button-margin' bsStyle='warning'> Edit </Button>
                    <Button onClick={(e) => {props.deletePitch(e, pitch)}} className='button-margin' bsStyle='danger'> Delete </Button>
                </div>
            // )
        })
    )
}

export function ViewCurrentPitches2(props) {
    console.log(props.currentValue)
    return (
        props.state.savedPitches.map((pitch, i) => {
            return(
                <Card key={pitch.id} className = 'form-margin card-width' zDepth={3}>
                    <CardText>{pitch.subject} </CardText>
                    <CardText className='card'>{pitch.pitch}</CardText>
                    <CardActions>
                        <FlatButton label="Edit" onClick={(e) => {props.handleOpen(e, pitch)}} />
                        <FlatButton label="Delete" onClick={(e) => {props.deletePitch(e, pitch)}} />
                    </CardActions>
                </Card>
            )
            
        })
    )
}