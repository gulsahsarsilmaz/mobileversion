import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { SetappComponent } from "./setapp.component"

describe("SetappComponent", () => {
    let component: SetappComponent
    let fixture: ComponentFixture<SetappComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SetappComponent]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SetappComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
