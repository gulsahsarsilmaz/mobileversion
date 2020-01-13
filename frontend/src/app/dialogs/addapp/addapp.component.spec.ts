import { async, ComponentFixture, TestBed } from "@angular/core/testing"

import { AddappComponent } from "./addapp.component"

describe("AddappComponent", () => {
    let component: AddappComponent
    let fixture: ComponentFixture<AddappComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddappComponent]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(AddappComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it("should create", () => {
        expect(component).toBeTruthy()
    })
})
