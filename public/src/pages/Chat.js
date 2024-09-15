import React, {useEffect, useState, useRef} from 'react'
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import Contacts from '../components/Contacts'
import ChatContainer from '../components/ChatContainer'
import { io } from "socket.io-client";

const Chat = () => {

  const socket = useRef();

  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(null)
  const currentUser = localStorage.getItem("chat-app-user")
  const user = JSON.parse(currentUser)

  useEffect(() => {
    if(!currentUser){
      navigate("/login")
    }

   

  }, [])

  useEffect(() => {
    if (currentUser) {
      // Connect to the Socket.io server
      socket.current = io('http://localhost:8080'); // Ensure the URL matches the server's address

      // Emit an event to add the user to the server-side
      socket.current.emit('add-user', user._id);

      // Cleanup on component unmount
      return () => {
        socket.current.disconnect();
      };
    }
  }, [currentUser, user]);


  return (
    <div>
      <Container>
        <div className = "chats">
        <div className = "contacts">
<p style = {{textAlign: "center"}}>Contacts</p>
<Contacts setCurrentChat = {setCurrentChat} currentChat = {currentChat}/>
</div>

<ChatContainer currentChat = {currentChat} socket={socket}  />


        </div>
       
      </Container >
    </div>
  )
}

const Container = styled.div`

width: 100vw;
height: 100vh;
background-color: black;
display: flex;
justify-content: center;
align-items: center;

.chats{
height: 90vh;
width: 90vw;
background-color: #16192c;
display: grid;
grid-template-columns: 25% 75%;
color: white;
}
`

export default Chat
