import React from 'react'
import styles from './Article.module.css'
type Props = {
    post: {
        title: string,
        date: string,
        content: string,
    }
}
const Article: React.FC<Props> = ({ post }) => {
    return(
        <article className={styles.article}>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.date}>{post.date}</p>
            <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content}}></div>
        </article>
    )
}

export { Article }