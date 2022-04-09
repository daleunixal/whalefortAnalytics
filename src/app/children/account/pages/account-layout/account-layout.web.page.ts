import { Component } from '@angular/core';
import { VkBehaviourService } from '../../../../services/vk-behaviour.service';

@Component({
    templateUrl: './account-layout.web.page.html',
    styleUrls: [
        './styles/styles.internal.scss'
    ]
})
export class AccountLayoutWebPage{

    constructor(
        private _vk: VkBehaviourService
    ) {
    }

    public loginVK(): void{
        this._vk.authorize();
    }
}