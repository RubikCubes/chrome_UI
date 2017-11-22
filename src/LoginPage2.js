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

    signInCallback(authResult) {
        console.log('this worked')
        console.log(authResult['code'])
        if (authResult['code']) {
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
                data: JSON.stringify(authResult['code'])
            });
        } else {
            // There was an error.
        }
    }

    handleSignIn(props) {
        // var x = gapi.auth2.getAuthInstance().grantOfflineAccess()
        var GoogleAuth = gapi.auth2.getAuthInstance()
        GoogleAuth.signIn({scope:'profile email'})
        .then((response) => {
            var googleUser = GoogleAuth.currentUser.get()
            var token = googleUser.getAuthResponse().id_token
            console.log(token)
            // var auth_code = response.code
            console.log(response)
            console.log('updating redirect')
            var signedIn = gapi.auth2.getAuthInstance().isSignedIn.get()
            console.log('Is a user signed in?: '+signedIn)
            this.props.updateRedirect()
        })
        
    }

    render() {
        return(
            <div>
                <AppBar className='appBar' title="Pliny" showMenuIconButton={false} zDepth={2} />
                <button  id="signinButton" onClick={this.handleSignIn} >Sign in with Google</button>
                
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

    }

    updateRedirect() {
        this.setState({
            redirect: true
        })
    }

    componentDidMount() {
        console.log('component did mount')
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

