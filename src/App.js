/* global gapi */

import React from 'react';

import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

import "react-toggle-switch/dist/css/switch.min.css"

import Buttons from './CheckState'
import {ViewCurrentPitches2, NewPitch, TextFieldExampleCustomize} from './ViewCurrentPitches'
import ShortCuts from './ShortCuts'

import {ListNames, ViewHeaders} from './UpdatePitchNamesTest'

import Logout from './Logout';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';


import notoSansRegular from './Fonts'

const buttonSpacing = {
  margin: 12,
};

notoSansRegular()


class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addNewPitch: {
                id: 1,
                groupName: '',
                projectName: '',
                pitchName: '',
                shortCut: '',
                subject: '',
                pitch: '',
                update: false
            },
            savedPitches: [],
            
            savedShortCuts: {
                addToGreenhouseShortCut: '', 
                sendInmailShortCut: '', 
                advanceProfileShortCut: ''
            },

            addNewPitchForm: false,
            pitchBeingEdited: '',
            editPitchIndex: '',
            lockUpdate: false,
            toggleInmailSwitch: false,
            sendInmailShortCut: '',
            advanceProfileShortcut: '',
            dialogBox: false,
            editPitch: false,
            pitchesSortedByName: {},
            pitchNameKeys: [],
            addToGreenhouse:'',
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
        this.sortPitchesByName = this.sortPitchesByName.bind(this)
        this.updateShortCuts = this.updateShortCuts.bind(this)
        this.signOut = this.signOut.bind(this)
        this.loadAuth = this.loadAuth.bind(this)
    }

    

    sortPitchesByName() {
        var keys = []

        var data = {}

        this.state.savedPitches.map((pitch, index) => {
            if (keys.indexOf(pitch.pitchName) != -1) {
                data[pitch.pitchName].push(pitch)
            } else {
                keys.push(pitch.pitchName)
                data[pitch.pitchName] = [pitch]
            }
        })

        // console.log(keys)
        // console.log(data)

        this.setState({
            pitchesSortedByName: data,
            pitchNameKeys: keys
        })
    }

    toggleEdit(e, pitch) {
        const newState = this.state.savedPitches.slice()
        let pitchBeingEdited
        let pitchIndex

        newState.map((mapPitch, index) => {
            if (mapPitch['id'] === pitch['id']) {
                pitchBeingEdited = mapPitch
                pitchIndex = index
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

    updateShortCuts(e){
        this.setState({
            savedShortCuts: {...this.state.savedShortCuts, [e.target.name]: e.target.value}
        },
        () => window.localStorage.setItem('shortCuts', JSON.stringify(this.state.savedShortCuts), () => {console.log('shortCuts saved')})
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

        this.setState({
            editPitch: '',
            editPitchIndex: '',
            savedPitches: newState,
            editPitch: false
        },
        () => {
            (() => {this.sortPitchesByName()}) ();
            (() => window.localStorage.setItem('pitches', JSON.stringify(this.state.savedPitches), () => {console.log('message saved')})) ()
        }
        )
    }
        
    closeEditPitch() {
        this.setState({editPitch: false})
    }

    dialogBoxOpen() {
        this.setState({dialogBox: true})
    }

    dialogBoxClose() {

        var currentID = this.state.addNewPitch.id

        this.setState({
            addNewPitch: {
                id: currentID,
                groupName: '',
                projectName: '',
                pitchName: '',
                shortCut: '',
                subject: '',
                pitch: '',
                update: false
            },
            dialogBox: false
        })
    }

    dialogBoxSave() {
        this.savePitch()
        this.setState({dialogBox: false})   
    }

    savePitch(e){
        this.setState({savedPitches: [...this.state.savedPitches, this.state.addNewPitch]})
        this.setState({addNewPitch: {
            id: this.state.addNewPitch.id + 1,
            pitchName: '',
            shortCut: '',
            subject: '',
            pitch: ''
        }},
        () => {
            (() => {this.sortPitchesByName()}) ();
            (() => window.localStorage.setItem('pitches', JSON.stringify(this.state.savedPitches), () => {console.log('message saved')})) ()
        }
        )
        this.toggleNewPitchForm()
    }

    updateLocalStorage() {
        () => window.localStorage.setItem('pitches', JSON.stringify(this.state.savedPitches), () => {console.log('message saved')}) 
    }

    

    updateSimpleState(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    toggleSendInmailSwitch() {
        this.setState({toggleInmailSwitch: !this.state.toggleInmailSwitch})
    }

    signOut() {
        // var auth2 = gapi.auth2.getAuthInstance();
        gapi.auth2.getAuthInstance().signOut().then(function () {
            console.log('User signed out.');
        });
    }

    loadAuth() {
        console.log('this ran')
        // var auth2 = gapi.auth2.getAuthInstance()
        var auth2 = gapi.auth2.getAuthInstance()
        var signedIn = auth2.isSignedIn.get()
        console.log(signedIn)        
        // gapi.load('auth2', function() {
        //     gapi.auth2.init({
        //         client_id: '817677528939-dss5sreclldv1inb26tb3tueac98d24r'
        //     }).then((auth2) => {console.log(auth2)});
        // })
    }

    componentDidMount() {
        gapi.load('auth2', function() {
            gapi.auth2.getAuthInstance()
        })
        // gapi.load('auth2')

        var savedPitches = JSON.parse(window.localStorage.getItem("pitches"))
        var savedShortCuts = JSON.parse(window.localStorage.getItem("shortCuts"))
        if (savedShortCuts) {
            this.setState({
                savedShortCuts: savedShortCuts
            })
        }

        var highestId
        var emptyList = []

        var pitchesFound = () => {
            highestId = savedPitches.reduce((prev, next) => {
                return prev < next.id ? next.id : prev;
            }, 0); 
            this.setState({
                savedPitches: savedPitches,
                addNewPitch: {...this.state.addNewPitch, id: highestId + 1}
            }, () => {this.sortPitchesByName()}
            )   
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

        this.setState({
            savedPitches: newState
        },
        () => {
            (() => {this.sortPitchesByName()}) ();
            (() => window.localStorage.setItem('pitches', JSON.stringify(this.state.savedPitches), () => {console.log('message saved')})) ()
        }
        )
    }

    updateNewPitch(e){
        this.setState(
            {
                addNewPitch: {...this.state.addNewPitch, [e.target.name]: e.target.value}
            }
            )
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

    toggleNewPitchForm(e){
        this.setState({addNewPitchForm: !this.state.addNewPitchForm})
    }


    render() {
        return(
            <div>
                <AppBar title="Options" showMenuIconButton={false} zDepth={2} iconElementRight={<Logout logout={this.signOut} />}/>
                <br/>
                <ShortCuts updateShortCuts = {this.updateShortCuts} shortCuts={this.state.savedShortCuts} />
                <NewPitch
                    handleOpen={this.dialogBoxOpen} 
                    handleClose={this.dialogBoxClose} 
                    handleSave={this.dialogBoxSave} 
                    state={this.state.dialogBox} 
                    currentValue = {this.state.addNewPitch}
                    updateNewPitch = {this.updateNewPitch}
                />
                <ViewHeaders
                    state= {this.state}
                    deletePitch = {this.deletePitch}
                    handleSave={this.dialogBoxSave}
                    toggleEdit = {this.toggleEdit}
                    closeEditPitch = {this.closeEditPitch}
                    sortedPitches={this.state.pitchesSortedByName}
                    updatePitchBeingEdited = {this.updatePitchBeingEdited}
                    savePitchBeingEdited = {this.savePitchBeingEdited}
                    pitches={this.state.savedPitches} 
                    pitchKeys={this.state.pitchNameKeys} 
                />

                
                
                <Buttons sortedPitches={this.state.pitchesSortedByName} updateListOfPitchNames = {this.sortPitchesByName} currentState={this.state} />
                {/*<ListNames sortedPitches={this.state.pitchesSortedByName} updateListOfPitchNames={this.sortPitchesByName} />*/}
                <a style={buttonSpacing} href="#" onClick={this.loadAuth}>load auth</a>
                <a style={buttonSpacing} href="#" onClick={this.signOut}>Sign out</a>

            </div>
        )
    }
}

export default Form;
