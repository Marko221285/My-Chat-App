import React from 'react';

export default function Input ({onSendMessage}) {

    const [newText, setnewText] = React.useState('');

    const changeText = (e) => {
        setnewText(e.target.value);
    }

    return (
        <div>
            <form>
                <input type='text'
                       value={newText}
                       onChange={changeText} />
                <input type='submit' 
                       value='Send' />
            </form>
        </div>
    )
}