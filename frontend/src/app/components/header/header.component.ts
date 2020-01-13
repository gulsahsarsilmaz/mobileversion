import { Component, OnInit } from "@angular/core"
import { MatIconRegistry } from "@angular/material/icon"
import { DomSanitizer } from "@angular/platform-browser"
import { UserService } from "src/app/services/user.service"

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
    title = "Mobile Version Manager"
    constructor(
        private matIconRegistry: MatIconRegistry,
        private domSanitizer: DomSanitizer,
        private userService: UserService
    ) {}

    ngOnInit() {}

    logout() {
        this.userService.logout().subscribe(res => {
            this.userService.token.next(res.token)
        })
    }
}
