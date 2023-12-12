import { Injectable } from '@angular/core';

export const CommonConst = {
    production: true,
    token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI5ODQ0MjgyNTgzIiwiZXhwIjoxNzAyODk3NjgxLCJpYXQiOjE3MDIyOTI4ODF9.B9zSlf_cHcPMI4sEwDlv6Exor2fEs0GtVt8fVA7LPjqmgXue2ljM5GJY34JB_E-DFRzXPK4ujduAhZnn_w9iwQ'
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