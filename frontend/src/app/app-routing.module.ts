import { NgModule } from "@angular/core"
import { Routes, RouterModule } from "@angular/router"

import { NotfoundComponent } from "./pages/notfound/notfound.component"
import { VersionComponent } from "./pages/version/version.component"
import { HomeComponent } from "./pages/home/home.component"
import { NewTaskComponent } from "./pages/new-task/new-task.component"
import { LoginComponent } from "./pages/login/login.component"
import { CreateAnAccountComponent } from "./pages/create-an-account/create-an-account.component"

const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "new-task",
        component: NewTaskComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "create-an-account",
        component: CreateAnAccountComponent
    },
    {
        path: "version",
        component: VersionComponent
    },
    {
        path: "**",
        component: NotfoundComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
