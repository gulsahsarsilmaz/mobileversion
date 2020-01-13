import { Component, OnInit, ViewChild, ElementRef } from "@angular/core"

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.sass"]
})
export class HomeComponent implements OnInit {
    @ViewChild("someVar")
    el: ElementRef
    myStyle: object = {}
    myParams: object = {}
    width: number = 100
    height: number = 100
    constructor() {}

    ngOnInit() {
        this.myStyle = {
            position: "fixed",
            width: "100%",
            height: "100%",
            "z-index": -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }

        this.myParams = {
            particles: {
                number: {
                    value: 200
                },
                color: {
                    value: "#ff0000"
                },
                shape: {
                    type: "triangle"
                }
            }
        }
    }
}
