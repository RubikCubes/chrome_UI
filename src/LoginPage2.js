/* global gapi */

import React from 'react';

import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar';
import $ from 'jquery'


class SignIn2 extends React.Component{
    constructor(props) {
        super(props)
        this.handleSignIn = this.handleSignIn.bind(this)
        this.signInCallback = this.signInCallback.bind(this)
    }
    componentDidMount() {
        gapi.signin2.render('my-signin2', {
            'scope': 'profile email',
            'width': 300,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': this.onSignIn,
        });
    }

    signInCallback(authResult) {
        console.log('this worked')
        if (authResult['code']) {

            // Hide the sign-in button now that the user is authorized, for example:
            // $('#signinButton').attr('style', 'display: none');
            console.log(authResult['code'])
            // Send the code to the server
            // $.ajax({
            //     type: 'POST',
            //     url: 'http://example.com/storeauthcode',
            //     // Always include an `X-Requested-With` header in every AJAX request,
            //     // to protect against CSRF attacks.
            //     headers: {
            //         'X-Requested-With': 'XMLHttpRequest'
            //     },
            //     contentType: 'application/octet-stream; charset=utf-8',
            //     success: function(result) {
            //         // Handle or verify the server response.
            //     },
            //     processData: false,
            //     data: authResult['code']
            // });
        } else {
            // There was an error.
        }
    }

    handleSignIn() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '817677528939-dss5sreclldv1inb26tb3tueac98d24r'
            }).then((auth2) => {
                var authResult = auth2.grantOfflineAccess().then(this.signInCallback)
            })
        })
    }

    render() {
        return(
            <div>
                <AppBar className='appBar' title="Pliny" showMenuIconButton={false} zDepth={2} />
                <div id="my-signin2" onClick = {this.handleSignIn}></div>
            </div>
        )
    }
}

export default SignIn2

// <button  id="signinButton">Sign in with Google</button>