import React from 'react';
import styles from '../../styles/crews.module.css';
import Image from 'next/image'
import { useRecoilValue } from 'recoil';
import { getTvImgBaseUrl, getTvCrewState } from '../../recoil/selectors/tvSelector';

export const Crews: React.FC = () => {

    const tvCrews = useRecoilValue(getTvCrewState);
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);

    return(
        <div className={styles.crews_box}>
            <h3 className={styles.subtitle}>スタッフ</h3>
            <div className={styles.scroll_box}>
                <ul className={styles.crews}>
                    {tvCrews?.map(crew => (
                        <li className={styles.card} key={crew.id}>
                            <div className={styles.image_box}>
                                <Image src={tvImgBaseUrl + crew.profile_path} 
                                    alt={crew.original_name} 
                                    className={styles.image}
                                    
                                    width={140}
                                    height={180}
                                />
                            </div>
                            <div className={styles.text}>
                                <p className={styles.character}>{crew.department}</p>
                                <b>{crew.name}</b>
                                
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}