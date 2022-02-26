export const getStreamingIsWatch = (id: number) => {
    fetch(`http://localhost:3001/api/v1/tv/streaming/${id}/iswatch/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json())
}
