import React from 'react';
import type { ITv } from '../../types/tvs/Tv';
import Chip from '@mui/material/Chip';
import Image from 'next/image';


import Stack from '@mui/material/Stack';
import styles from '../../styles/Tvinfo.module.css';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

SwiperCore.use([Pagination, Navigation]);

type Props = {
    tv: ITv;
}

export const TvInfo: React.FC<Props> = ({ tv }) => {

    const getFlatrate = () => {
        const isFlatrate: boolean = tv.streaming.hasOwnProperty('flatrate')
        if (isFlatrate) {
            return (
                <ul className={styles.streaming_box}>
                    {tv.streaming.flatrate.map(service => (
                        <li 
                            className={styles.streaming}
                            key={service.provider_name}
                        >
                            <Image
                            src={tv.baseUrl + service.logo_path}
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
        const isRent: boolean = tv.streaming.hasOwnProperty('rent')
        if(isRent) {
            return(
                <ul className={styles.streaming_box}>
                    {tv.streaming.rent.map(service => (
                        <li 
                            className={styles.streaming}
                            key={service.provider_name}
                        >
                            <Image 
                                src={tv.baseUrl + service.logo_path}
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
        const isBuy: boolean = tv.streaming.hasOwnProperty('buy')
        if(isBuy) {
            return(
                <ul className={styles.streaming_box}>
                    {tv.streaming.rent.map(service => (
                        <li 
                            className={styles.streaming}
                            key={service.provider_name}
                        >
                            <Image 
                                src={tv.baseUrl + service.logo_path}
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
                                {tv.resDetail.images.posters.map((image, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Image 
                                            src={tv.baseUrl + image.file_path} 
                                            alt={tv.resDetail.name} 
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
                        <div className={styles.streaming_wrapper}>
                            <h3 className={styles.streaming_header}>ストリーミングサービス</h3>      
                            {"streaming" in tv?
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
                            <p>{tv.resDetail.overview}</p>
                            
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}