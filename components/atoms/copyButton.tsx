import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import styles from '../../styles/copybutton.module.css';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { IconLabelKeys, copyState } from '../../recoil/atoms/copyState';

type Props = {
    name: string
}

export const CopyButton: React.FC<Props> = ({ name }: Props) => {
    const [copy, setCopy] = useRecoilState(copyState);
    const resetCopy = useResetRecoilState(copyState);

    const onClickCopyButton = (name: string) => {
        navigator.clipboard.writeText(name)
        setCopy({
            iconLabel: IconLabelKeys.COPIED,
        })

        setTimeout(resetCopy,1500);
    }

    return(
        <div className={styles.copybutton_box}>
            <ContentCopyIcon className={styles.copyicon} onClick = {() => onClickCopyButton(name)} />
            <p className={styles.iconlabel}>{copy.iconLabel}</p>
        </div>
    )
}