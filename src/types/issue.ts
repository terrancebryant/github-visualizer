export interface Issues {
    title: string,
    number: string,
    id: number,
    body: string,
    created_at: string,
    user: {
        login: string
    },
}