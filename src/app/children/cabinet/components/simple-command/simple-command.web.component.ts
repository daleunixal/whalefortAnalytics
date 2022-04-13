import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VkFriendsApiService } from '../../../../services/friends/vk.friends.api.service';
import { Observable } from 'rxjs';
import { FriendListInterface } from '../../../../services/friends/interfaces/friend-list.interface';
import { tap } from 'rxjs/operators';
import {
    validateCard,
    validateCardDelegate
} from '../../../../shared/controls/custom-accessor/validators/card.validator';

@Component({
    templateUrl: './simple-command.web.component.html'
})
export class SimpleCommandWebComponent implements OnInit{

    public form!: FormGroup;

    constructor(
        private _fb: FormBuilder,
        private _vkf: VkFriendsApiService
    ) {
        this.form = this._fb.group({
            ids: {}
        })
    }

    public get isValid(): boolean{
        return this.form.valid;
    }

    public ngOnInit(): void {
        this.form.valueChanges
            .pipe(
                tap((value) => {
                    console.log(value);
                })
            )
            .subscribe()
    }

    public setValue(str: string[]): void{
        this.form.get('ids')?.setValue(['sdsd', 'dsdsds'])
    }



    public restoreForm(): void{
        /**
         * DATA FROM SERVER
         */
        const delta = {}

        this.form.get('ids')?.setValue(delta, {})
    }

    public getValue(): void{
        console.log(this.form.value)
    }

    public getFriendList(): Observable<FriendListInterface[]>{
        return this._vkf.getFriendList();
    }
}