import React from 'react';
import Image from 'next/image';
import styles from '../../styles/streamingServices.module.css';
import { useRecoilValue } from 'recoil';
import { getTvImgBaseUrl, getTvStreamingState } from '../../recoil/selectors/tvSelector';
import { Buy, Flatrate, Rent } from '../atoms/index';

export const StreamingServices: React.FC = () => {
    const tvStreaming = useRecoilValue(getTvStreamingState)
    const tvImgBaseUrl = useRecoilValue(getTvImgBaseUrl);

    if (tvStreaming) {
        return(
            <div className={styles.streaming_package}>
                <div className={styles.flatrate}>
                    <h4 className={styles.streaming_title}>サブスクリプション</h4>
                    <Flatrate />
                </div>
                <div className={styles.rent}>
                    <h4 className={styles.streaming_title}>レンタル</h4>
                    <Rent />
                </div>
                <div className={styles.buy}>
                    <h4 className={styles.streaming_title}>購入</h4>
                    <Buy />
                </div>
            </div>
        )
    } else {
        return (
            <p className={styles.no_streaming}>現在、視聴できるストリーミングサービスはありません。</p>
        )
    }
    
}