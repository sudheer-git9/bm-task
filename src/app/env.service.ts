import { Injectable } from '@angular/core';

export const CommonConst = {
    production: true,
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5ODQ0MjgyNTgzIiwiZXhwIjoxNzAyMDE4ODAzLCJpYXQiOjE3MDE0MTQwMDN9._pA3lIiIRfMr0-UKpAimblMh14OH0RMxY0KLW_r1EID7uEghccgIsTyeCHjVf2eYefNBXuCNYyIHHlQhJ41DvQ'
}

@Injectable({ providedIn: 'root' })
export class EnvService {
    apiUrl: string | undefined;
    currentEnvironment: any;
    constructor() { }

    init(): Promise<void> {
        return new Promise(resolve => {
            this.setEnvVariables();
            resolve();
        });
    }

    private setEnvVariables(): void {
        this.currentEnvironment = {
            serverApi: 'https://dev.bharatmandi.com',
            ...CommonConst
        }
    }
}