/* global gapi */

import React from 'react';

import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar';
import $ from 'jquery'

import loadScript from './loadScript'

class Login extends React.Component{
    constructor(props) {
        super(props)
        this.handleSignIn = this.handleSignIn.bind(this)
        this.signInCallback = this.signInCallback.bind(this)
    }

    signInCallback(token) {
        if (token) {
            // Hide the sign-in button now that the user is authorized, for example:
            // $('#signinButton').attr('style', 'display: none');
            // Send the code to the server
            $.ajax({
                type: 'POST',
                url: 'http://127.0.0.1:5000/',
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
        } else {
            // There was an error.
        }
    }

    handleSignIn(props) {
        var GoogleAuth = gapi.auth2.getAuthInstance()
        GoogleAuth.signIn({scope:'profile email'})
        .then((response) => {            
            // console.log('updating redirect')
            this.props.updateRedirect()
        })
    }

    componentDidMount() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
        });
    }

    render() {
        return(
            <div>
                <AppBar className='appBar' title="Pliny" showMenuIconButton={false} zDepth={2} />
                <div id="my-signin2" onClick={this.handleSignIn} data-width="300" data-height="200" data-longtitle="true"></div>
            </div>
        )
    }
}

class SignIn2 extends React.Component{

    constructor(props){
        super(props);
        this.updateRedirect = this.updateRedirect.bind(this)
        this.state = {
            redirect: false,
            loaded: false,
            gapiLoaded: false,
            apiLoaded: false,
        }
        // this.loadMapScript = this.loadMapScript.bind(this)

    }

    updateRedirect() {
        this.setState({
            redirect: true
        })
    }

    // loadMapScript() {
    // // Load the google maps api script when the component is mounted.

    //     loadScript("https://apis.google.com/js/platform.js")
    //         .then((script) => {
    //         // Grab the script object in case it is ever needed.
    //             this.mapScript = script;
    //             this.setState({ apiLoaded: true });
    //         })
    //         .catch((err: Error) => {
    //             console.error(err.message);
    //         });
    // }


    componentDidMount() {
        console.log('component did mount')

        // this.loadMapScript()

        gapi.load('auth2', () => {
            var auth2 = gapi.auth2.init({
                client_id: '817677528939-dss5sreclldv1inb26tb3tueac98d24r.apps.googleusercontent.com',
                scope: 'profile email',
            
            })
            .then((auth2) => {
                if (auth2.isSignedIn.get()) {
                    this.setState({
                        redirect:true,
                        gapiLoaded:true
                    })
                } else {
                    console.log( "signed in: " + auth2.isSignedIn.get())
                    this.setState({
                        gapiLoaded: true
                    },
                    () => {console.log('state set')})    
                }
                
            });
        });
    }

    render() {
        if (!this.state.gapiLoaded){
            return null    
        }

        console.log('redirect')
        console.log(this.state.redirect)

        return (
            this.state.redirect ?
            <Redirect to='/options' /> : <Login updateRedirect = {this.updateRedirect} />
        )
    }    
}

export default SignIn2

// <div id="my-signin2" onClick = {this.handleSignIn}></div>

