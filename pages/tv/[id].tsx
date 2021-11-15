import { Container, Grid } from '@mui/material';
import type { GetServerSideProps, NextPage } from 'next';
import type { ITv } from '../../types/tvs/Tv';
import styles from '../../styles/Tv.module.css';
const Tv: NextPage = ({ data }: any) => {
    const tv: ITv = data;
    console.log(data);
    return(
        <Container>
            <Grid container>
                <section className={styles.tvInfo}>
                    <Grid item md={7}>
                        <div className={styles.poster}>
                            <img src={tv.baseUrl + tv.resDetail.poster_path} alt={tv.resDetail.name} className={styles.poster}/>
                        </div>
                    </Grid>
                    <Grid item md={5}>
                        <div className={styles.descriptionBox}>
                            <section className={styles.description}>
                                <h3>{tv.resDetail.name}</h3>
                            </section>
                        </div>
                    </Grid>
                </section>
            </Grid>
        </Container>
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