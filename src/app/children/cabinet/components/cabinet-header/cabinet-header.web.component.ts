import { Component, EventEmitter, Output } from '@angular/core';
import { tuiIconSettings } from '@taiga-ui/icons';

@Component({
    selector: 'wf-cabinet-header',
    templateUrl: './cabinet-header.web.component.html',
    styleUrls: ['./style/style.scss']
})
export class CabinetHeaderWebComponent{
    public tuiIconSettings = tuiIconSettings

    @Output()
    public toggleMenu: EventEmitter<void> = new EventEmitter<void>();

    public switchBurger(): void{
        this.toggleMenu.next();
    }
}