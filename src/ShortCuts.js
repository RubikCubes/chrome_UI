import React from 'react';

export function SendInmailShortCut(props) {
    return (
        <div className='input-group pitch-width'>
            <span className="input-group-addon" id="basic-addon1">Send Inmail Shortcut</span>
            <input name= "sendInmailShortCut" value={props.currentState} onChange={props.updateState} type="text" className="form-control" placeholder="Send Inmail shortcut" aria-describedby="basic-addon1" />
        </div>
    )
}

export function AdvanceProfile(props) {
    return (
        <div className='input-group pitch-width'>
            <span className="input-group-addon" id="basic-addon1">Advance Profile Shortcut</span>
            <input name= "advanceProfileShortcut" value={props.currentState} onChange={props.updateState} type="text" className="form-control" placeholder="Advance Profile Shortcut" aria-describedby="basic-addon1" />
        </div>
    )
}