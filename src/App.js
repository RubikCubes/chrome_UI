
import React from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import "react-toggle-switch/dist/css/switch.min.css"

import CheckState from './CheckState'
import {ViewCurrentPitches2, NewPitch, TextFieldExampleCustomize} from './ViewCurrentPitches'
import {SendInmailShortCut, AdvanceProfile} from './ShortCuts'


import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
// import {orange500, blue500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import notoSansRegular from './Fonts'

notoSansRegular()

// function Input(props) {
//     console.log('input section')
//     console.log(props.currentValue.projectName)
//     return (
//         <form>
//             <div className="form-group small-width form-margin">
//                 <div><input className= 'form-control' name="projectName" value={props.currentValue.projectName} placeholder="Project Name" onChange = {props.updateNewPitch} /></div>
//                 <div><input className= 'form-control' name="pitchName" value={props.currentValue.pitchName} placeholder="Pitch Name" onChange = {props.updateNewPitch}/></div>
//                 <div><input className= 'form-control' name="shortCut" value={props.currentValue.shortcut} placeholder="Short cut" onChange = {props.updateNewPitch} /></div>
//                 <div><input className= 'form-control' name="subject" value={props.currentValue.subject} placeholder="Subject" onChange = {props.updateNewPitch} /></div>
//                 <div><textarea className= 'form-control' name="pitch" value={props.currentValue.pitch} placeholder="Enter Pitch" onChange = {props.updateNewPitch}/></div>
//                 <Button className='button-margin' bsStyle="primary" type="submit" onClick={props.savePitch} >Add Pitch</Button>
//                 <Button className='button-margin' bsStyle="danger" onClick={props.toggleForm}> Nevermind </Button>
//             </div>
//         </form>
//     )
// }

// function AddNewPitchForm(props){
//     return (
//         props.showForm ? 
//             <Input savePitch={props.savePitch} toggleForm = {props.toggleForm} currentValue = {props.currentValue} updateNewPitch={props.updateNewPitch} />
//             :
//             <Button className='button-margin' bsStyle="primary" onClick={props.toggleForm}>Add New Pitch</Button>

//     )
// }


