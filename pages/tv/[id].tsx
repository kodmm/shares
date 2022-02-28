
import { useEffect } from 'react';
import type { GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/Tv.module.css';
import { TvInfo, Casts, Crews, Backdrops, Chats } from '../../components/organisms/index';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tvState } from '../../recoil/atoms/tvState';
import { getStreamingIsWatch } from '../../api/tv';
import { getTvDetailState } from '../../recoil/selectors/tvSelector';
import { tvStreamingState } from '../../recoil/atoms/tvStreamingState';
import { isWatchState } from '../../recoil/atoms/watchState';
import { IStreamingIsWatch, ITv } from '../../types/tvs/Tv';
import { Params } from '../../types/tvs/Params';
const Tv: NextPage = ({ data }: any) => {
    const router = useRouter();
    const tv = useRecoilValue(getTvDetailState);
    const setTv = useSetRecoilState(tvState);
    const setStreamingIsWatch = useSetRecoilState(tvStreamingState);
    const setIsWatchState = useSetRecoilState(isWatchState)

    const { resDetail } = data

    const effectFunc = async() => {
        setTv(data)
        const resData: IStreamingIsWatch | any = await getStreamingIsWatch(resDetail.id);
        setStreamingIsWatch(resData.data.streaming)
        setIsWatchState(resData.data.isWatch)

    }
    useEffect(() => {
        effectFunc()
    },[])

    return(
        <div>
            <section className={styles.tvinfo_box}>
                <TvInfo />
            </section>
            <section className={styles.credits_box}>
                <div className={styles.castsWrapper}>
                    <Casts />
                </div>
                <div className={styles.spacer_min} />
                <div className={styles.crews_wrapper}>
                    <Crews />
                </div>
            </section>
            <section className={styles.backdrops_wrap}>
                <Backdrops />
            </section>
            
            <Chats />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async() => {
    return {
        paths: [{ params: { id: '95718'}}, { params: {id: '65143'}} ],
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({ params }: Params) => {
    const { id } = params

    const res: any = await fetch(`http://10.0.0.1:3001/api/v1/tv/${id}`, {
        method: 'GET'
        })
    const data = await res.json()
    
    console.log(data)

    return { props: data };
}

export default Tv;
