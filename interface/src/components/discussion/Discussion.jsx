import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'
import { Navbar } from "../home/navbar/Navbar";
import "./Discussion.css";

const socket = io('http://localhost:7000')
// const userName = 'User '+parseInt(Math.random()*10)
function Discussion() {
    const { user } = useSelector((state) => ({ ...state }));
    const userName = user.name
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    useEffect(() => {
        socket.on('message', payload => {
            setChat([...chat, payload])
        })
    })

    const handleChatInput = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log(message)
        socket.emit('message', { userName, message })
        setMessage('')
    };
    return (
        <div >
            <Navbar />
            <div >
            <h3 className=" text-3xl py-4 text-center font-bold text-indigo-500 animate-bounce">Welcome to Discussion panel</h3>
                <h1 className="text-center text-white">Now get connected to the world and know about anything</h1>
                {/* <span className="txt anim-text-flow">Now get connected to the world and know about anything</span> */}


                <div className=" dark:bg-gray-800 p-12 md:mx-20 lg:mx-40 mb-40">
                    <div className="dark:bg-gray-800 chat-box mt-40" style={{"background": "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%);"}}>
                        {chat.map((userChat, i) => (
                            <div key={i} className={`${userChat.userName === userName ? 'mr-0 ml-auto right' : 'left'}  my-3 w-fit shadow-lg p-4 rounded-lg`}>
                                <span className={`${userChat.userName === userName ? '  text-green-500' : 'text-orange-500'} rounded text-white font-extrabold`}>{userChat.userName}</span>
                                <p className="md:text-base text-white">{userChat.message}</p>
                                {/* <span className="text-sm text-gray-400">{userChat.time}</span> */}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="dark:bg-gray-800 fixed z-50 w-full bottom-0  p-2">
            <form className="flex flex-row justify-center md:w-1/2 md:m-auto" onSubmit={sendMessage}>
                <input required value={message} onChange={(e) => { setMessage(e.target.value) }} onKeyPress={(e) => { if (e.key === 'Enter') handleChatInput(e) }} className="border md:w-3/4 p-4 focus:outline-green-500" placeholder="Type in your message" />
                <button className="p-3 shadow-lg  rounded text-green-500" type="submit">Send</button>
            </form>
            </div>
        </div>

    );
}

export default Discussion;