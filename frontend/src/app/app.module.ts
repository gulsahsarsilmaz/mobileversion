import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { HttpClientModule } from "@angular/common/http"

import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { FlexLayoutModule } from "@angular/flex-layout"

import { NgxDatatableModule } from "@swimlane/ngx-datatable"

import { ToastrModule } from "ngx-toastr"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { HeaderComponent } from "./components/header/header.component"
import { FooterComponent } from "./components/footer/footer.component"
import { HomeComponent } from "./pages/home/home.component"
import { NotfoundComponent } from "./pages/notfound/notfound.component"
import { AddAppComponent } from "./dialogs/addapp/addapp.component"
import { SetAppComponent } from "./dialogs/setapp/setapp.component"
import { ConfirmComponent } from "./dialogs/confirm/confirm.component"

import { ParticlesModule } from "angular-particle"
import { VersionComponent } from "./pages/version/version.component"
import { NewTaskComponent } from "./pages/new-task/new-task.component"
import { LoginComponent } from "./pages/login/login.component"
import { CreateAnAccountComponent } from "./pages/create-an-account/create-an-account.component"
import { MaterialModule } from "./modules/material/material.module"

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        NotfoundComponent,
        AddAppComponent,
        SetAppComponent,
        ConfirmComponent,
        VersionComponent,
        NewTaskComponent,
        LoginComponent,
        CreateAnAccountComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxDatatableModule,
        ToastrModule.forRoot(),
        AppRoutingModule,
        ParticlesModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [AddAppComponent, SetAppComponent, ConfirmComponent]
})
export class AppModule {}
