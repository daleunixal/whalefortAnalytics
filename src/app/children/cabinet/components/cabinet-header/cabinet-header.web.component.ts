import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { tuiIconSettings } from '@taiga-ui/icons';
import { VkUserApiService } from '../../../../services/users/vk.user.api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserGetResponseModel } from '../../../../services/users/interfaces/user-get.interface.response-model';
import { take, tap } from 'rxjs/operators';
import { VkBehaviourService } from '../../../../services/vk-behaviour.service';

@Component({
    selector: 'wf-cabinet-header',
    templateUrl: './cabinet-header.web.component.html',
    styleUrls: ['./style/style.scss']
})
export class CabinetHeaderWebComponent implements OnInit{
    public get profile$(): Observable<IUserGetResponseModel>{
        return this._profile$.asObservable();
    }

    private _profile$: BehaviorSubject<IUserGetResponseModel> = new BehaviorSubject<IUserGetResponseModel>({} as IUserGetResponseModel)

    @Output()
    public toggleMenu: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private _userApi: VkUserApiService,
        private _vk: VkBehaviourService
    ) {
    }



    public ngOnInit(): void {
        this._userApi.getPhotoUrl()
            .pipe(
                tap((value: IUserGetResponseModel) => this._profile$.next(value)),
                take(1)
            ).subscribe();
    }

    public logout(): void {
        this._vk.logout();
    }

    public copyToken(): void{

    }

    public switchBurger(): void{
        this.toggleMenu.next();
    }
}