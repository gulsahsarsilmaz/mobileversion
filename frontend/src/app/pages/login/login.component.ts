import { Component, OnInit, ViewChild } from "@angular/core"
import { MatProgressBar, MatButton } from "@angular/material"
import { Validators, FormGroup, FormControl } from "@angular/forms"
import { UserService } from "src/app/services/user.service"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
    @ViewChild(MatProgressBar) progressBar: MatProgressBar
    @ViewChild(MatButton) submitButton: MatButton

    loginForm: FormGroup
    hide = true
    user: any

    validation_messages = {
        username: [{ type: "required", message: "Username is required" }],
        password: [{ type: "required", message: "Password is required" }]
    }

    constructor(
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            username: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required)
        })
    }

    login() {
        const loginData = this.loginForm.value
        console.log(loginData)
        this.progressBar.mode = "query"

        this.userService.login(loginData).subscribe(
            loggedInUser => {
                this.user = loggedInUser

                console.log("Users are : ", this.user)
                this.toastr.success("Successfully Logges In", "User Logged In")
                this.userService.token.next(this.user.token)

                this.router.navigate(["/version"])
            },
            err => {
                this.toastr.success(
                    "There was a problem logging in",
                    "Error Logging In"
                )
            }
        )
    }

    cancel() {
        this.router.navigate(["/home"])
    }
}
