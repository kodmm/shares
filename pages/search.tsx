import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import type { IResSearchTv } from '../types/searches/Tv';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import styles from '../styles/Search.module.css'
const Search: NextPage = ({ data }: any) => {
    const router = useRouter();
    const searchTvs: IResSearchTv = data;
    return(
        <div>
            <div className={styles.minSpacer} />
            <section className={styles.searchResults}>
            {searchTvs.resSearchTv.results.map(result => (
                <div className={styles.tvInfo} key={result.id}>
                    <div className={styles.card}>
                        <div className={styles.image}>
                            <div className={styles.poster}>
                            <img src={searchTvs.baseImgUrl + result.poster_path} alt={result.name} className={styles.poster}/>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <div className={styles.title}>
                                <b>{result.name}</b>
                            </div>
                            <div className={styles.overview}>
                                <p className={styles.overviewText}>
                                {result.overview}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </section>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async context => {
    const query = context.query
    let data: any;
    const enQuery: string = encodeURI(query.query as string)
    await fetch(`http://10.0.0.1:3001/api/v1/tv/search?query=${enQuery}`, {
            method: 'GET'
        })
        .then(response => data = response.json())
        .catch((error) => {
            console.error('Error:', error);
        })
    
    return { props: data };
}
export default Search;