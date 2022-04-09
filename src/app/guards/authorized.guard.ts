import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { VkBehaviourService } from '../services/vk-behaviour.service';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthorizedGuard implements CanActivate, CanLoad{
    constructor(
        private _vk: VkBehaviourService,
        private _router: Router,
    ) {
    }

    canActivate(): Observable<boolean | UrlTree> {
        return this._vk.sessionSecret$
            .pipe(
                map((token) => {
                    if(token){
                        this._router.navigate(['cabinet'])
                    }

                    return false;
                })

            )
    }

    canLoad(): Observable<boolean | UrlTree> {
        return this._vk.sessionSecret$
            .pipe(
                map((token) => {
                    if(token){
                        this._router.navigate(['cabinet'])
                    }

                    return false;
                })

            )
    }
}