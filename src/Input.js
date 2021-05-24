import React from 'react';

export default function Input ({onSendMessage}) {

    const [newText, setnewText] = React.useState('');

    const changeText = (e) => {
        setnewText(e.target.value);
    }

    const submitText = (e) => {
        e.preventDefault();
        if(newText.trim() === '') {
            return;
        }
        onSendMessage(newText);
        setnewText('');
    }

    return (
        <div>
            <form onSubmit={submitText} >
                <input type='text'
                       value={newText}
                       onChange={changeText}
                       autoFocus={true} />
                <button>Send</button>
            </form>
        </div>
    )
}