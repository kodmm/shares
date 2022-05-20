import type { NextPage, InferGetStaticPropsType } from 'next'
import { postsState } from '../../recoil/atoms/postsState'
import { Topics } from '../../components/organisms';
import styles from '../../components/organisms/Topics.module.css'
import { getAllPosts } from '../../lib/api'
import { useSetRecoilState, useRecoilState} from 'recoil'
import { useEffect } from 'react';

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const About: NextPage<Props> = ({ allPosts }) => {
  const [posts, setPosts] = useRecoilState(postsState);
  setPosts(allPosts)
  return (
    <div className={styles.container}>
      <Topics />
    </div>
  )
}

export const getStaticProps = async() => {
  const allPosts = getAllPosts(['slug', 'title', 'date',])
  return {
    props: { allPosts }
  }
}

export default About
