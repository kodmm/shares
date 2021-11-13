import type { NextPage } from 'next';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
const Search: NextPage = (data: any) => {
    const router = useRouter();
    console.log(data);
    return(
        <div>
            $Test
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
        console.log(data)

    return { props: data };
}
export default Search;