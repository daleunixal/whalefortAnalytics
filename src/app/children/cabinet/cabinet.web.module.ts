import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutWebPage } from './pages/cabinet-layout/cabinet-layout.web.page';
import { CabinetMenuWebComponent } from './components/cabinet-menu/cabinet-menu.web.component';
import { TuiDataListModule, TuiExpandModule, TuiSvgModule } from '@taiga-ui/core';
import { CabinetHeaderWebComponent } from './components/cabinet-header/cabinet-header.web.component';
import { TuiAvatarModule, TuiDropdownContextModule, TuiIslandModule } from '@taiga-ui/kit';
import { VkUserApiService } from '../../services/users/vk.user.api.service';
import { HttpClient } from '@angular/common/http';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';

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
        TuiAvatarModule,
        TuiLetModule,
        TuiDropdownContextModule,
        TuiDataListModule,
        TuiActiveZoneModule,
    ],
    providers: [
        VkUserApiService,
        HttpClient
    ],
    declarations: [
        CabinetLayoutWebPage,
        CabinetMenuWebComponent,
        CabinetHeaderWebComponent,
    ]
})
export class CabinetWebModule{}