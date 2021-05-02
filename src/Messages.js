import React from 'react';

export default function Messages ({messages}) {
    
    const renderMessage = (message,index) => {
        const {member, text} = message;

        return (
            <li key={index}>
                <span style={{backgroundColor: member.clientData.color}} />
                <div>
                    <div>{member.clientData.username}</div>
                    <div>{text}</div>
                </div>
            </li>
        )
    }

    return (
        <ul>
            {messages.map((m,i) => renderMessage(m,i))}
        </ul>
    );
}