export interface IActor extends IActorData {
    created_at: string,
    updated_at: string,
}

export interface IActorData {
    id: number,
    name: string,
    profile_path: string,
}