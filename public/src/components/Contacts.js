import React, {useEffect, useState} from 'react'
import axios from "axios"
import styled from "styled-components"

const Contacts = ({currentChat, setCurrentChat}) => {
    const [contacts, setContacts] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("chat-app-user"));
    const contacts_api_route = "http://localhost:8080/auth/contacts/"+ currentUser?._id;

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await axios.get(contacts_api_route)
            setContacts(response.data.filtered_users)
        }

        fetchContacts()
    }, [])


  return (
    <div>
      <Contact>
            <div>
                {contacts && contacts.map((contact) => (
                    <div class = "contact" onClick = {() => setCurrentChat(contact)} >
                        <div class = "avatar" style = {{ border: currentChat == contact ? "white solid 4px": 'none', borderRadius: currentChat == contact ? "49%": '0'}}>
                            <img  width = "60px" height = "60px" src = {contact?.avatar ? contact?.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0TBg4PEBENEBAQDRARDw4QDg8NDQ0QFRUWFhYRFhMYHSggGBolJxUTJDEhJSkrLi8uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADcQAQACAAMFBAgEBgMAAAAAAAABAgMEEQUhMUFREmFxwTJicoGRobHhEyJS0TM0QpLw8SMkQ//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2tZmdIiZnpG+QeDqw9n40/06eMxDfGyb87V+EyCOEjOyb8rV+Ew04mzcaOUW8JjzByD29JidJiYnpMaPAAAAAAAAAAAAAAAAAAAAACOL2sTNoiI1meEdU1kMlFK9qd9+vKvdAObK7MmY1xN3qxx98pPCwq1rpWIiO5mAAAAAxxMOs10tETHfGqNzWy+eH/AGz5SlAFYtWYtMTumOMTyeJ7O5Ot69LRwt5Sg8Sk1vNZjSY4gxAAAAAAAAAAAAAAAABuyeD28xWvLjPhAJDZWV0p+JbjPo90dfeknkRuegAAAAAAAAOLaWV7WH2oj81Y+MdHaAq46to4HZzM6cLb47usOUAAAAAAAAAAAAAABK7Gw/y3t1nSPrPkik9syumSr36z85B1AAAAAAAAAAAA4Nr4euWi36bfKd37IZYs5XXKXj1Z+W9XQAAAAAAAAAAAAAAFg2f/ACdPZV9O7Ltrk690zHz+4OsAAAAAAAAAAAGvMfwL+zb6K2sOetpk7z6sx8dyvAAAAAAAAAAAAAAAJPYuLvtT3x5+SMbMvizXGraOU/GOYLIMaWiaxMb4mNYZAAAAAAAAAATII7bOLphVr1nWfCEQ353H7eYm3LhXwhoAAAAAAAAAAAAAAAABJbKzek/h24T6M9J6JZV0rkNoboped/K3Ke6QSYAAAAAAACN2rm9K/h14z6U9I6M8/n4rE1pvtznlX7oaZ3gAAAAAAAAAAAAAAAAAAM8LBta2lYmZ+UeMuvJ7OtbffWten9U/sl8LCrWmlYiIBpyWBemHpa3a6Ryr73SAAAAADTmsK1sLStprPXr3NwCuY+XvS2lo8J41n3tSzXpE1mJiJieU74Rec2ZMfmw9/q8/cCNCeIAAAAAAAAAAAAAD2tZm0RG+Z4R1ArWZtERvmeEJfI7Piulr6TblHGK/dsyOTildZ0m88Z6d0OwAAAAAAAAAAAAHHncjW8axpFuvKfFC4mHat5raNJhZnPm8rW9N+6Y4W6fYFfGeLh2riTW26YYAAAAAAAAAAAJnZuU7NO1b0pj+2Oni5NlZbtYvbnhXh32TQAAAAAAAAAAAAAAAAOXP5WL4frR6M+SCmJidJ3TG6Y6LOitrZb/0jwt5SCMAAAAAAAAIjfp1HXsvC7WbieVY7X7AmMthRXAivSN/fPOW0AAAAAAAAAAAAAAAAAGOJSJw5ieExpLIBWcXDmuJNZ4xOn3YpDbGFpjVt+qNJ8Y/z5I8AAAAAABLbFp/xWt1tp7o/wBolP7Pppk6d8a/HeDpAAAAAAAAAAAAAAAAAAABx7Vw9cpM/pmJ8vNBrJj01wbV61mFbAAAAAAAWXCrphVjpWI+St0j88eMfVZwAAAAAAAAAAAAAAAAAAAAFZxa6Yto6WmPmsyu52P+3ie1INIAAAAAMsH+NX2o+qzAAAAAAAAAAAAAAAAAAAAAAr2f/nL+15QANAAAAP/Z"} />
                        </div>

                        <div>
                            {contact?.username}
                        </div>
                    </div>
                ))}
            </div>

            <div class = "currentUser">
              <h3> You </h3>
            <div class = "current">
                        <div class = "avatar">
                            <img  width = "60px" height = "60px" src = {currentUser?.avatar ? currentUser?.avatar : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0TBg4PEBENEBAQDRARDw4QDg8NDQ0QFRUWFhYRFhMYHSggGBolJxUTJDEhJSkrLi8uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADcQAQACAAMFBAgEBgMAAAAAAAABAgMEEQUhMUFREmFxwTJicoGRobHhEyJS0TM0QpLw8SMkQ//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2tZmdIiZnpG+QeDqw9n40/06eMxDfGyb87V+EyCOEjOyb8rV+Ew04mzcaOUW8JjzByD29JidJiYnpMaPAAAAAAAAAAAAAAAAAAAAACOL2sTNoiI1meEdU1kMlFK9qd9+vKvdAObK7MmY1xN3qxx98pPCwq1rpWIiO5mAAAAAxxMOs10tETHfGqNzWy+eH/AGz5SlAFYtWYtMTumOMTyeJ7O5Ot69LRwt5Sg8Sk1vNZjSY4gxAAAAAAAAAAAAAAAABuyeD28xWvLjPhAJDZWV0p+JbjPo90dfeknkRuegAAAAAAAAOLaWV7WH2oj81Y+MdHaAq46to4HZzM6cLb47usOUAAAAAAAAAAAAAABK7Gw/y3t1nSPrPkik9syumSr36z85B1AAAAAAAAAAAA4Nr4euWi36bfKd37IZYs5XXKXj1Z+W9XQAAAAAAAAAAAAAAFg2f/ACdPZV9O7Ltrk690zHz+4OsAAAAAAAAAAAGvMfwL+zb6K2sOetpk7z6sx8dyvAAAAAAAAAAAAAAAJPYuLvtT3x5+SMbMvizXGraOU/GOYLIMaWiaxMb4mNYZAAAAAAAAAATII7bOLphVr1nWfCEQ353H7eYm3LhXwhoAAAAAAAAAAAAAAAABJbKzek/h24T6M9J6JZV0rkNoboped/K3Ke6QSYAAAAAAACN2rm9K/h14z6U9I6M8/n4rE1pvtznlX7oaZ3gAAAAAAAAAAAAAAAAAAM8LBta2lYmZ+UeMuvJ7OtbffWten9U/sl8LCrWmlYiIBpyWBemHpa3a6Ryr73SAAAAADTmsK1sLStprPXr3NwCuY+XvS2lo8J41n3tSzXpE1mJiJieU74Rec2ZMfmw9/q8/cCNCeIAAAAAAAAAAAAAD2tZm0RG+Z4R1ArWZtERvmeEJfI7Piulr6TblHGK/dsyOTildZ0m88Z6d0OwAAAAAAAAAAAAHHncjW8axpFuvKfFC4mHat5raNJhZnPm8rW9N+6Y4W6fYFfGeLh2riTW26YYAAAAAAAAAAAJnZuU7NO1b0pj+2Oni5NlZbtYvbnhXh32TQAAAAAAAAAAAAAAAAOXP5WL4frR6M+SCmJidJ3TG6Y6LOitrZb/0jwt5SCMAAAAAAAAIjfp1HXsvC7WbieVY7X7AmMthRXAivSN/fPOW0AAAAAAAAAAAAAAAAAGOJSJw5ieExpLIBWcXDmuJNZ4xOn3YpDbGFpjVt+qNJ8Y/z5I8AAAAAABLbFp/xWt1tp7o/wBolP7Pppk6d8a/HeDpAAAAAAAAAAAAAAAAAAABx7Vw9cpM/pmJ8vNBrJj01wbV61mFbAAAAAAAWXCrphVjpWI+St0j88eMfVZwAAAAAAAAAAAAAAAAAAAAFZxa6Yto6WmPmsyu52P+3ie1INIAAAAAMsH+NX2o+qzAAAAAAAAAAAAAAAAAAAAAAr2f/nL+15QANAAAAP/Z"} />
                        </div>

                        <div>
                            {currentUser?.username}
                        </div>
                    </div>

            </div>
      </Contact>
    </div>
  )
}

const Contact = styled.div`

height: 100vh;
position: relative;
overflow: auto;

.contact{
cursor: pointer;
display: flex;
align-items: center;
flex-direction : row;
margin: 15px;
gap: 13px
}

.currentUser{
position: absolute;
padding: 10px;
left:0;
width:90%;
background-color: black;
}

.current{
display: flex;
align-items: center;
gap: 40px;
}

`

export default Contacts
