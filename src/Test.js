/* global gapi */
/*global chrome*/

import React from 'react';

import loadScript from './loadScript'


class TestDiv extends React.Component{
    constructor(props) {
        super(props)
        this.loadScript = this.loadScript.bind(this)
        this.gapiLoad = this.gapiLoad.bind(this)

        this.state = {
            apiLoaded : false
        }
    }


    loadScript() {
        // loadScript("https://apis.google.com/js/platform.js")
        //     .then((script) => {
        //         this.gapiLoad()
        //         this.setState({
        //             apiLoaded: true
        //         })
        //     })
        chrome.runtime.sendMessage({method: 'getGapi'}, function(response) {
            console.log(response)
        })
        
    }

    gapiLoad() {
        window.gapi.load('auth2', () => {
            var auth2 = gapi.auth2.init({
                client_id: '817677528939-dss5sreclldv1inb26tb3tueac98d24r.apps.googleusercontent.com',
                scope: 'profile email',
            
            })
            .then((auth2) => {
                console.log(auth2.isSignedIn.get()) 
            })
        })
        
    }

    componentDidMount() {
        this.loadScript()
        // this.gapiLoad()
    }

    render() {
        return (
            <div>Test</div>
        )    
    }
    
}

export default TestDiv