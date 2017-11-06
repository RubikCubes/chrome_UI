
import React from 'react';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Switch from 'react-toggle-switch'
import "react-toggle-switch/dist/css/switch.min.css"

function Input(props) {
    return (
        <form>
            <div className="form-group small-width form-margin">
                <div><input className= 'form-control' name="projectName" value={props.currentValue.projectName} placeholder="Project Name" onChange = {props.updateNewPitch} /></div>
                <div><input className= 'form-control' name="pitchName" value={props.currentValue.pitchName} placeholder="Pitch Name" onChange = {props.updateNewPitch}/></div>
                <div><input className= 'form-control' name="shortCut" value={props.currentValue.shortcut} placeholder="Short cut" onChange = {props.updateNewPitch} /></div>
                <div><input className= 'form-control' name="subject" value={props.currentValue.subject} placeholder="Subject" onChange = {props.updateNewPitch} /></div>
                <div><textarea className= 'form-control' name="pitch" value={props.currentValue.pitch} placeholder="Enter Pitch" onChange = {props.updateNewPitch}/></div>
                <Button className='button-margin' bsStyle="primary" type="submit" onClick={props.savePitch} >Add Pitch</Button>
                <Button className='button-margin' bsStyle="danger" onClick={props.toggleForm}> Nevermind </Button>
            </div>
        </form>
    )
}

function AddNewPitchForm(props){
    return (
        props.showForm ? 
            <Input savePitch={props.savePitch} toggleForm = {props.toggleForm} currentValue = {props.currentValue} updateNewPitch={props.updateNewPitch} />
            :
            <Button className='button-margin' bsStyle="primary" onClick={props.toggleForm}>Add New Pitch</Button>

    )
}

function CheckState(props){
    function handleClick(e){
        console.log(props.state)
        console.log(JSON.parse(window.localStorage.getItem("pitches")))
    }
    return(
        <Button className='button-margin' bsStyle="primary" onClick={handleClick}>Click for state</Button>
    )
}

function ViewCurrentPitches(props){
    // props.pitches.map((value, index) => {console.log(value.pitchName)})
    //update chrome storage
    // console.log(props.state)
    return (
        props.state.savedPitches.map((pitch, i) => {
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
            })
    )
}

function SendInmailShortCut(props) {
    return (
        <div className='input-group pitch-width'>
            <span class="input-group-addon" id="basic-addon1">Send Inmail Shortcut</span>
            <input name= "sendInmailShortCut" value={props.currentState} onChange={props.updateState} type="text" class="form-control" placeholder="Send Inmail shortcut" aria-describedby="basic-addon1" />
        </div>
    )
}

function AdvanceProfile(props) {
    return (
        <div className='input-group pitch-width'>
            <span class="input-group-addon" id="basic-addon1">Advance Profile Shortcut</span>
            <input name= "advanceProfileShortcut" value={props.currentState} onChange={props.updateState} type="text" class="form-control" placeholder="Advance Profile Shortcut" aria-describedby="basic-addon1" />
        </div>
    )
}
// <Switch onClick={props.onClick} on={props.on} />
// function toggleNextProfileButton(props) {}

function TestPanel() {
    return (
        <div className="panel panel-default pitch-width">
            <div className="panel-body">Panel Content</div>
        </div>
    )
}


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
            editPitch: '',
            editPitchIndex: '',
            lockUpdate: false,
            toggleInmailSwitch: false,
            sendInmailShortCut: '',
            advanceProfileShortcut: '',
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
                <AddNewPitchForm 
                    showForm={this.state.addNewPitchForm} 
                    savePitch={this.savePitch} 
                    currentValue = {this.state.addNewPitch} 
                    updateNewPitch = {this.updateNewPitch} 
                    toggleForm = {this.toggleNewPitchForm}
                />

                <div />

                <ViewCurrentPitches 
                    edit = {this.changeState} 
                    state= {this.state}
                    completeEditUpdate = {this.completeEditUpdate}
                    handleEditUpdate = {this.handleEditUpdate}
                    deletePitch = {this.deletePitch}
                />

                <SendInmailShortCut updateState={this.updateSimpleState} currentState = {this.state.sendInmailShortCut} />
                <br />
                <AdvanceProfile updateState={this.updateSimpleState} currentState = {this.state.advanceProfileShortcut}/>
                <br />
                <CheckState state={this.state} />
                <TestPanel>
                    <ViewCurrentPitches 
                    edit = {this.changeState} 
                    state= {this.state}
                    completeEditUpdate = {this.completeEditUpdate}
                    handleEditUpdate = {this.handleEditUpdate}
                    deletePitch = {this.deletePitch}
                    />
                </TestPanel>

            </div>

        )
    }
}

export default Form;
