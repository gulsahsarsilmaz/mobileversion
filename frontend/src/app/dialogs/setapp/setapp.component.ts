import { Component, OnInit, Inject } from "@angular/core"
import { FormGroup, FormBuilder } from "@angular/forms"

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"

import { AppModel } from "../../models/app"

@Component({
    selector: "app-setapp",
    templateUrl: "./setapp.component.html",
    styleUrls: ["./setapp.component.sass"]
})
export class SetAppComponent implements OnInit {
    form: FormGroup
    app: AppModel
    buildNumber: Number

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<SetAppComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {
        this.app = data.app

        this.buildNumber = this.app.buildNumber + 1
    }

    ngOnInit() {
        this.form = this.fb.group({
            buildNumber: [this.buildNumber, []]
        })
    }

    save() {
        this.dialogRef.close(this.form.value)
    }

    close() {
        this.dialogRef.close()
    }
}
