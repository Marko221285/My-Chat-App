import React from 'react';

export default function Messages ({messages, currentMember}) {
    
    const renderMessage = (message,index) => {
        
        const {member, text} = message;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe ? 'Messages-message' : 'Messages-message currentMember';

        return (
            <li key={index} className={className}>
                <span className='avatar' style={{backgroundColor: member.clientData.color}} />
                <div>
                    <div className='username'>{member.clientData.username}</div>
                    <div className='text'>{text}</div>
                </div>
            </li>
        )
    }

    return (
        <ul className='Messages-list'>
            {messages.map((m,i) => renderMessage(m,i))}
        </ul>
    );
}