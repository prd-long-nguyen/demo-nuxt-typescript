import HttpFactory from '@/repository/http-factory';
import type { IRegisterAccountInput, IRegisterAccountResponse, ILoginInput, ILoginResponse } from '@/types';

class AuthModule extends HttpFactory {
    private RESOURCE = '/auth';

    async login(credentials: ILoginInput): Promise<ILoginResponse> {
        return await this.call<ILoginResponse>('post', `${this.RESOURCE}/login`, credentials);
    }

    async create(account: IRegisterAccountInput): Promise<IRegisterAccountResponse> {
        return await this.call<IRegisterAccountResponse>('post', `${this.RESOURCE}/register`, account);
    }
}

export default AuthModule;