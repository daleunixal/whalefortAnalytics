import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { VkBehaviourService } from '../../../../services/vk-behaviour.service';
import { Router } from '@angular/router';
import { tuiFadeIn } from '@taiga-ui/core';
import { tuiPure } from '@taiga-ui/cdk';
import { from, of } from 'rxjs';
import { concatMap, delay, repeat, startWith } from 'rxjs/operators';

@Component({
    templateUrl: './account-layout.web.page.html',
    styleUrls: [
        './styles/styles.internal.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [tuiFadeIn]
})
export class AccountLayoutWebPage implements OnInit{

    public isInitialized: boolean = false;

    public isShown$ = from([false, true]).pipe(
        concatMap(val => of(val).pipe(delay(1.5 * 450))),
        repeat(),
        startWith(true),
    );

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

    @tuiPure
    public getAnimation(){
        return {
            value: '',
            params: 450
        } as const
    }

    public loginVK(): void{
        this._vk.authorize();
    }
}