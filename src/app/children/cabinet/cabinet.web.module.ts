import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutWebPage } from './pages/cabinet-layout/cabinet-layout.web.page';
import { CabinetMenuWebComponent } from './components/cabinet-menu/cabinet-menu.web.component';
import { TuiExpandModule, TuiSvgModule } from '@taiga-ui/core';
import { CabinetHeaderWebComponent } from './components/cabinet-header/cabinet-header.web.component';
import { TuiIslandModule } from '@taiga-ui/kit';

const routes: Routes = [
    {
        path: '',
        component: CabinetLayoutWebPage,
        children: [

        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        TuiExpandModule,
        TuiSvgModule,
        RouterModule,
        RouterModule.forChild(routes),
        TuiIslandModule,
    ],
    providers: [],
    declarations: [
        CabinetLayoutWebPage,
        CabinetMenuWebComponent,
        CabinetHeaderWebComponent,
    ]
})
export class CabinetWebModule{}