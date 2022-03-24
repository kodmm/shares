import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSetRecoilState, useRecoilValue } from 'recoil'; 
import styles from '../../styles/chats.module.css';
import { Message } from '../atoms/message';
import TextField from '@mui/material/TextField';
import { getTvDetailState } from '../../recoil/selectors/tvSelector';
import { getChats } from '../../recoil/selectors/chatSelector';
import { tvChatState } from '../../recoil/atoms/tvChat';
import { IChatData, messageTypeKeys, IChatUser, IUser, IChat } from '../../types/chats/Chat';
import { getChatUserState } from '../../recoil/selectors/userSelector';
import { useRouter } from 'next/router';

export const Chats: React.FC = () => {
    const [isChat, setIsChat] = useState<boolean>(false);
    const [isChatName, setIsChatName] = useState<string>("start chat");

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Array<string>>([]);

    const chatSocket = io("http://localhost:3001/chat")

    const tvDetail = useRecoilValue(getTvDetailState);


    const startChat = () => {
        setIsChat(true);
        setIsChatName("Close chat");
        chatSocket.emit("client_to_server_join", {room: tvDetail?.id.toString()});
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