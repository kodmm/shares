import type { NextPage } from 'next';
import { useState } from 'react';
import { Container, Grid, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';
import Router from 'next/router';
const Home: NextPage = () => {
    const router = useRouter();
    const [searched, setSearched] = useState<string>("");
    const changedSearch = (event: any) => {
        const value: string = event.target.value
        console.log("changed!!!", event.target.value)
        setSearched(event.target.value);
    }
    const requestSearch = () => {
        const query = searched.trim();
        // fetch(`http://127.0.0.1:3001/api/v1/tv/search?query=${query}`, {
        //     method: 'GET'
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch((error) => {
        //     console.error('Error:', error);
        // })
        Router.push({
            pathname: '/search',
            query: {query: query}
        });
    }
    const cancelSearch = () => {
        setSearched("")
    }

    return(
        <Container>
            <Grid container>
                <Grid item md={2} />
                <Grid item md={8}>
                   <section >
                       <div className={styles.searchBox}>
                           <input type="search" placeholder="Search..." 
                                value={searched} 
                                className={styles.searchText} 
                                onChange={(event) => changedSearch(event)}
                            />
                           <IconButton size="large" aria-label="search" onClick={() => requestSearch()}>
                               <SearchIcon />
                           </IconButton>
                       </div>
                    </section> 
                </Grid>
                <Grid item md={2} />
                
            </Grid>
                
        </Container>
    );
}

export default Home;