export interface IRegisterAccountInput {
    first_name: string
    last_name: string
    email: string
    password: string
}

export interface IRegisterAccountResponse {
    success: boolean
}

export interface ILoginInput {
    email: string
    password: string
}

export interface ILoginResponse {
    access_token: string
    refresh_token: string
}