import React from 'react';

export default function Input ({onSendMessage}) {

    const [newText, setnewText] = React.useState('');

    const changeText = (e) => {
        setnewText(e.target.value);
    }

    const submitText = (e) => {
        e.preventDefault();
        onSendMessage(newText);
        setnewText('');
    }

    return (
        <div>
            <form onSubmit={submitText} >
                <input type='text'
                       value={newText}
                       onChange={changeText} />
                <input type='submit' 
                       value='Send' />
            </form>
        </div>
    )
}