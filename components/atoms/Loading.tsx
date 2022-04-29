import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './Loading.module.css'

export const Loading: React.FC = () => {
    return(
        <div className={styles.loading_box}>
            <CircularProgress />
        </div>
    )
}