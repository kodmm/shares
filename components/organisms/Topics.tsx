import React from 'react'
import Link from 'next/link'
import styles from './Topics.module.css'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'
import { getPosts } from '../../recoil/selectors/postSelector'
import { Loading } from '../atoms'
const Topics: React.FC = () => {
    const infoPost = useRecoilValue(getPosts('info'));
    const morePosts = useRecoilValue(getPosts('more'));
    
    return(
        <main className={styles.main}>
            <h1 className={styles.title}>
            Welcome to <Link href='/'>
                <a className={styles.name}>Shares!</a>
            </Link>
            </h1>

            <p className={styles.description}>
            ~{' '}About Shares{' '}~
            </p>

            <div className={styles.card}>
            <Link href={{
                pathname: 'about/[slug]',
                query: { slug: infoPost[0]?.slug},
            }}>
                <a >
                    <h2>{infoPost[0]?.slug} &rarr;</h2>
                    <h3>{infoPost[0]?.title}</h3>
                    <p className={styles.date}>{infoPost[0]?.date}</p>
                </a>
            </Link>
            </div>
            <div className={styles.grid}>
            {morePosts.map(post => (
                <Link 
                    key={post.slug}
                    href={{
                        pathname: 'about/[slug]',
                        query: { slug: post.slug},
                    }}
                >
                <a className={styles.card}>
                    <h2>{post.slug} &rarr;</h2>
                    <h3>{post.title}</h3>
                    <p className={styles.date}>{post.date}</p>
                </a>
                </Link>
            ))}
            
            </div>
        </main> 
    )
}

export { Topics }