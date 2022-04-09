import { ChangeDetectionStrategy, Component, ContentChild, TemplateRef, ViewChildren } from '@angular/core';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
    templateUrl: './cabinet-layout.web.page.html',
    styleUrls: ['./styles/style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CabinetLayoutWebPage{

    public isAsideExpanded: boolean = false;

    @ContentChild('tuiExpandContent')
    public content!: TemplateRef<any>

    constructor(
        private _vk: VKBehav
    ) {
    }

    public switchAside(): void{
        this.isAsideExpanded = !this.isAsideExpanded;
    }

}