import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatContainer = ({ currentChat, socket }) => {
  const currentUser = JSON.parse(localStorage.getItem("chat-app-user"));
  const [allMessages, setAllMessages] = useState([]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("message-receive", (msg) => {
        setAllMessages((prevMessages) => [...prevMessages, msg]); // Append new message
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off("message-receive");
      }
    };
  });

  const sendMsg = async (msg) => {
    // Emit the message to the server via socket
    socket.current.emit("send-message", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    // Store the sent message locally
    setAllMessages((prevMessages) => [
      ...prevMessages,
      { sender: currentUser._id, message: msg },
    ]);

    // Send the message to the server to store in DB
    await axios.post("http://localhost:8080/send", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };

  const fetchMessages = async () => {
    if (currentChat) {
      const response = await axios.get(
        `http://localhost:8080/messages/${currentUser._id}/${currentChat._id}`
      );

      setAllMessages(response.data.all_messages); // Use unified state
    }
  };

  useEffect(() => {
    if (currentChat) {
      fetchMessages();
    }
  }, [currentChat]);

  

  return (
    <Container>
      {currentChat && (
        <div className="chat-wrapper">
          <div className="header">
            <div className="username">{currentChat?.username}</div>
            <div className="avatar">
              <img
                width="50px"
                src={
                  currentChat?.avatar
                    ? currentChat?.avatar
                    : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
                }
                alt="avatar"
              />
            </div>
          </div>

          {/* Messages container */}
          <div className="messages">
            {allMessages.map((msg, index) => {
              return (
                <div key={index} className={msg.sender === currentUser._id ? "sender" : "receiver"}>
                  {msg.message}
                </div>
              );
            })}
          </div>

          {/* Chat Input Component */}
          <ChatInput sendMsg={sendMsg} />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #0d0f1a;
  height: 85vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chat-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

  .header {
    color: white;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid #444;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    color: white;
  }

  .username {
    font-size: 1.2rem;
  }

  .messages {
    padding: 20px;
  }
  .avatar img {
    border-radius: 50%;
  }

  .sender {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
  }

  .receiver {
    display: flex;
  }
`;

export default ChatContainer;
