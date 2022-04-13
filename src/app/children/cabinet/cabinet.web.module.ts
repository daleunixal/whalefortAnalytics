import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CabinetLayoutWebPage } from './pages/cabinet-layout/cabinet-layout.web.page';
import { CabinetMenuWebComponent } from './components/cabinet-menu/cabinet-menu.web.component';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiExpandModule,
    TuiSvgModule,
    TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { CabinetHeaderWebComponent } from './components/cabinet-header/cabinet-header.web.component';
import {
    TuiAvatarModule,
    TuiDataListWrapperModule,
    TuiDropdownContextModule,
    TuiIslandModule,
    TuiMultiSelectModule
} from '@taiga-ui/kit';
import { VkUserApiService } from '../../services/users/vk.user.api.service';
import { HttpClient } from '@angular/common/http';
import { TuiActiveZoneModule, TuiLetModule } from '@taiga-ui/cdk';
import { GroupListSelectControl } from '../../shared/controls/custom-accessor/group-select';
import { ReactiveFormsModule } from '@angular/forms';
import { SimpleCommandWebComponent } from './components/simple-command/simple-command.web.component';
import { VkFriendsApiService } from '../../services/friends/vk.friends.api.service';
import { CardValidator } from '../../shared/controls/custom-accessor/validators/card.validator';

const routes: Routes = [
    {
        path: '',
        component: CabinetLayoutWebPage,
        children: [
            {
                path: 'simple-command',
                component: SimpleCommandWebComponent
            }
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
        TuiDataListWrapperModule,
        TuiMultiSelectModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiTextfieldControllerModule,
    ],
    providers: [
        VkUserApiService,
        HttpClient,
        VkFriendsApiService,
    ],
    declarations: [
        CabinetLayoutWebPage,
        CabinetMenuWebComponent,
        CabinetHeaderWebComponent,
        GroupListSelectControl,
        SimpleCommandWebComponent,
        CardValidator,
    ]
})
export class CabinetWebModule{}