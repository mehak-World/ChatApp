import React, { useEffect, useState } from 'react';
import styled from "styled-components"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetAvatar = () => {
  const navigate = useNavigate()
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const currentUser = localStorage.getItem("chat-app-user")

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };



  const handleSetAvatar = async () => {
    const user_id = JSON.parse(currentUser)._id;
    if (selectedAvatar !== null) { // Check for 'null' explicitly
      try {
        const response = await axios.post(
          `http://localhost:8080/auth/setAvatar/${user_id}`,
          { avatar_url: avatars[selectedAvatar] }
        );
  
        if (response.data.success) {
          navigate("/login");
        } else {
          toast.error("Failed to set avatar", toastOptions);
        }
      } catch (error) {
        console.error("Error setting avatar:", error);
        toast.error("Error setting avatar", toastOptions);
      }
    } else {
      toast.error("Please select the avatar first", toastOptions);
    }
  };
  
  // useEffect(() => {
  //   if (!localStorage.getItem("chat-app-user")){
  //       navigate("/login")
  //   }
    
  // })

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const random_num = Math.floor(Math.random() * 1000) + 1; // Ensure range is 1-1000
        const str = `https://api.multiavatar.com/${random_num}.svg`; // Ensure correct format and extension
        data.push(str);
      }
      setAvatars(data);
    };

    fetchAvatars();
  }, []);

  return (
    <>
 
    <AvatarContainer>
      {avatars.length > 0 ? (
        avatars.map((avatar, index) => (
          <img
          className = "avatar"
            key={index}
            src={avatar}
            style = {{border: selectedAvatar == index ? "white solid 3px": "none"}}
            alt="avatar"
            width="100px"
            height="100px"
            crossOrigin="anonymous" // Add CORS attribute
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop in case the fallback image also fails
              e.target.src = 'https://via.placeholder.com/100'; // Fallback image
            }}
            onClick = {() => setSelectedAvatar(index)}
          />
        ))
      ) : (
        <p>Loading avatars...</p>
      )}

<Avatarbutton onClick={handleSetAvatar}>
    Set the profile picture
  </Avatarbutton>  
    </AvatarContainer>
   <ToastContainer />

   
    </>
   
  );
};


const AvatarContainer = styled.div`
display:flex;
justify-content: center;
align-items: center;
 gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  color: white;

  image{

  }
`


const Avatarbutton = styled.button`
padding: 10px;
border-radius: 15px;
border: none;
&:hover {
      background-color: #4e0eff;
    }
`

export default SetAvatar;
