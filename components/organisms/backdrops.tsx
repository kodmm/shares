import React from 'react';
import Image from 'next/image';
import styles from '../../styles/backdrops.module.css';
import { ITv } from '../../types/tvs/Tv';

type Props = {
    tv: ITv;
}

export const Backdrops: React.FC<Props> = ({ tv }) => {
    return (
        <div className={styles.backdrops_box}>
                <h3 className={styles.subtitle}>背景画像</h3>
                <div className={styles.scroll_box}>
                    <ul className={styles.backdrops}>
                        {tv.resDetail.images.backdrops.map((image, idx) => (
                            <li className={styles.backdrop_box} key={idx}>
                                <div className={styles.backdrop}>
                                    <Image 
                                        src={tv.baseUrl + image.file_path} 
                                        alt={tv.resDetail.name} 
                                        className={styles.poster}
                                        
                                        width={500}
                                        height={300}
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
        </div> 
    )
}