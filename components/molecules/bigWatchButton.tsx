import React from 'react';

import Button from '@mui/material/Button';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { useRecoilState, useRecoilValue } from 'recoil'
import { isWatchState } from '../../recoil/atoms/watchState';
import styles from '../../styles/bigWatchButton.module.css';
import { getTvCastState, getTvDetailState } from '../../recoil/selectors/tvSelector';
import { addWatch, destroyWatch } from '../../functions/watch';

export const BigWatchButton: React.FC = () => {

    const [isWatch, setIsWatch] = useRecoilState(isWatchState);
    const tvDetail = useRecoilValue(getTvDetailState);
    const tvCasts = useRecoilValue(getTvCastState);

    const onClickAddWatch = async() => {
        const watch: any = addWatch(tvDetail, tvCasts);
        setIsWatch(true)
    }

    const onClickDestroyWatch = async() => {
        const watch: any = destroyWatch(Number(tvDetail.id));
        setIsWatch(false)
    }

    if (isWatch) {
        return (
            <Button 
                variant="outlined" 
                startIcon={<PlaylistRemoveIcon />} 
                className={styles.watch_button}
                onClick={onClickDestroyWatch}
            >
                <p className={styles.watch_text}>Delete Watch</p>
            </Button>
        )
    }else if (isWatch === false) {
        return (
            <Button 
                variant="contained" 
                startIcon={<PlaylistAddIcon />} 
                className={styles.watch_button}
                onClick={onClickAddWatch}
            >
                <p className={styles.watch_text}>Add Watch</p>
            </Button>
        )
    } else {
        return null
    }

}
