import { Injectable, OnInit } from '@angular/core';
import { VkBaseService } from '../vk.base.service';
import { VkApiEndpoint } from '../../enum/api-endpoints.enum';
import { Observable } from 'rxjs';
import { IUserGetRequestModel } from './interfaces/user-get.interface.request-model';
import { IUserGetResponseModel } from './interfaces/user-get.interface.response-model';
import { UserGetParamsEnum } from './enum/user-get.params.enum';
import { VkBehaviourService } from '../vk-behaviour.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class VkUserApiService extends VkBaseService implements OnInit{
    constructor(
        vkB: VkBehaviourService,
        _http: HttpClient
    ) {
        super(vkB, _http);
        this.type = VkApiEndpoint.users

    }

    public ngOnInit(): void {
        this.type = VkApiEndpoint.users
    }

    public getPhotoUrl(): Observable<IUserGetResponseModel>{
        return this.send<IUserGetRequestModel, IUserGetResponseModel[]>('get', {
            fields: `${UserGetParamsEnum.photo_200}`
        }).pipe(
            map((val: IUserGetResponseModel[]) => val[0])
        )
    }
}