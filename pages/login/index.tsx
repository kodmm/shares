import type { NextPage } from 'next';
import styles from "../../styles/login.module.css";
import { TwitterLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const Login: NextPage = () => {
    const changeTwitterPage = () => {
        window.location.href= process.env.NEXT_PUBLIC_API_SERVER_URL + "/api/v1/auth/twitter"
    }
    const changeGooglePage = () => {
        window.location.href= process.env.NEXT_PUBLIC_API_SERVER_URL + "/api/v1/auth/google"
    }

    return(
        <div>
            <div className={styles.login_wrapper}>
                <div className={styles.login_box}>
                    <h1 className={styles.title}>Log in</h1>
                    <ul className={styles.login}>
                        <li className={styles.login_botton}>
                        <TwitterLoginButton onClick={() => changeTwitterPage()}/>
                        </li>
                        <li className={styles.login_botton}>
                            <GoogleLoginButton onClick={() => changeGooglePage()} />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        
    )
}

export default Login;

