import { Component, OnInit, Inject } from "@angular/core"
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material"

@Component({
    selector: "app-confirm",
    templateUrl: "./confirm.component.html",
    styleUrls: ["./confirm.component.sass"]
})
export class ConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}
}
