import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    forwardRef,
    Input,
    OnInit, Renderer2, ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
    isNumber,
    TUI_DEFAULT_MATCHER,
    TuiContextWithImplicit,
    TuiDestroyService,
    tuiPure,
    TuiStringHandler
} from '@taiga-ui/cdk';
import { FriendListInterface } from '../../../services/friends/interfaces/friend-list.interface';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'wf-group-list',
    templateUrl: './group-select.control.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GroupListSelectControl),
        multi: true
    }, TuiDestroyService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupListSelectControl implements ControlValueAccessor, OnInit{

    @Input()
    friendlist$!: Observable<FriendListInterface[]>

    constructor(
        private _cdr: ChangeDetectorRef,
        private _render: Renderer2,
        private _destroy$: TuiDestroyService
    ) {
    }

    @ViewChild('delta', { static: true })
    public input!: ElementRef

    public search: string | null = '';

    public idControl: FormControl = new FormControl();

    private _itemList: FriendListInterface[] = []

    @tuiPure
    filter(search: string | null): readonly FriendListInterface[] {
        return this._itemList.filter(item => TUI_DEFAULT_MATCHER(`${item.secondname} ${item.firstname}`, search || ''));
    }


    public ngOnInit(): void {
        this.friendlist$.pipe(
            tap((val) => this._itemList = val)
        ).subscribe()


        this.idControl.valueChanges
            .pipe(
                tap((value: FriendListInterface[]) => {
                    this.updateValue()
                    console.log(value)
                }),
                takeUntil(this._destroy$)
            )
            .subscribe();
    }

    public str: TuiStringHandler<FriendListInterface> = (item: FriendListInterface) => {
        return `${item.secondname} ${item.firstname}`
    }
    /**
     * Регистрирует функцию обратного вызова, которая вызывается при изменении значения элемента управления в пользовательском интерфейсе.
     * @param fn
     */
    public registerOnChange(fn: any): void {
        this.onChangeFn = fn;
        console.log('Registered OnChange')

    }

    public onBlurCard(): void{
        this.updateValue();
    }

    /**
     * Регистрирует функцию обратного вызова, которая вызывается API форм при инициализации для обновления модели формы при размытии.
     * @param fn
     */
    public registerOnTouched(fn: any): void {
        this.onTouchedFn = fn;
        console.log('Registered OnTouch')
    }

    public writeValue(obj: FriendListInterface[]): void {
        this.idControl.setValue(obj)
        this.onChangeFn(obj);
        this._cdr.markForCheck()
        console.log('WriteValue Called')
    }

    public updateValue(): void{
        const gamma: response = {
            friends: this.idControl.value,
            cardNumber: this.input.nativeElement.value.replace(/ /g, '')
        }

        this.onChangeFn(gamma);
    }

    public onInput(): void{
        // :4845 8569
        let value: string = this.input.nativeElement.value;

        switch (value.length){
            case 4:
                value += ' '
                break;

            case 9:
                value += ' '
                break;

            case 14:
                value += ' ';
                break;
        }

        this._render.setProperty(this.input.nativeElement, 'value', value);

        this.onTouchedFn();
        // this.updateValue();
        // this.onChangeFn(value.replace(/ /g, ''));
    }


    /** html => model */
    protected onChangeFn: any = () => {  /** */ };
    protected onTouchedFn: any = () => {  /** */ };
}

type response = {
    friends: FriendListInterface[],
    cardNumber: string
}