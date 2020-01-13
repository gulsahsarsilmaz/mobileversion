import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"

import { Observable } from "rxjs"

import { map } from "rxjs/operators"

import { environment } from "../../environments/environment"

import { AppModel } from "../models/app"

const API_URL = environment.apiUrl

@Injectable({
    providedIn: "root"
})
export class VersionService {
    constructor(private http: HttpClient) {}

    addApp(app: AppModel): Promise<any> {
        return this.http.post(API_URL + "/add", app).toPromise()
    }

    getAllApps(): Observable<AppModel[]> {
        return this.http
            .get(API_URL + "/read")
            .pipe(map((res: AppModel[]) => res))
    }

    bumpApp(app: AppModel): Promise<any> {
        return this.http.post(API_URL + "/bump/" + app.bundleId, {}).toPromise()
    }

    setApp(app: AppModel): Promise<any> {
        return this.http.post(API_URL + "/set/", app).toPromise()
    }

    deleteApp(app: AppModel): Promise<any> {
        return this.http
            .delete(API_URL + "/delete/" + app.bundleId, {})
            .toPromise()
    }
}
