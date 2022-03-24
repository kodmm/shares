
import { useEffect } from 'react';
import type { GetStaticPaths, NextPage } from 'next';
import styles from '../../styles/Tv.module.css';
import { TvInfo, Casts, Crews, Backdrops, Chats } from '../../components/organisms/index';

import { useSetRecoilState } from 'recoil';
import { tvState } from '../../recoil/atoms/tvState';
import { getStreamingIsWatch } from '../../api/tv';
import { tvStreamingState } from '../../recoil/atoms/tvStreamingState';
import { watchState } from '../../recoil/atoms/watchState';
import { IStreamingIsWatchChat } from '../../types/tvs/Tv';
import { userState } from '../../recoil/atoms/userState';
import { Params } from '../../types/tvs/Params';
import { tvChatState } from '../../recoil/atoms/tvChat';
const Tv: NextPage = ({ data }: any) => {
    const setTv = useSetRecoilState(tvState);
    const setStreamingIsWatch = useSetRecoilState(tvStreamingState);
    const setWatch = useSetRecoilState(watchState);
    const setUser = useSetRecoilState(userState);
    const setChat = useSetRecoilState(tvChatState)
    const { resDetail } = data

    const effectFunc = async() => {
        setTv(data)
        const resData: IStreamingIsWatchChat | any = await getStreamingIsWatch(resDetail.id);
        setStreamingIsWatch(resData.data.streaming)
        setWatch(resData.data.watch)
        setUser(resData.data.user)
        setChat(resData.data.chat)

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
        paths: [{ params: { id: '95718'}}, { params: {id: '65143'}}, { params: { id: '21021'}}],
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({ params }: Params) => {
    const { id } = params

    const res: any = await fetch(`http://10.0.0.1:3001/api/v1/tv/${id}`, {
        method: 'GET'
        })
    const data = await res.json()

    return { props: data };
}

export default Tv;
