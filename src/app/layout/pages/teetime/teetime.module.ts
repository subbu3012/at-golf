import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeeTimeRoutingModule } from './teetime-routing.module';
import { TeeTimeComponent, BookTeeTimeComponent } from './teetime.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule, MatButtonModule, MatDatepickerModule,
    MAT_DATE_LOCALE, MatNativeDateModule, MatCardModule, MatSelectModule, MatRadioModule
}
    from '@angular/material'
import { TeetimeService } from './teetime.service'

@NgModule({
    imports: [
        FormsModule, ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        TeeTimeRoutingModule,
        HttpClientModule,
        MatInputModule, MatButtonModule, MatDatepickerModule,
        MatNativeDateModule, MatCardModule, MatSelectModule, MatRadioModule
    ],
    declarations: [
        TeeTimeComponent, BookTeeTimeComponent
    ],
    entryComponents: [BookTeeTimeComponent],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-In' }, TeetimeService]
})
export class TeeTimeModule { }
