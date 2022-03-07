import React from 'react';
import Image from 'next/image';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import styles from '../../styles/Tvinfo.module.css';
import { BigWatchButton, StreamingServices } from '../molecules/index';
import { getTvDetailState, getTvImgBaseUrl } from '../../recoil/selectors/tvSelector';
import { IconLabelKeys, copyState } from '../../recoil/atoms/copyState';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination, Navigation } from 'swiper';
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

SwiperCore.use([Pagination, Navigation]);


export const TvInfo: React.FC = () => {
    const tvDetail = useRecoilValue(getTvDetailState);
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);
    const [copy, setCopy] = useRecoilState(copyState);
    const resetCopy = useResetRecoilState(copyState);
    const onClickCopyButton = () => {
        navigator.clipboard.writeText(tvDetail.name)
        setCopy({
            iconLabel: IconLabelKeys.COPIED,
        })

        setTimeout(resetCopy,1500);
    }

    return (
        <section className={styles.tv_info}>
            <div className={styles.poster_wrapper}>
                <div className={styles.poster_box}>
                    <div className={styles.poster}>
                        <Swiper slidesPerView={1} spaceBetween={30} loop={true} pagination={{
                            "clickable": true }} navigation={true}>
                                {tvDetail.images.posters.map((image, idx) => (
                                    <SwiperSlide key={idx}>
                                        <Image 
                                            src={tvImgBaseUrl + image.file_path} 
                                            alt={tvDetail.name} 
                                            className={styles.poster}
                                        
                                            width={300}
                                            height={450}
                                        />
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    </div>
                </div>
                <BigWatchButton />
            </div>
            <div className={styles.description_wrapper}>
                <div className={styles.description_box}>
                    <section className={styles.description}>
                        <div className={styles.title_box}>
                            <h2 className={styles.title}>{tvDetail.name}</h2>
                            <div className={styles.copybutton_box}>
                                <ContentCopyIcon className={styles.copyicon} onClick = {onClickCopyButton} />
                                <p className={styles.iconlabel}>{copy.iconLabel}</p>
                            </div>
                            
                        </div>
                        <div className={styles.genres}>
                            <Stack direction="row" spacing={1}>
                                {tvDetail.genres.map(genre => (
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
                            <StreamingServices />
                        </div>

                        <div className={styles.overview_box}>
                            <h3 className={styles.overview_header}>概要</h3>
                            <p>{tvDetail.overview}</p>
                            
                        </div>
                    </section>
                </div>
            </div>
        </section>
    )
}