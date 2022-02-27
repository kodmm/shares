import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import styles from '../../styles/Tvinfo.module.css';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"


import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getTvDetailState, getTvImgBaseUrl, getTvStreamingState, getTvCastState } from '../../recoil/selectors/tvSelector';
SwiperCore.use([Pagination, Navigation]);

import { isWatchState } from '../../recoil/atoms/watchState';
import { addWatch, destroyWatch } from '../../functions/watch';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
export const TvInfo: React.FC = () => {
    const tvDetail = useRecoilValue(getTvDetailState);
    const tvCasts = useRecoilValue(getTvCastState);
    const tvStreaming = useRecoilValue(getTvStreamingState);
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);
    const setIsWatchState = useSetRecoilState(isWatchState);
    const isWatch = useRecoilValue(isWatchState)

    const onClickAddWatch = async() => {
        const watch: any = addWatch(tvDetail, tvCasts);
        setIsWatchState(true)
    }

    const onClickDestroyWatch = async() => {
        const watch: any = destroyWatch(Number(tvDetail.id));
        setIsWatchState(false)
    }

    const watchButton = () => {
        
        if (isWatch) {
            return (
                <button onClick={onClickDestroyWatch}>
                    <PlaylistRemoveIcon />
                </button>
            )
        }else if (isWatch === false) {
            return (
                <button onClick={onClickAddWatch}>
                    <PlaylistAddIcon />
                </button>
            )
        } else {
            return null
        }
    }


    const getFlatrate = () => {
        const isFlatrate: boolean | undefined = tvStreaming?.hasOwnProperty('flatrate')
        if (isFlatrate) {
            return (
                <ul className={styles.streaming_box}>
                    {tvStreaming?.flatrate.map(service => (
                        <li 
                            className={styles.streaming}
                            key={service.provider_name}
                        >
                            <Image
                            src={tvImgBaseUrl + service.logo_path}
                            className={styles.provider_img}
                            width={50}
                            height={50}
                            />
                        </li>
                        
                    ))}
                </ul>
            )
        }
    }

    const getRent = () => {
        const isRent: boolean | undefined = tvStreaming?.hasOwnProperty('rent')
        if(isRent) {
            return(
                <ul className={styles.streaming_box}>
                    {tvStreaming?.rent.map(service => (
                        <li 
                            className={styles.streaming}
                            key={service.provider_name}
                        >
                            <Image 
                                src={tvImgBaseUrl + service.logo_path}
                                className={styles.provider_img}
                                width={50}
                                height={50}
                            />

                        </li>
                    ))}
                </ul>
            )
        }
    }

    const getBuy = () => {
        const isBuy: boolean | undefined = tvStreaming?.hasOwnProperty('buy')
        if(isBuy) {
            return(
                <ul className={styles.streaming_box}>
                    {tvStreaming?.buy.map(service => (
                        <li 
                            className={styles.streaming}
                            key={service.provider_name}
                        >
                            <Image 
                                src={tvImgBaseUrl + service.logo_path}
                                className={styles.provider_img}
                                width={50}
                                height={50}
                            />

                        </li>
                    ))}
                </ul>
            )
        }
    }


    return (
        <section className={styles.tv_info}>
            <div className={styles.poster_wrapper}>
                <div className={styles.poster_box}>
                    <div className={styles.poster}>
                        <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{
                            "clickable": true }} navigation={true}>
                                {tvDetail?.images.posters.map((image, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Image 
                                            src={tvImgBaseUrl + image.file_path} 
                                            alt={tvDetail?.name} 
                                            className={styles.poster}
                                        
                                            width={300}
                                            height={450}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
            </div>
            <div className={styles.description_wrapper}>
                <div className={styles.description_box}>
                    <section className={styles.description}>
                        <div className={styles.title_box}>
                            <h2 className={styles.title}>{tvDetail?.name}</h2>
                        </div>
                        <div className={styles.genres}>
                            <Stack direction="row" spacing={1}>
                                {tvDetail?.genres.map(genre => (
                                    <Chip 
                                        label={genre.name}
                                        variant="outlined" 
                                        // onClick={() => console.log("test")} 
                                        key={genre.id}
                                    />
                                ))}
                            </Stack>
                        </div>
                        <div className={styles.streaming_wrapper}>
                            <h3 className={styles.streaming_header}>ストリーミングサービス</h3>      
                            {tvStreaming?
                                    <div className={styles.streaming_package}>
                                        <div className={styles.flatrate}>
                                            <h4 className={styles.streaming_title}>サブスクリプション</h4>
                                            {getFlatrate()}
                                        </div>
                                        <div className={styles.rent}>
                                            <h4 className={styles.streaming_title}>レンタル</h4>
                                            {getRent()}
                                        </div>
                                        <div className={styles.buy}>
                                            <h4 className={styles.streaming_title}>購入</h4>
                                            {getBuy()}
                                        </div>
                                    </div>
                            :
                                <p className={styles.no_streaming}>現在、視聴できるストリーミングサービスはありません。</p>
                            }       
                        </div>

                        <div className={styles.overview_box}>
                            <h3 className={styles.overview_header}>概要</h3>
                            <p>{tvDetail?.overview}</p>
                            
                        </div>
                        <div>
                            {watchButton()}
                            
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}