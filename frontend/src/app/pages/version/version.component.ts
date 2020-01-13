import { Component, OnInit, ViewChild } from "@angular/core"

import { MatDialog, MatDialogConfig } from "@angular/material"

import { DatatableComponent } from "@swimlane/ngx-datatable"

import { ToastrService } from "ngx-toastr"

import { AddAppComponent } from "../../dialogs/addapp/addapp.component"
import { SetAppComponent } from "../../dialogs/setapp/setapp.component"
import { ConfirmComponent } from "../../dialogs/confirm/confirm.component"

import { VersionService } from "../../services/version.service"

import { AppModel } from "../../models/app"

@Component({
    selector: "app-version",
    templateUrl: "./version.component.html",
    styleUrls: ["./version.component.sass"]
})
export class VersionComponent implements OnInit {
    constructor(
        private dialog: MatDialog,
        private versionService: VersionService,
        private toastr: ToastrService
    ) {}
    temp = []
    apps: AppModel[] = []

    filterApp = ""

    columns = [
        { name: "Bundle ID", prop: "bundleId" },
        { name: "App Name", prop: "appName" },
        { name: "Bundle Number", prop: "buildNumber" }
    ]

    @ViewChild(DatatableComponent)
    table: DatatableComponent

    ngOnInit() {
        this.loadAllApps()
    }

    loadAllApps() {
        this.versionService.getAllApps().subscribe(apps => {
            this.table.offset = 0

            this.temp = [...apps]

            this.apps = apps
        })
    }

    openAddAppDialog() {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.autoFocus = true

        dialogConfig.data = {}

        const dialogRef = this.dialog.open(AddAppComponent, dialogConfig)

        dialogRef.afterClosed().subscribe(data => this.createApp(data))
    }

    createApp(data) {
        if (!data) {
            return
        }

        this.versionService
            .addApp(data)
            .then(() => {
                this.toastr.success(
                    "Your new app has been created!",
                    "App Created"
                )

                this.loadAllApps()
            })
            .catch(err => {
                if (err.status === 400 && err.error.error) {
                    this.toastr.error(err.error.error, "Error Creating App")
                } else {
                    this.toastr.error(err.statusText, "Error Creating App")
                }
            })
    }

    bump(app) {
        this.versionService.bumpApp(app).then(() => {
            this.toastr.success(
                `The build number for ${app.appName} has been bumped`,
                "Build Number Bumped"
            )

            this.loadAllApps()
        })
    }

    setBuildNumber(app) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.autoFocus = true

        dialogConfig.data = {
            app: app
        }

        const dialogRef = this.dialog.open(SetAppComponent, dialogConfig)

        dialogRef.afterClosed().subscribe(data => this.setApp(app, data))
    }

    setApp(app, data) {
        if (!data) {
            return
        }

        var tempApp = { ...app }

        tempApp.buildNumber = data.buildNumber

        this.versionService
            .setApp(tempApp)
            .then(() => {
                this.toastr.success(
                    `The build number for ${app.appName} has been set to ${
                        data.buildNumber
                    }`,
                    "Build Number Set"
                )

                this.loadAllApps()
            })
            .catch(err => {
                if (err.status === 400 && err.error.error) {
                    this.toastr.error(
                        err.error.error,
                        "Error Setting Build Number"
                    )
                } else {
                    this.toastr.error(
                        err.statusText,
                        "Error Setting Build Number"
                    )
                }
            })
    }

    updateFilter() {
        const val = this.filterApp.toLowerCase()

        const temp = this.temp.filter(function(d) {
            return (
                !val ||
                d.appName.toLowerCase().indexOf(val) !== -1 ||
                d.bundleId.toLowerCase().indexOf(val) !== -1
            )
        })

        this.apps = temp

        this.table.offset = 0
    }

    clearFilter() {
        this.filterApp = ""
        this.updateFilter()
    }

    deleteApp(app) {
        const dialogConfig = new MatDialogConfig()

        dialogConfig.autoFocus = true

        dialogConfig.data = {
            title: "Deleting App",
            message:
                "You are about to delete <strong><em>" +
                app.appName +
                " apps" +
                "</em></strong>, are you sure?"
        }

        const dialogRef = this.dialog.open(ConfirmComponent, dialogConfig)

        dialogRef.afterClosed().subscribe(response => {
            if (response) {
                this.versionService.deleteApp(app).then(() => {
                    this.toastr.success(
                        `App ${app.appName} has been deleted`,
                        "App Deleted"
                    )

                    this.loadAllApps()
                })
            }
        })
    }
}
