import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { TeeSlot, MEMBERLIST, BookTeeSlot } from './teetime.model'
import { MatDialog, MatDialogRef } from '@angular/material';
import { SharedService } from './../../shared.service'
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';
import { TeetimeService } from './teetime.service'


@Component({
    selector: 'teetime',
    templateUrl: './teetime.component.html',
    styleUrls: ['./teetime.component.scss'],
    providers: []
})
export class TeeTimeComponent implements OnInit {

    public teeSlotList: TeeSlot[] = [];
    public teeTimeDate: Date = new Date();
    public teeBoxName: String = "TBox 1";
    public currentDate: Date = new Date();

    constructor(
        private dialog: MatDialog,
        public sharedServ: SharedService,
        public teeServ: TeetimeService
    ) {

    }

    ngOnInit() {
        this.getTeeSlotData();
    }

    ngOnDestroy(): void {

    }

    public setSlotToFocus(slotIndex: number) {
        this.teeSlotList.forEach((element, index) => {
            element.isFocused = (index == slotIndex);
        })
    }

    openBookTeetimeModal(_index: number) {
        let dialogRef: MatDialogRef<BookTeeTimeComponent> = this.dialog.open(
            BookTeeTimeComponent, {
                "width": "700px",
                "data": { "slotInfo": this.teeSlotList[_index] }
            })
    }

    public getTeeSlotData() {
        this.teeServ.getSlotData("", "1").subscribe(data => {
            this.teeSlotList = data;
            this.teeSlotList = this.teeSlotList.sort((a: any, b: any) => {
                return +a.slotId.slice(4) - +b.slotId.slice(4);
            })
        });
    }
}

@Component({
    selector: 'book-teetime',
    templateUrl: './dialogs/book-teetime.component.html',
    // styleUrls: ['./teetime.component.scss'],
    providers: []
})
export class BookTeeTimeComponent implements OnInit {

    public slotInfo: TeeSlot;
    public memberList: any[] = MEMBERLIST;
    public bookTeeSlotData: BookTeeSlot = new BookTeeSlot();

    constructor(
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public sharedServ: SharedService,
        private dialogRef: MatDialogRef<BookTeeTimeComponent>,
        public teeServ: TeetimeService
    ) {
        this.slotInfo = dialogData.slotInfo;
        console.log(this.slotInfo)
    }

    ngOnInit() {
        this.bookTeeSlotData.bookedby = this.sharedServ.userSessionData['loginId'];
        this.bookTeeSlotData.eventDate = this.slotInfo.date;
        this.bookTeeSlotData.resourceId = this.slotInfo.resourceId;
        this.bookTeeSlotData.slotId = this.slotInfo.slotId;
        this.bookTeeSlotData.members = [];
    }

    ngOnDestroy(): void {

    }

    public bookTeetimeSlot() {
        this.sharedServ.showProgressBar = true;
        this.teeServ.bookTeeSlot(this.bookTeeSlotData).subscribe(data => {
            this.sharedServ.openSnackBar("Slot booked succesfully. Have a nice day.", "DISMISS", 5000);
            this.dialogRef.close();
            this.sharedServ.showProgressBar = false;
        }, err => {
            this.sharedServ.openSnackBar("Slot booked succesfully. Have a nice day.", "DISMISS", 5000);
            this.dialogRef.close();
            this.sharedServ.showProgressBar = false;
        })
    }
}
