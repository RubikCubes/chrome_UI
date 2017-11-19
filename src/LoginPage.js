/* global gapi */

import React from 'react';

import { Redirect } from 'react-router';
import AppBar from 'material-ui/AppBar';


class LogIn extends React.Component{
    constructor(props){
        super(props)
        this.onSignIn = this.onSignIn.bind(this)
        
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

    onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        {this.props.updateRedirect()}
    }

    render() {
        return(
            <div className='container'>
                <AppBar className='appBar' title="Pliny" showMenuIconButton={false} zDepth={2} />
                <div id="my-signin2"></div>
            </div>
        )
    }
}

class SignIn extends React.Component{

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
        console.log('rendering')
        
        if (!this.state.loaded){
            console.log(this.state.loaded)
            return null
        }

        console.log(this.state.loaded)
        return (
            this.state.redirect ?
            <Redirect to='/options' /> : <LogIn updateRedirect = {this.updateRedirect} />
        )
    }    
}

export default SignIn
