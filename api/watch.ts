import type { IWatchData } from '../types/watches/watch';
import type { IVideo } from '../types/watches/video';
import type { IActor } from '../types/watches/actor';

export const postWatch = async(data: { actors: IActor[], video:  IVideo, watch: IWatchData} ) => {
    await fetch('http://localhost:3001/api/v1/watch', {
        mode: 'cors',
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        
    }).then(response => response.json())
}

export const deleteWatch = async (id: number) => {
    const resData: any = await fetch(`http://localhost:3001/api/v1/watch/${id}`, {
        mode: 'cors',
        method: 'DELETE',
        credentials: 'include',
    }).then(response => response.json())
    return resData
}

export const patchWatch = async (id: number, data: { isWatch: boolean }) => {
    const resData: any = await fetch(`http://localhost:3001/api/v1/watch/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    return resData;
}