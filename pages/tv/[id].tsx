import { Container, Grid } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import type { GetServerSideProps, NextPage } from 'next';
import type { ITv, ICrew } from '../../types/tvs/Tv';
import styles from '../../styles/Tv.module.css';
const Tv: NextPage = ({ data }: any) => {
    const tv: ITv = data;
    // const [crewSort, setCrewSort] = useState<ICrew[]>(tv.credits.crew);
    
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