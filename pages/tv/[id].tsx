import { Container, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { GetServerSideProps, NextPage } from 'next';
import type { ITv, ICrew } from '../../types/tvs/Tv';
import styles from '../../styles/Tv.module.css';
import { io } from 'socket.io-client';
const Tv: NextPage = ({ data }: any) => {
    // const tv: ITv = data;
    const [tv, setTv] = useState<ITv>(data);
    const chatSocket = io("http://localhost:3001/chat")
    // const [crewSort, setCrewSort] = useState<ICrew[]>(tv.credits.crew);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<Array<string>>([]);
    console.log(data);
    // const PriorityArtistSort = (aCrew: ICrew, bCrew: ICrew) => {
    //     if (aCrew.department === "Sound") {
    //         return 0
    //     } else if (aCrew.department == "Sound") {
    //         return -1
    //     } else if (bCrew.department == "Sound") {
    //         return 1
    //     } else {
    //         return 0
    //     }
    // }

 
    // setCrewSort(crewSort.sort(PriorityArtistSort));
    // console.log(crewSort);

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
        setMessages((messages) => [...messages, data.message]);
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
            <div className={styles.tvInfoBox}>
                <section className={styles.tvInfo}>
                    <div className={styles.posterWrapper}>
                        <div className={styles.posterBox}>
                            <div className={styles.poster}>
                                <img src={tv.baseUrl + tv.resDetail.poster_path} alt={tv.resDetail.name} className={styles.poster}/>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptionWrapper}>
                        <div className={styles.descriptionBox}>
                            <section className={styles.description}>
                                <div className={styles.titleBox}>
                                    <h2 className={styles.title}>{tv.resDetail.name}</h2>
                                </div>
                                <div className={styles.genres}>
                                <Stack direction="row" spacing={1}>
                                    {tv.resDetail.genres.map(genre => (
                                        <Chip 
                                            label={genre.name}
                                            variant="outlined" 
                                            // onClick={() => console.log("test")} 
                                            key={genre.id}
                                        />
                                    ))}
                                </Stack>
                                </div>
                                <div className={styles.overviewBox}>
                                    <h3 className={styles.overviewHeader}>概要</h3>
                                    <p className={styles.p}>{tv.resDetail.overview}</p>
                                    
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
            <div className={styles.creditsBox}>
                <div className={styles.castsWrapper}>
                    <div className={styles.castsBox}>
                        <h3>出演者</h3>
                        <div >
                            <ul className={styles.casts}>
                                {tv.credits.cast.map(cast => (
                                    <li className={styles.card} key={cast.id}>
                                        <div className={styles.imageBox}>
                                            <img src={tv.baseUrl + cast.profile_path} 
                                                loading="lazy" 
                                                alt={cast.original_name} 
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.text}>
                                            <b>{cast.name}</b>
                                            <p className={styles.character}>{cast.character}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.crewWrapper}>
                    <div className={styles.crewBox}>
                        <h3>スタッフ</h3>
                        <div >
                            <ul className={styles.casts}>
                                {tv.credits.crew.map(crew => (
                                    <li className={styles.card} key={crew.id}>
                                        <div className={styles.imageBox}>
                                            <img src={tv.baseUrl + crew.profile_path} 
                                                loading="lazy" 
                                                alt={crew.original_name} 
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.text}>
                                            <p className={styles.character}>{crew.department}</p>
                                            <b>{crew.name}</b>
                                           
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button onClick={() => changeChatStatus()}>{isChatName}</button>
            </div>
            <section className={styles.chatWrapper}>
                <div className={styles.chatBox}>
                    <div className={styles.chat}>
                        <ul className={styles.messages}>
                            {messages.map((message, idx) => (
                                <li className={styles.messageBox} key={idx}>
                                    <div className={styles.message}>
                                        <div className={styles.iconBox}>
                                            <div className={styles.icon}>
                                            </div>
                                        </div>
                                        <div className={styles.textBox}>
                                            <p className={styles.text}>{message}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            
                        </ul>
                    </div>
                    <div className={styles.textForm}>
                        <textarea 
                            placeholder="コメントを投稿" 
                            className={styles.textField}
                            value={message}
                            onChange={(event) => changeMessage(event)}

                        />
                        <button className={styles.submitButton} onClick={() => submitMessage()}>送信</button>
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