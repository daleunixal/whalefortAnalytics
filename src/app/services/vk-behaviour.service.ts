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
        if(localStorage.getItem('token')){
            this._sessionSecret$.next(localStorage.getItem('token') as string)
        }
    }

    public logout(): void{
        this._sessionSecret$.next('');
        localStorage.removeItem('token');
        this._router.navigate(['']);
    }

    public authorize(): void{
        window.open('https://oauth.vk.com/authorize?client_id=8131472&scope=215985366&redirect_uri=http://localhost:4200/access&response_type=token&revoke=1', '_self')
    }

    public configureToken(paramString: string): Observable<boolean>{
        const regex: RegExp = /^access_token=(?<alpha>.+)&ex/

        const token: RegExpExecArray | null = regex.exec(paramString);

        if (token?.groups?.alpha){
            this._sessionSecret$.next(token.groups.alpha)
            localStorage.setItem('token', token.groups.alpha)
            return of(true)
        }
        return of(false)
    }
}