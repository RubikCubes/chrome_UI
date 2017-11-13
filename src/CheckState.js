import { Button } from 'react-bootstrap'
import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

// export default function CheckState(props){
//     function handleClick(e){
//         console.log(props.currentState)
//         // console.log(JSON.parse(window.localStorage.getItem("pitches")))
//     }
//     return(
//         <Button className='button-margin' bsStyle="primary" onClick={handleClick}>Click for state</Button>
//     )
// }

const style = {
  margin: 12,
};

export default function Buttons(props) {
    
    function checkState(e){
        console.log(props.currentState)
    }

    function updateListNames () {
        // console.log(props)
        props.updateListOfPitchNames()
    }

    return (
        <div>
            <RaisedButton style={style} label='Check State' onClick={checkState} /> 
            <RaisedButton style={style} label='Update List Names' onClick={updateListNames} /> 
        </div>
    )
}


// export function ListNames(props){
//     function handleClick(){
//         console.log('this ran')
//         props.updateListOfPitchNames()
//     }
//     return(
//         <Button className='button-margin' bsStyle="primary" onClick={handleClick}>Update List Names</Button>
//     )
// };