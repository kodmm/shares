import { GetStaticPaths, NextPage } from "next"
import styles from '../../styles/Slug.module.css'
import { getAllPosts, getPostBySlug } from "../../lib/api"
import { markdownToHtml } from '../../lib/markdownToHtml'
import { Article } from '../../components/organisms'

type Props = {
    post: {
        title: string,
        date: string,
        content: string,
    }
}

const Slug: NextPage<Props> = ({ post }) => {
    
    return(
        <div className={styles.container}>
            <Article post={post} />
        </div>
    )
}

type Params = {
    params: {
        slug: string
    }
}

export const getStaticProps = async({params}: Params) => {
    const post = getPostBySlug(params.slug, [
       'title',
       'date',
       'content',
    ])

    const content = await markdownToHtml(post.content)
    return {
        props: {
            post: {
                ...post,
                content,
            }
        }
    }
}

export const getStaticPaths: GetStaticPaths = async() => {
    const posts = getAllPosts(['slug'])

    return {
        paths: posts.map(post => {
            return {
                params: {slug: post.slug},
            }
        }),
        fallback: false,
    }
}

export default Slug