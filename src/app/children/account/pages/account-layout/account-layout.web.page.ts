import { Component, OnInit } from '@angular/core';
import { VkBehaviourService } from '../../../../services/vk-behaviour.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './account-layout.web.page.html',
    styleUrls: [
        './styles/styles.internal.scss'
    ]
})
export class AccountLayoutWebPage implements OnInit{

    public isInitialized: boolean = false;

    constructor(
        private _vk: VkBehaviourService,
        private _router: Router,
    ) {
    }

    public ngOnInit() {
        if(this._vk.sessionSecret){
            this._router.navigate(['cabinet'])

            return
        }

        this.isInitialized = true
    }

    public loginVK(): void{
        this._vk.authorize();
    }
}