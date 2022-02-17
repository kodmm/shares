import { Logout } from '@mui/icons-material';
import type { GetServerSideProps, NextPage} from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import type { IAuth } from '../../types/auths/auth';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../recoil/atoms/userState';
import { getUserState } from '../../recoil/selectors/userSelector';
const MyPage: NextPage = ({ data }: any) => {
    const router: NextRouter = useRouter();
    const setUser = useSetRecoilState(userState);
    const user = useRecoilValue(getUserState);
    
    const logout = async() => {
        const data: IAuth = await fetch("http://localhost:3001/api/v1/auth/logout", {
            mode: 'cors',
            method: 'DELETE',
            credentials: 'include',
        })
        .then(response => response.json())
        .catch(error => console.error(error))


        data.data.isAuth? null: router.push('/')
    }

    console.log(user)
    
    useEffect(() => {
        setUser(data)
    },[])

    return(
        <div>
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