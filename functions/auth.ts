import type { IAuth } from '../types/auths/auth';
import { deleteSession } from '../api/auth';
export const logout = async() => {
    const data: IAuth = await deleteSession();
}