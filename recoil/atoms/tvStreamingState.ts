import { atom } from 'recoil';
import { RecoilAtomKeys } from '../RecoilKeys';

export interface IStreamingService {
    link: string;
    rent: IStreamingServiceData[];
    flatrate: IStreamingServiceData[];
    buy: IStreamingServiceData[];
}

export interface IStreamingServiceData {
    display_priority: number;
    logo_path: string;
    provider_id: number;
    provider_name: string;
}
export const tvStreamingState = atom<IStreamingService | null>({
    key: RecoilAtomKeys.TV_STREAMING_STATE,
    default: null,
})