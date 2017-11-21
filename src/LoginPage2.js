/* global gapi */

import React from 'react';

import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar';
import $ from 'jquery'


class Login extends React.Component{
    constructor(props) {
        super(props)
        this.handleSignIn = this.handleSignIn.bind(this)
        this.signInCallback = this.signInCallback.bind(this)
    }

    // componentDidMount() {
    //     gapi.signin2.render('my-signin2', {
    //         'scope': 'profile email',
    //         'width': 300,
    //         'height': 50,
    //         'longtitle': true,
    //         'theme': 'dark',
    //     });
    // }

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

    handleSignIn() {
        var x = gapi.auth2.getAuthInstance().grantOfflineAccess()
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
            loaded: false
        }
    }

    updateRedirect() {
        this.setState({
            redirect: true
        })
    }

    componentDidMount() {
        gapi.load('auth2', () => {
            gapi.auth2.init({
                client_id: '817677528939-dss5sreclldv1inb26tb3tueac98d24r'
            }).then((auth2) => {
                console.log( "signed in: " + auth2.isSignedIn.get())
                this.setState({
                    redirect: auth2.isSignedIn.get(),
                    loaded: true
                }, () => {console.log('this finished')})
            })
        })
    }

    render() {
        if (!this.state.loaded){
            console.log(this.state.loaded)
            return null
        }

        console.log(this.state.loaded)
        return (
            this.state.redirect ?
            <Redirect to='/options' /> : <Login updateRedirect = {this.updateRedirect} />
        )
    }    
}

export default SignIn2

// <div id="my-signin2" onClick = {this.handleSignIn}></div>

