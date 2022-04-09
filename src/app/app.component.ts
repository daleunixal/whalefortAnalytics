import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VkBehaviourService } from './services/vk-behaviour.service';
import { skip, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
      TuiDestroyService
  ]
})
export class AppComponent implements OnInit{
  constructor(
      private _activatedRoute: ActivatedRoute,
      private _vk: VkBehaviourService,
      private _destroy$: TuiDestroyService,
      private _router: Router,
  ) {
  }

  public ngOnInit() {
    this._activatedRoute.fragment
        .pipe(
            skip(1),
            switchMap((value: string | null): Observable<boolean> => {
              if(!value){
                throw Error('Token was not provided');
              }
              return this._vk.configureToken(value)
            }),
            take(1),
            takeUntil(this._destroy$)
        ).subscribe(
        {
            next: (isSuccessfull: boolean) => {
                this._router.navigate(['cabinet'])
            }
        }
    )
  }

}
