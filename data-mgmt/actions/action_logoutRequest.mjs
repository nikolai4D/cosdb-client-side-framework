import { action_routeToView } from "./action_routeToView.mjs";
import { State } from "../State.mjs";

export async function action_logoutRequest() {
    //Clear sessionStorage (accessToken) and set jwt cookie (refreshToken) to expire in the past
    sessionStorage.clear();
    await fetch("/logout");

    //Clear State
    for (const key in State) {
        delete State[key]
    }
    State.accessToken = undefined;

    //Redirection Part
}