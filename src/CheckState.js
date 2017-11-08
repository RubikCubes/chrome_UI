import { Button } from 'react-bootstrap'
import React from 'react';

export default function CheckState(props){
    function handleClick(e){
        console.log(props.currentState)
        console.log(JSON.parse(window.localStorage.getItem("pitches")))
    }
    return(
        <Button className='button-margin' bsStyle="primary" onClick={handleClick}>Click for state</Button>
    )
}