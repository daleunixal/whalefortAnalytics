import { IControl } from '../control/control.interface';
import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class FormBaseModel<T>{
    public controls: IControl[] = [];

    /** все контролы формы с именем контрола в качестве ключа  */
    public get controlsMap(): { [name: string]: IControl } {
        return this._controlsMap;
    }
    /** возвращает массив невалидных контролов формы */
    public get controlsInvalid(): IControl[] {
        return this.controls.filter((control: IControl) => !control.control.valid);
    }
    /** Форма. Объединение контролов в одну форму с отслеживанием состояния каждого контрола. (к примеру если один контрол формы невалиден => невалидна вся форма) */
    public get form(): FormGroup {
        return this._form;
    }

    /** базовая результирующая модель */
    public modelBaseValue!: T;

    /** ангуляровская форм группа */
    private _form!: FormGroup;
    /** все контролы формы с именем контрола в качестве ключа */
    private _controlsMap: { [name: string]: IControl } = {};

    /** создание формы
     * @param _modelFactory модель данных на выход из формы
     */
    constructor(private _modelFactory: () => T) {

    }

    /**
     * Заполняем вью-модель данными из модели
     * @param model TModel
     */
    public fromModel(model: T): void {
        this.modelBaseValue = model;
    }

    public abstract updateModel(model: T): void

    /**
     * возвращает результирующую модель формы
     * @returns TModel
     */
    public toModel(): T {
        const model: T = this._modelFactory();
        if (model) {
            this.updateModel(model);
        }

        return model;
    }

    /**
     * инициализация формы
     */
    public initialize(...params: any[]): void {
        this.controls = this.getControls();
        this.setForm();
        // this.initialized = true;

        // this.onInit$.next(true);
        // this.onInit$.complete();
        // this.changeViewOption(this.viewOption);
    }

    // перегрузки для получения разных типов
    /**
     * получить контрол формы
     * @param name имя контрола
     * @returns ControlBaseViewModel
     */
    public getControl<T extends IControl>(name: string): T;
    /**
     * получить контрол формы
     * @param name имя контрола
     */

    public getControl(name: string): IControl {
        const controlIndex: number = this.controls.findIndex((control: IControl) => control.name === name);
        if (controlIndex > -1) {
            return this.controls[controlIndex];
        }

        throw new Error('Контрол не существует, возможно опечатка в написании имени');
    }



    /**
     * Наполнение формы контролами
     * ### Пример
     * ```typescript
     const text: TextControlViewModel = new TextControlViewModel("Name", "test", {
            label: "Example Control"
        });

     return [
     text
     ];
     ```
     * @returns массив контролов
     */
    protected abstract getControls(): IControl[]

    /**
     * установка формы
     */
    private setForm(): void {
        const formGroup: { [name: string]: AbstractControl } = {};
        this.controls.forEach((control: IControl) => {
            this._controlsMap[control.name] = control;
            formGroup[control.name] = control.control;
        });
        this._form = new FormGroup(formGroup);
    }
}