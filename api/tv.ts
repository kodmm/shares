export const getStreamingIsWatch = async(id: number) => {
    const resData: any = await fetch(process.env.NEXT_PUBLIC_API_SERVER_URL + `/api/v1/tv/streaming/${id}/iswatch/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json())
    
    return resData
}
