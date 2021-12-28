import React from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
import styles from '../../styles/chats.module.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ITv } from '../../types/tvs/Tv';

type Props = {
    tv: ITv;
}

export const Chats: React.FC<Props> = ({ tv }) => {
    const [isChat, setIsChat] = useState<boolean>(false);
    const [isChatName, setIsChatName] = useState<string>("start chat");

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Array<string>>([]);

    const chatSocket = io("http://localhost:3001/chat")

    const startChat = () => {
        setIsChat(true);
        setIsChatName("Close chat");
        chatSocket.emit("client_to_server_join", {room: tv.resDetail.id.toString()});
    }

    const closeChat = () => {
        setIsChat(false);
        setIsChatName("Start chat");
        chatSocket.close()
    }

    const changeChatStatus = () => {
        isChat ? closeChat(): startChat();
    }

    const changeMessage = (event: any) => {
        const value: string = event.target.value;
        setMessage(value);
    }

    const submitMessage = () => {
        setMessage(message.trim());
        chatSocket.emit("client_to_server", {message: message});
        setMessage("");
    }

    chatSocket.on("server_to_client", (data: {message: string}) => {
        console.log("AAA")
        setMessages((messages) => [data.message, ...messages]);
    });

    return (
        <div>
            <div>
                <button onClick={() => changeChatStatus()}>{isChatName}</button>
            </div>
            <section className={styles.chat_wrapper}>
                <div className={styles.chat_box}>
                    <div className={styles.textForm}>
                        <TextField 
                            id="standard-basic" 
                            label="Chat Message" 
                            variant="standard" 
                            className={styles.text_field}
                            value={message}
                            onChange={(event) => changeMessage(event)}

                        />
                        <Button 
                            variant="contained" 
                            color="success"
                            className={styles.submit_button} 
                            onClick={() => submitMessage()}
                        >コメント
                        </Button>
                    </div>
                    <div className={styles.chat}>
                        <ul className={styles.messages}>
                            {messages.map((message, idx)=> (
                                <li className={styles.message_box} key={idx}>
                                    <div className={styles.message}>
                                        <div className={styles.icon_box}>
                                            <div className={styles.icon}>
                                            </div>
                                        </div>
                                        <div className={styles.comment_box}>
                                            <p className={styles.comment}>{message}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            
                        </ul>
                    </div>
                    
                </div>
            </section>
        </div>
    )
}