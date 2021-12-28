import React from 'react';
import type { ITv, ICrew } from '../../types/tvs/Tv';
import Image from 'next/image';
import type { NextPage } from 'next';
import { Swiper, SwiperSlide } from "swiper/react";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import styles from '../../styles/Tvinfo.module.css';
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

type Props = {
    tv: ITv;
}

export const TvInfo: React.FC<Props> = ({ tv }) => {
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
                        <div className={styles.overview_box}>
                            <h3 className={styles.overview_header}>概要</h3>
                            <p className={styles.p}>{tv.resDetail.overview}</p>
                            
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}