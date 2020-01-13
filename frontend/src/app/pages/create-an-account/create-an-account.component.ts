import { Component, OnInit, ViewChild } from "@angular/core"
import { MatProgressBar, MatButton } from "@angular/material"
import { Validators, FormGroup, FormControl } from "@angular/forms"
import { UserService } from "src/app/services/user.service"

@Component({
    selector: "app-create-an-account",
    templateUrl: "./create-an-account.component.html",
    styleUrls: ["./create-an-account.component.sass"]
})
export class CreateAnAccountComponent implements OnInit {
    @ViewChild(MatProgressBar) progressBar: MatProgressBar
    @ViewChild(MatButton) submitButton: MatButton

    createAccountForm: FormGroup
    hide = true
    newUser: any

    validation_messages = {
        username: [{ type: "required", message: "Username is required" }],
        password: [{ type: "required", message: "Password is required" }],
        email: [
            { type: "required", message: "Email is required" },
            { type: "pattern", message: "Email does not specify email pattern" }
        ]
    }

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.createAccountForm = new FormGroup({
            username: new FormControl("", Validators.required),
            email: new FormControl("", [
                Validators.required,
                Validators.pattern(
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
                )
            ]),
            password: new FormControl("", Validators.required)
        })
    }

    createAccount() {
        const createAccountData = this.createAccountForm.value
        console.log(createAccountData)
        this.submitButton.disabled = true
        this.progressBar.mode = "query"

        this.userService.createAccount(createAccountData).subscribe(res => {
            this.newUser = res
            console.log("Data from backend is: ", this.newUser)

            this.userService.token.next(this.newUser.token)
        })
    }
}
