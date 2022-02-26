import { Logout } from '@mui/icons-material';
import type { GetServerSideProps, NextPage} from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import type { IAuth } from '../../types/auths/auth';
import { useSetRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { getUserState } from '../../recoil/selectors/userSelector';
import styles from '../../styles/mypage.module.css';
import Image from 'next/image';
const MyPage: NextPage = ({ data }: any) => {
    const router: NextRouter = useRouter();
    const setUser = useSetRecoilState(userState);
    const resetUser = useResetRecoilState(userState);
    const user = useRecoilValue(getUserState);
    
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
        setUser(data);
    },[])

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
            <button onClick={() => logout()}>Log Out</button>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async context => {
    const url: string = `http://10.0.0.1:3001/api/v1/mypage`
    let query: string = '';

    console.log(context.req.headers.cookie)

    const cookie: string = context.req.headers.cookie? context.req.headers.cookie : ''

    

    if (cookie) {
        const id: string = cookie.split('=')[1]
        query = `?id=${id}`
    }

    const data: any = await fetch(url + query)
                                .then(response => response.json())
                                .catch(error => {
                                    console.error('Error:', error);
                                })

    console.log(data);
    return { props: data };
}


export default MyPage;