import React, { createContext, useReducer, useEffect } from 'react'
import io from 'socket.io-client'

export const CTX = createContext();

const initState = {
    general : [
        {from: 'aaron', msg : 'hello'},
        {from: 'jeff', msg : 'hello'},
        {from: 'test', msg : 'hello'},
    ],
    topic2: [
        {from: 'keehan', msg : 'hello'},
        {from: 'leonard', msg : 'hello'},
        {from: 'weibin', msg : 'hello'},
    ]
}

function reducer(state, action) {
    const {from, msg, topic} = action.payload

    switch(action.type) {
        case 'RECEIVE_MESSAGE' :
            return {
                ...state,
                [topic] : [
                    ...state[topic],
                    {from, msg}
                ]
            }
        default:
            return state
    }
}

let socket

function sendChatAction(value) {
    socket.emit('chat message', value)
}

export default function Store(props) {

    const [allChats, dispatch] = useReducer(reducer, initState);
    useEffect(()=> {
        if(!socket) {
            socket = io(':3001');
    
            socket.on('chat message', function(msg) {
                dispatch(
                    {type: 'RECEIVE_MESSAGE', payload: msg}
                );
                // console.log({msg})
            })
        }    
    })
    
    const user = 'aaron' + Math.random(100).toFixed(2)
    
    // console.log(allChats)
    return (
        <CTX.Provider value={{allChats, sendChatAction, user}} >
            {props.children}
        </CTX.Provider>
    )
}