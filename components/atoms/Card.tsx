import React from 'react';
import Link from 'next/link';
import styles from './Card.module.css';

type Props = {
    key?: string,
    post: {[key: string]: string}
}
const Card: React.FC<Props> = ({ post }) => {
    return(
        <div className={styles.card}>
            <Link href={{
                pathname: 'about/[slug]',
                query: { slug: post.slug},
            }}>
                <a>
                    <h2>{post.slug} &rarr;</h2>
                    <h3>{post.title}</h3>
                    <p className={styles.date}>{post.date}</p>
                </a>
            </Link>
        </div>
        
    )
}

export { Card }