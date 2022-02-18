
import { useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import type { ITv, ICrew } from '../../types/tvs/Tv';
import styles from '../../styles/Tv.module.css';
import { TvInfo } from '../../components/organisms/tvinfo';
import { Casts } from '../../components/organisms/casts';
import { Crews } from '../../components/organisms/crews';
import { Backdrops } from '../../components/organisms/backdrops';
import { Chats } from '../../components/organisms/chats';


const Tv: NextPage = ({ data }: any) => {
    // const tv: ITv = data;
    const [tv, setTv] = useState<ITv>(data);
    // const [crewSort, setCrewSort] = useState<ICrew[]>(tv.credits.crew);

    return(
        <div>
            <section className={styles.tvinfo_box}>
                <TvInfo tv={tv} />
            </section>
            <section className={styles.credits_box}>
                <div className={styles.castsWrapper}>
                    <Casts tv={tv} />
                </div>
                <div className={styles.spacer_min} />
                <div className={styles.crews_wrapper}>
                    <Crews tv={tv} />
                </div>
            </section>
            <section className={styles.backdrops_wrap}>
                <Backdrops tv={tv} />
            </section>
            
            <Chats tv={tv} />
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
