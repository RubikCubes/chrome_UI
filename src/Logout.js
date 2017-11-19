import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const buttonStyle = {
    backgroundColor: 'transparent',
    color: 'white'
  };


export default function Logout(props) {
    function handleClick() {
        props.logout()
    }
    return (
        <FlatButton onClick={handleClick} style={buttonStyle} label="Logout" />
    )
}