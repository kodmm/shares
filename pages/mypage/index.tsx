import type { NextPage} from 'next';
import useSWR, { Key } from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import type { IAuth } from '../../types/auths/auth';
import { useResetRecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import { userState, UserState } from '../../recoil/atoms/userState';
import { watchesState, IWatchState } from '../../recoil/atoms/watchState';
import { Watches } from '../../components/organisms/watches';
import { Loading } from '../../components/atoms/loading';

import styles from '../../styles/mypage.module.css';
import Image from 'next/image';

const MyPage: NextPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const setWatches = useSetRecoilState(watchesState);
    

    const mypageFetcher = async(url: string): Promise<{ user: UserState, watches: IWatchState[] | []}> => {
        const  resData: { data: { user: UserState, watches: IWatchState[] } } = await fetch('http://localhost:3001/api/v1/' + url, {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
        const { data }: { data: { user: UserState, watches: IWatchState[] } } = resData
        return data

    }

    const getUserWatches = () => {
        const url: Key = '/mypage';
        const { data, error } = useSWR(url, mypageFetcher)
        return {
            data: data,
            isLoading: !error && !data,
            isError: error
        }
    }
    const { data, isLoading, isError } = getUserWatches();

    useEffect(() => {  
        if(data !== undefined) {
            setUser(data.user)
            setWatches(data.watches)
        }

    }, [data])

    if(isLoading) return <Loading />
    if(isError) return <div>failed to load</div>

    if (user === undefined || user === null) return <div>is loading...</div>
    return(
        <div className={styles.mypage}>
            <section className={styles.profile_content}>
                <div>
                    <ul className={styles.profile}>
                        <li className={styles.profile_image}>
                            <Image
                                src={user.photo}
                                width={200}
                                height={200}
                                className={styles.photo}
                            />
                            
                        </li>
                        <li className={styles.profile_name}>
                            <p className={styles.display_name}>{user.displayName}</p>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={styles.content_box}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Watch holder</h2>
                    <Watches />
                </div>
                
            </section>
        </div>
    )
}

export default MyPage;