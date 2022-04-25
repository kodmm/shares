import { IAuth } from "../types/auths/auth"
import { UserState } from "../recoil/atoms/userState"

export const userFetcher = async(url: string): Promise<UserState | null> => {
    const { data }: { data: {user: UserState } } = await fetch(process.env.NEXT_PUBLIC_API_SERVER_URL + "/api/v1" + url, {
        mode: 'cors',
        method: 'GET',
        credentials: 'include'
    }).then(response => response.json())
    return data.user

}
export const deleteSession = async() => {
    const data: IAuth = await fetch(process.env.NEXT_PUBLIC_API_SERVER_URL + "/api/v1/auth/logout", {
        mode: 'cors',
        method: 'DELETE',
        credentials: 'include',
    })
    .then(response => response.json())
    .catch(error => console.error(error))

    return data
}

