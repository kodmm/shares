import React from 'react'
import styles from '../../styles/casts.module.css'
import Image from 'next/image';
import { ITv } from '../../types/tvs/Tv';
type Props = {
    tv: ITv;
}

export const Casts: React.FC<Props> = ({ tv }) => {
    return (
        <div className={styles.casts_box}>
            <h3 className={styles.subtitle}>出演者</h3>
            <div className={styles.scroll_box}>
                <ul className={styles.casts}>
                    {tv.credits.cast.map(cast => (
                        <li className={styles.card} key={cast.id}>
                            <div className={styles.image_box}>
                                <Image 
                                    src={tv.baseUrl + cast.profile_path} 
                                    alt={cast.original_name} 
                                    className={styles.image}
                                    
                                    width={140}
                                    height={180}
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
    )
}