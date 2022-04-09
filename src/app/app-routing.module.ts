import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountModule } from './children/account/account.module';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./children/account/account.module').then(m => m.AccountModule)
    },
    {
        path: 'access/:token',
        redirectTo: ''
    },
    {
        path: 'access',
        redirectTo: ''
    },
    {
        path: 'cabinet',
        loadChildren: () => import('./children/cabinet/cabinet.web.module').then(m => m.CabinetWebModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AccountModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
