import { Injectable } from "@angular/core"

import { HttpClient, HttpHeaders } from "@angular/common/http"

import { Observable, BehaviorSubject } from "rxjs"

import { map } from "rxjs/operators"
import "rxjs/add/operator/finally"

import { environment } from "../../environments/environment"

import { serialize, deserialize, plainToClass } from "class-transformer"

import { UserModel } from "../models/user"

const API_URL = environment.apiUrl2

@Injectable({
    providedIn: "root"
})
export class UserService {
    token: BehaviorSubject<string | null>
    user: BehaviorSubject<UserModel | null>
    constructor(private http: HttpClient) {
        this.token = new BehaviorSubject<string | null>(
            localStorage.getItem("token") || null
        )
        this.token.subscribe(token => {
            if (token) {
                localStorage.setItem("token", token)
            } else {
                localStorage.removeItem("token")
            }
        })

        this.user = new BehaviorSubject<any | null>(
            deserialize(UserModel, localStorage.getItem("user")) || null
        )
        this.user.subscribe(user => {
            if (user) {
                localStorage.setItem("user", serialize(user))
            } else {
                localStorage.removeItem("user")
            }
        })
    }

    getUsers(): Observable<UserModel[]> {
        return this.http
            .get(API_URL + "/users", {
                headers: new HttpHeaders().set(
                    "x-access-token",
                    localStorage.getItem("token")
                )
            })
            .pipe(map((res: UserModel[]) => res))
    }

    createAccount(user: UserModel): Observable<UserModel[]> {
        return this.http
            .post(API_URL + "/register/", user, {
                headers: new HttpHeaders().set(
                    "Content-Type",
                    "application/json"
                )
            })
            .pipe(map((res: any) => res))
    }

    getUser(): Observable<UserModel[]> {
        return this.http
            .get(API_URL + "/users", {
                headers: new HttpHeaders().set(
                    "x-access-token",
                    localStorage.getItem("token")
                )
            })
            .pipe(map((res: UserModel[]) => res))
    }

    login(user: UserModel): Observable<any> {
        return this.http
            .post(API_URL + "/login", user, {
                headers: new HttpHeaders().set(
                    "Content-Type",
                    "application/json"
                )
            })
            .pipe(map((res: any) => res))
    }

    logout(): Observable<any> {
        return this.http.get(API_URL + "/logout").pipe(map((res: any) => res))
    }

    isLoggedIn(): boolean {
        let token = localStorage.getItem("token")
        return token ? true : false
    }
}
