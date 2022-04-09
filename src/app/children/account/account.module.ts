import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountLayoutWebPage } from './pages/account-layout/account-layout.web.page';
import { RouterModule, Routes } from '@angular/router';
import { TuiIslandModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

const routes: Routes = [
    {
        path: '',
        component: AccountLayoutWebPage
    }
]

@NgModule({
    declarations: [
        AccountLayoutWebPage
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TuiIslandModule,
        TuiButtonModule
    ]
})
export class AccountModule {

}
