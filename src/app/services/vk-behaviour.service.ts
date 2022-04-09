import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class VkBehaviourService {

    public get sessionSecret(): string{
        return this._sessionSecret$.value
    }

    public get sessionSecret$(): Observable<string>{
        return this._sessionSecret$.asObservable();
    }

    private _sessionSecret$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    constructor(
        private _router: Router
    ) {
    }

    public authorize(): void{
        window.open('https://oauth.vk.com/authorize?client_id=8131472&scope=215985366&redirect_uri=http://localhost:4200/access&response_type=token&revoke=1', '_self')
        // VK.Auth.login((s: VKSessionResponse): void => {
        //     this._sessionSecret$.next(s.session.secret)
        // }, 0x03)
    }

    public configureToken(paramString: string): Observable<boolean>{
        const regex: RegExp = /^access_token=(?<alpha>.+)&ex/

        const token: RegExpExecArray | null = regex.exec(paramString);

        if (token?.groups?.alpha){
            this._sessionSecret$.next(token.groups.alpha)
            return of(true)
        }
        return of(false)
    }
}