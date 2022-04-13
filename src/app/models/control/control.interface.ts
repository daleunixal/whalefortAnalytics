import { Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';

export interface IControl{    /** Лейбл контрола */
    name: string;
    /** Настройки сообщения с ошибкой или подсказкой контрола  */
    control: AbstractControl;
    /** значение контрола */
    getValue: () => any;
    /** установка значения в контрол */
    setValue: (value: any, change: boolean, markAsTouched: boolean) => void;
    /** измененение контрола */
    valueChanges$: Observable<any>;
    /** установка ридонли в контрол */
    setReadonly: (readonly: boolean) => void;
    /** потрогать контрол */
    markAsTouched: (onlySelf: boolean) => void;
    /** обновить статус контрола */
    updateStatus: () => void;
    /** коллекция контролов в массиве контрола */
    controlsMap?: { [name: string]: IControl };
}