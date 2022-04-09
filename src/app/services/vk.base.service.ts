import { Directive, Injectable } from '@angular/core';
import { VkBehaviourService } from './vk-behaviour.service';
import { VkApiEndpoint } from '../enum/api-endpoints.enum';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Directive()
export class VkBaseService {

    public set type(value: VkApiEndpoint){
        this._type = value;
    }

    private _type!: VkApiEndpoint

    constructor(
        private _vkBehaviour: VkBehaviourService,
        private _http: HttpClient,
    ) {
    }

    public send<T, U>(methodName: string, transferObject: T): Observable<U>{
        const formdata: FormData = new FormData()
        const transferObj: Object = {...transferObject, access_token: this._vkBehaviour.sessionSecret, v: 5.131};
        Object.keys(transferObj).forEach((key: string) => formdata.append(key, (transferObj as any)[key]))

        return this._http.post(`/vk/${this._type}.${methodName}`, formdata)
            .pipe(
                map((value: any): U => {
                    return value.response as U
                })
            )
    }

}