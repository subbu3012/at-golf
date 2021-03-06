import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentComponent,TournamentViewComponent } from './tournament.component';

const routes: Routes = [
    {
        path: '',
        component: TournamentComponent
    },
    {
        path: ':id',
        component: TournamentViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TournamentRoutingModule { }
