import React from 'react';
import Image from 'next/image';
import styles from '../../styles/streamingServices.module.css';
import { useRecoilValue } from 'recoil';
import { getTvImgBaseUrl, getTvStreamingState } from '../../recoil/selectors/tvSelector';

export const Flatrate: React.FC = () => {
    const tvStreaming = useRecoilValue(getTvStreamingState);
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);

    const isFlatrate: boolean | undefined = tvStreaming?.hasOwnProperty('flatrate');
    if(isFlatrate){
        return(
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
    }else {
        return null
    }
    
}