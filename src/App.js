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


import SignIn2 from './LoginPage2'

import notoSansRegular from './Fonts'

import { Redirect } from 'react-router'

import $ from 'jquery'


const buttonSpacing = {
  margin: 12,
};

notoSansRegular()


class OptionsForm extends React.Component{
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
                addToGreenhouseShortCut: 'a t g', 
                sendInmailShortCut: '1 a', 
                advanceProfileShortCut: 'shift n p'
            },

            addNewPitchForm: false,
            pitchBeingEdited: '',
            editPitchIndex: '',
            lockUpdate: false,
            toggleInmailSwitch: false,
            // sendInmailShortCut: '',
            // advanceProfileShortcut: '',
            dialogBox: false,
            editPitch: false,
            pitchesSortedByGroup: {},
            pitchGroupKeys: [],
            addToGreenhouse:'',
            redirect: false,
            gapiLoaded: false
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
        this.sortPitchesByGroup = this.sortPitchesByGroup.bind(this)
        this.updateShortCuts = this.updateShortCuts.bind(this)
        this.signOut = this.signOut.bind(this)
        this.checkUserData = this.checkUserData.bind(this)
        this.addToGreenhouse = this.addToGreenhouse.bind(this)
    }

    addToGreenhouse(){
        var googleAuth = gapi.auth2.getAuthInstance()
        var currentUser = googleAuth.currentUser.get()
        var currentEmail = currentUser.getBasicProfile().getEmail()

        var token = currentUser.getAuthResponse().id_token

        // console.log(currentEmail)s
        
        
        $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:5000/atg2',
                // Always include an `X-Requested-With` header in every AJAX request,
                // to protect against CSRF attacks.
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                contentType: 'application/json',
                success: function(result) {
                    // Handle or verify the server response.
                },
                processData: false,
                data: JSON.stringify(token)
            });
    }

    
    checkUserData() {
        var googleAuth = gapi.auth2.getAuthInstance()
        console.log( "signed in: " + googleAuth.isSignedIn.get())
        var user = googleAuth.currentUser.get()
        console.log(user)
    }

    sortPitchesByGroup() {
        var keys = []

        var data = {}

        this.state.savedPitches.map((pitch, index) => {
            // console.log(pitch)
            if (keys.indexOf(pitch.groupName) != -1) {
                data[pitch.groupName].push(pitch)
            } else {
                keys.push(pitch.groupName)
                data[pitch.groupName] = [pitch]
            }
        })

        // console.log(keys)
        // console.log(data)

        this.setState({
            pitchesSortedByGroup: data,
            pitchGroupKeys: keys
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
            (() => {this.sortPitchesByGroup()}) ();
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
            (() => {this.sortPitchesByGroup()}) ();
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
        var x = gapi.auth2.getAuthInstance()
        x.signOut()
            .then((signOut) => {
                console.log(x.isSignedIn.get())
                console.log('signed out')
                this.props.updateLoggedIn()
                }
            )
        
        
        

    }


    componentDidMount() {    
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
            }, () => {this.sortPitchesByGroup()}
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
            (() => {this.sortPitchesByGroup()}) ();
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
                    sortedPitches={this.state.pitchesSortedByGroup}
                    updatePitchBeingEdited = {this.updatePitchBeingEdited}
                    savePitchBeingEdited = {this.savePitchBeingEdited}
                    pitches={this.state.savedPitches} 
                    pitchKeys={this.state.pitchGroupKeys} 
                />

                
                
                {/*<Buttons sortedPitches={this.state.pitchesSortedByGroup} updateListOfPitchNames = {this.sortPitchesByGroup} currentState={this.state} />*/}
                {/*<ListNames sortedPitches={this.state.pitchesSortedByGroup} updateListOfPitchNames={this.sortPitchesByGroup} />*/}
                {/*<button style={buttonSpacing} onClick={this.checkUserData}>User Data</button>*/}
                {/*<a style={buttonSpacing} onClick={this.addToGreenhouse}> Add To Greenhouse </a>*/}

            </div>
        )
    }
}

class OptionsPage extends React.Component{

    constructor(props){
        super(props);
        this.updateRedirect = this.updateRedirect.bind(this)
        this.state = {
            isSignedIn: false,
            loaded: false,
            gapiLoaded: false,
            redirect: false,
            gapiLoaded2: true,
            test: false,
        }
        // this.loadGapi = this.loadGapi.bind(this)
        this.signIn = this.signIn.bind(this)
    }

    updateRedirect() {
        console.log('redirect run')
        this.setState({
            redirect: true
        })
    }

    componentDidMount() {
        console.log('loading gapi')
        gapi.load('auth2', () => {
            var auth2 = gapi.auth2.init({
                client_id: '817677528939-dss5sreclldv1inb26tb3tueac98d24r.apps.googleusercontent.com',
                scope: 'profile email',
            })
            .then((auth2) => {
                this.setState({
                    gapiLoaded:true,
                    isSignedIn: auth2.isSignedIn.get()
                })
                // var signedIn = auth2.isSignedIn.get()
            });
        });
    }


    signIn(){
        
        var signedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
        

        if (signedIn) {
            console.log('signed in?')
            this.setState({
                isSignedIn: true,
                gapiLoaded: true
            })
        } else {
            console.log('not signed in')
            this.setState({
                gapiLoaded: true
            },
            () => {console.log('state set')}
            )
        }
    }

    render() {
        // if (this.state.test){
        //     this.signIn()
        // }
        if (!this.state.gapiLoaded){
            console.log('this ran ')
            return null
        }

        console.log(this.state.isSignedIn)
        console.log(this.state.redirect)

        if (this.state.redirect) {
            console.log('redirect')
            return(
                <Redirect to="/login" />
            )
        }

        return (
            this.state.isSignedIn ?
            <OptionsForm updateLoggedIn = {this.updateRedirect} /> : <Redirect to='/login' />
        )
    }    
}


export default OptionsPage;
