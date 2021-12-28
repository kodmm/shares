
import { useEffect, useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import type { GetServerSideProps, NextPage } from 'next';
import type { ITv, ICrew } from '../../types/tvs/Tv';
import styles from '../../styles/Tv.module.css';
import { io } from 'socket.io-client';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import Image from 'next/image';
import { TvInfo } from '../../components/organisms/tvinfo';
import { Casts } from '../../components/organisms/casts';
import { Crews } from '../../components/organisms/crews';
SwiperCore.use([Pagination, Navigation]);

const Tv: NextPage = ({ data }: any) => {
    // const tv: ITv = data;
    const [tv, setTv] = useState<ITv>(data);
    const chatSocket = io("http://localhost:3001/chat")
    // const [crewSort, setCrewSort] = useState<ICrew[]>(tv.credits.crew);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Array<string>>([]);

    console.log(data);

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
    console.log(messages);
    const [isChat, setIsChat] = useState<boolean>(false);
    const [isChatName, setIsChatName] = useState<string>("start chat");
    
    useEffect(() => {
        chatSocket.on("connect", () => {
            console.log("connetted client");
        });
        return () => {
            chatSocket.close();
        }
    },[]);
   



    return(
        <div>
            <div className={styles.tvinfo_box}>
                <TvInfo tv={tv} />
            </div>
            <div className={styles.credits_box}>
                <div className={styles.castsWrapper}>
                    <Casts tv={tv} />
                </div>
                <div className={styles.spacer_min} />
                <div className={styles.crews_wrapper}>
                    <Crews tv={tv} />
                </div>
            </div>
            <section className={styles.backdropsWrap}>
                <div className={styles.backdropsBox}>
                        <h3 className={styles.subtitle}>背景画像</h3>
                        <div className={styles.scrollBox}>
                            <ul className={styles.backdrops}>
                                {tv.resDetail.images.backdrops.map((image, idx) => (
                                    <li className={styles.backdropBox} key={idx}>
                                        <div className={styles.backdrop}>
                                            <Image 
                                                src={tv.baseUrl + image.file_path} 
                                                alt={tv.resDetail.name} 
                                                className={styles.poster}
                                                
                                                width={500}
                                                height={300}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                </div> 
            </section>
            
            <div>
                <button onClick={() => changeChatStatus()}>{isChatName}</button>
            </div>
            <section className={styles.chatWrapper}>
                <div className={styles.chatBox}>
                    <div className={styles.textForm}>
                        <TextField 
                            id="standard-basic" 
                            label="Chat Message" 
                            variant="standard" 
                            className={styles.textField}
                            value={message}
                            onChange={(event) => changeMessage(event)}

                        />
                        <Button 
                            variant="contained" 
                            color="success"
                            className={styles.submitButton} 
                            onClick={() => submitMessage()}
                        >コメント
                        </Button>
                    </div>
                    <div className={styles.chat}>
                        <ul className={styles.messages}>
                            {messages.map((message, idx)=> (
                                <li className={styles.messageBox} key={idx}>
                                    <div className={styles.message}>
                                        <div className={styles.iconBox}>
                                            <div className={styles.icon}>
                                            </div>
                                        </div>
                                        <div className={styles.commentBox}>
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
    );
}


export const getServerSideProps: GetServerSideProps = async context => {
    const params = context.params?.id as number | string;
    let data: any;
    await fetch(`http://10.0.0.1:3001/api/v1/tv/${params}`, {
        method: 'GET'
        })
        .then(response => data = response.json())
    
        .catch(error => {
            console.error('Error:', error);
        })
    return { props: data };
}

export default Tv;
