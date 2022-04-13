import { Injectable, OnInit } from '@angular/core';
import { VkBaseService } from '../vk.base.service';
import { VkBehaviourService } from '../vk-behaviour.service';
import { HttpClient } from '@angular/common/http';
import { VkApiEndpoint } from '../../enum/api-endpoints.enum';
import { Observable } from 'rxjs';
import { FriendListInterface } from './interfaces/friend-list.interface';
import { map } from 'rxjs/operators';
import { FriendListResponseModel } from './interfaces/friend-list.response-model';

@Injectable()
export class VkFriendsApiService extends VkBaseService {
    constructor(
        vkB: VkBehaviourService,
        _http: HttpClient
    ) {
        super(vkB, _http);
        this.type = VkApiEndpoint.friends
    }


    public getFriendList(): Observable<FriendListInterface[]>{
        return this.send<any, FriendListResponseModel>('get', {
            fields: 'nickname',
            order: 'hints'
        }).pipe(
            map((resp): FriendListInterface[] => {
                return resp.items.map((x): FriendListInterface => {
                    return {
                        id: x.id,
                        firstname: x.first_name,
                        secondname: x.last_name,
                    }
                })
            })
        )
    }
}