class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addNewPitch: {
                id: 1,
                projectName: '',
                pitchName: '',
                shortCut: '',
                subject: '',
                pitch: '',
                update: false
            },
            savedPitches: [],
            addNewPitchForm: false,
            pitchBeingEdited: '',
            editPitchIndex: '',
            lockUpdate: false,
            toggleInmailSwitch: false,
            sendInmailShortCut: '',
            advanceProfileShortcut: '',
            dialogBox: false,
            editPitch: false
        };

        this.savePitch = this.savePitch.bind(this)
        this.updateNewPitch = this.updateNewPitch.bind(this)
        this.toggleNewPitchForm = this.toggleNewPitchForm.bind(this)
        this.handleEditUpdate = this.handleEditUpdate.bind(this)
        this.changeState = this.changeState.bind(this)
        this.completeEditUpdate = this.completeEditUpdate.bind(this)
        this.handleEditUpdate = this.handleEditUpdate.bind(this)
        this.deletePitch = this.deletePitch.bind(this)
        this.toggleSendInmailSwitch = this.toggleSendInmailSwitch.bind(this)
        this.updateSimpleState = this.updateSimpleState.bind(this)
        this.dialogBoxOpen  = this.dialogBoxOpen.bind(this)
        this.dialogBoxClose = this.dialogBoxClose.bind(this)
        this.dialogBoxSave = this.dialogBoxSave.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.closeEditPitch = this.closeEditPitch.bind(this)
        this.updatePitchBeingEdited = this.updatePitchBeingEdited.bind(this)
        this.savePitchBeingEdited = this.savePitchBeingEdited.bind(this)
        
    }

    toggleEdit(e, pitch) {
        const newState = this.state.savedPitches.slice()
        let pitchBeingEdited
        let pitchIndex

        newState.map((mapPitch, index) => {
            if (mapPitch['id'] === pitch['id']) {

                // newState.splice(index, 1)

                // pitchBeingEdited = {...mapPitch, update:!mapPitch['update']}
                pitchBeingEdited = mapPitch
                pitchIndex = index
                // newState.splice(index, 0, pitchBeingEdited)
            }
        })

        this.setState(
            {
                pitchBeingEdited: pitchBeingEdited,
                editPitchIndex: pitchIndex,
                editPitch: true

            }
        )
    }

    updatePitchBeingEdited(e) {
        this.setState(
            {pitchBeingEdited: {...this.state.pitchBeingEdited, [e.target.name]: e.target.value}}
        );
    }

    savePitchBeingEdited(){
        const newState = this.state.savedPitches.slice()

        newState.splice(this.state.editPitchIndex, 1)
        
        newState.splice(this.state.editPitchIndex, 0, this.state.pitchBeingEdited)

        console.log(newState)

        this.setState({
            savedPitches: newState,
            editPitch: false
        })
    }
        
    closeEditPitch() {
        this.setState({editPitch: false})
    }

    dialogBoxOpen() {
        this.setState({dialogBox: true})
    }

    dialogBoxClose() {
        this.setState({dialogBox: false})
    }

    dialogBoxSave() {
        this.savePitch()
        this.setState({dialogBox: false})   
    }



    updateSimpleState(e) {
        console.log([e.target.name])
        this.setState({[e.target.name]: e.target.value})
    }

    toggleSendInmailSwitch() {
        this.setState({toggleInmailSwitch: !this.state.toggleInmailSwitch})
    }

    componentDidMount() {
        var savedPitches = JSON.parse(window.localStorage.getItem("pitches"))

        var highestId
        var emptyList = []

        var pitchesFound = () => {
            highestId = savedPitches.reduce((prev, next) => {
                return prev < next.id ? next.id : prev;
            }, 0); 
            this.setState({
                savedPitches: savedPitches,
                addNewPitch: {...this.state.addNewPitch, id: highestId + 1}
            })   
        }

        var pitchesNotFound = () => {
            highestId = 0;
            this.setState({emptyList})
        }        
        
        savedPitches 
            ?
            pitchesFound()
            :
            pitchesNotFound()
            
    }

    handleEditUpdate(e) {
        this.setState({editPitch: {...this.state.editPitch, [e.target.name]: e.target.value}})
    }

    completeEditUpdate() {
        const newState = this.state.savedPitches.slice()

        newState.splice(this.state.editPitchIndex, 1)

        var changePitchStatus = {...this.state.editPitch, update:!this.state.editPitch['update']}
        
        newState.splice(this.state.editPitchIndex, 0, changePitchStatus)


        this.setState({
            editPitchIndex: '',
            editPitch: '',
            savedPitches: newState,
            lockUpdate: false,
        },
        () => window.localStorage.setItem('pitches', JSON.stringify(this.state.savedPitches), () => {console.log('message saved')})
        )
    }

    deletePitch(e, pitch){
        const newState = this.state.savedPitches.slice();
        newState.map((mapPitch, index) => {
            if (mapPitch['id'] === pitch['id']) {
                newState.splice(index, 1)
            }
        });
        console.log(newState)
        this.setState({
            savedPitches: newState
        },
        () => window.localStorage.setItem('pitches', JSON.stringify(this.state.savedPitches), () => {console.log('message saved')})
        )
    }

    updateNewPitch(e){
        this.setState({addNewPitch: {...this.state.addNewPitch, [e.target.name]: e.target.value}})
    }

    changeState(e, pitch) {
        const newState = this.state.savedPitches.slice()
        let pitchBeingEdited
        let pitchIndex

        if (this.state.lockUpdate) {
            alert('Complete Editing before starting new edit')

        } else {
            newState.map((mapPitch, index) => {
                if (mapPitch['id'] === pitch['id']) {

                    newState.splice(index, 1)

                    pitchBeingEdited = {...mapPitch, update:!mapPitch['update']}
                    pitchIndex = index
                    newState.splice(index, 0, pitchBeingEdited)
                }
            })
            // console.log(personBeingEdited)
            this.setState(
                {
                    dialogBox: true,
                    lockUpdate: true,
                    editPitchIndex: pitchIndex,
                    savedPitches: newState,
                    editPitch: pitchBeingEdited
                },

            )
            return null
        }

    }



    

    savePitch(e){
        this.setState({savedPitches: [...this.state.savedPitches, this.state.addNewPitch]})
        this.setState({addNewPitch: {
            id: this.state.addNewPitch.id + 1,
            pitchName: '',
            shortCut: '',
            subject: '',
            pitch: ''
        }}, () => window.localStorage.setItem('pitches', JSON.stringify(this.state.savedPitches), () => {console.log('message saved')}) 
        )
        this.toggleNewPitchForm()
    }



    toggleNewPitchForm(e){
        this.setState({addNewPitchForm: !this.state.addNewPitchForm})
    }

    render() {
        return(
            <div>                
                <SendInmailShortCut updateState={this.updateSimpleState} currentState = {this.state.sendInmailShortCut} />
                <br />
                <AdvanceProfile updateState={this.updateSimpleState} currentState = {this.state.advanceProfileShortcut}/>
                <br />
                <CheckState currentState={this.state} />
                <br/>
                
                <br/>
                <NewPitch  
                    handleOpen={this.dialogBoxOpen} 
                    handleClose={this.dialogBoxClose} 
                    handleSave={this.dialogBoxSave} 
                    state={this.state.dialogBox} 
                    currentValue = {this.state.addNewPitch}
                    updateNewPitch = {this.updateNewPitch}
                    edit = {this.changeState}
                />
                <br />
                <Divider />

                <div className='card-parent'>
                    <ViewCurrentPitches2
                        state= {this.state}
                        deletePitch = {this.deletePitch}
                        handleSave={this.dialogBoxSave}
                        toggleEdit = {this.toggleEdit}
                        closeEditPitch = {this.closeEditPitch}
                        updatePitchBeingEdited = {this.updatePitchBeingEdited}
                        savePitchBeingEdited = {this.savePitchBeingEdited}
                    />
                </div>
            </div>
        )
    }
}

export default Form;
