export interface RepoApiInterface {
    repo: string,
    url: string,
    last_update: string
}

export interface ApiErrorInterface {
    isError: boolean,
    errorCode: number,
    errorMessage: string
}