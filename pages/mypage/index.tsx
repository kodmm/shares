import type { NextPage} from 'next';
import useSWR, { Key } from 'swr';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import type { IAuth } from '../../types/auths/auth';
import { useResetRecoilState, useRecoilState, useSetRecoilState } from 'recoil';
import { userState, UserState } from '../../recoil/atoms/userState';
import { watchesState, IWatchState } from '../../recoil/atoms/watchState';

import styles from '../../styles/mypage.module.css';
import Image from 'next/image';

const MyPage: NextPage = () => {
    const router: NextRouter = useRouter();
    const [user, setUser] = useRecoilState(userState);
    const setWatches = useSetRecoilState(watchesState);
    const resetUser = useResetRecoilState(userState);
    

    const mypageFetcher = async(url: string): Promise<{ user: UserState, watches: IWatchState[] | []}> => {
        const  resData: { data: { user: UserState, watches: IWatchState[] } } = await fetch('http://localhost:3001/api/v1/' + url, {
            mode: 'cors',
            method: 'GET',
            credentials: 'include',
        }).then(response => response.json())
        console.log('smap',resData)
        const { data }: { data: { user: UserState, watches: IWatchState[]| [] } } = resData
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
 
    const logout = async() => {
        const data: IAuth = await fetch("http://localhost:3001/api/v1/auth/logout", {
            mode: 'cors',
            method: 'DELETE',
            credentials: 'include',
        })
        .then(response => response.json())
        .catch(error => console.error(error))

        resetUser();

        data.data.isAuth? null: router.push('/')
    }

    useEffect(() => {  
        if(data !== undefined) {
            setUser(data.user)
            setWatches(data.watches)
        }

    }, [data])

    if(isLoading) return <div>is loading...</div>
    if(isError) return <div>failed to load</div>

    if (user === undefined) return <div>hoge</div>
    return(
        <div>
            <section className={styles.profile_box}>
                <div className={styles.profile}>
                    <ul>
                        <li className={styles.data}>
                            <Image
                                src={user.photo}
                                width={200}
                                height={200}
                                className={styles.photo}
                            />
                            
                        </li>
                        <li className={styles.data}>
                        <h3>{user.displayName}</h3>
                        </li>
                    </ul>
                </div>
            </section>
            <section className={styles.content_box}>
                <div className={styles.favorites_box}>

                </div>
                <div className={styles.watched_box}>

                </div>
            </section>
            <p>Authenticated Successfully!!!</p>
            <button onClick={logout}>Log Out</button>
        </div>
    )
}

export default MyPage;