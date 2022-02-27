export const getStreamingIsWatch = async(id: number) => {
    const resData: any = await fetch(`http://localhost:3001/api/v1/tv/streaming/${id}/iswatch/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json())
    
    return resData
}
