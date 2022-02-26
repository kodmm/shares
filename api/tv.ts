import { useRecoilValue, useSetRecoilState } from'recoil';
import { tvState } from '../recoil/atoms/tvState';
import { tvStreamingState } from '../recoil/atoms/tvStreamingState';
import { isWatchState } from '../recoil/atoms/watchState';
import type { IStreamingIsWatch } from '../types/tvs/Tv'



export const getStreamingIsWatch = (id: number) => {
    fetch(`http://localhost:3001/api/v1/tv/streaming/${id}/iswatch/`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    }).then(response => response.json())
}
