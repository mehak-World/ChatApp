import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io"; // Add a send icon for better styling

const ChatInput = ({sendMsg}) => {
  const [showPicker, setShowPicker] = useState(false);
  let [message, setMessage] = useState('')

  const handleEmojiPickerhideShow = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = (emojiData, event) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji); // Access the correct emoji property
  };


  return (
    <InputContainer>
      <div className="input-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          <div className = "picker">
          {showPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
         
        </div>

        <input type="text" placeholder="Type your message here" value = {message} onChange = {(e) => setMessage(e.target.value) } />
        <button className="send-button" onClick = {() => sendMsg(message)}>
          <IoMdSend />
        </button>
      </div>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
  background-color: #1a1a2e;
  position: sticky; /* Sticks to the bottom */
  bottom: 0; /* Ensures it stays at the bottom */

  .input-container {
    display: flex;
    align-items: center;
    background-color: #2e2e3b;
    border-radius: 25px;
    padding: 5px 10px;
    gap: 10px;
  }

  .emoji {
    cursor: pointer;
    font-size: 1.5rem;
    color: #ffdd00;
  }

  input {
    flex: 1;
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 20px;
    background-color: #fff;
  }

  .send-button {
    background-color: #4ecca3;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
  }

  .send-button:hover {
    background-color: #45b495;
  }

  .picker{
  position: absolute;
  top:-440px;
  left:0
  }
`;

export default ChatInput;
