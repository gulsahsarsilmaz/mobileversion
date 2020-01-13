import { Component, OnInit, Inject } from "@angular/core"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material"

@Component({
    selector: "app-addapp",
    templateUrl: "./addapp.component.html",
    styleUrls: ["./addapp.component.sass"]
})
export class AddAppComponent implements OnInit {
    form: FormGroup
    bundleId: string
    appName: string
    buildNumber = 1

    validation_messages = {
        bundleId: [
            { type: "required", message: "Bundle ID is required" },
            { type: "pattern", message: "Bundle ID is invalid" }
        ],
        appName: [{ type: "required", message: "App Name is required" }],
        buildNumber: [
            { type: "required", message: "Build Number is required" },
            { type: "pattern", message: "Build Number must be numeric" }
        ]
    }

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddAppComponent>,
        @Inject(MAT_DIALOG_DATA) data
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            bundleId: [
                this.bundleId,
                [
                    Validators.required,
                    Validators.pattern(
                        /^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+[0-9a-z_]$/i
                    )
                ]
            ],
            appName: [this.appName, Validators.required],
            buildNumber: [
                this.buildNumber,
                [Validators.required, Validators.pattern("^[0-9]*$")]
            ]
        })
    }

    save() {
        if (this.form.dirty && this.form.valid) {
            this.dialogRef.close(this.form.value)
        }
    }

    close() {
        this.dialogRef.close()
    }
}
