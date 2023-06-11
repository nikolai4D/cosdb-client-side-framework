import { action_logoutRequest } from "./action_logoutRequest.mjs";
import { action_refreshToken } from "./action_refreshToken.mjs";

export default async function action_handleToken(tkn) {
    let getHeaders = {
        "Content-Type": "application/json",
        authorization: tkn,
    };

    try {
        const responseVerifyToken = await fetch("/api/verify", {
            method: "GET",
            headers: getHeaders,
        });
        //AccessToken is FALSE
        if ((await responseVerifyToken.ok) !== true) {
            await action_logoutRequest();
            //Clear sessionStorage (accessToken) and set jwt cookie (refreshToken) to expire in the past
            // sessionStorage.removeItem("accessToken");
            // localStorage.clear();
            // await fetch("/api/logout");
            // // navigateTo("/login");
            return false;
        } else {
            try {
                action_refreshToken();
                return true;
            } catch (err) {
                console.log(err);
            }        }
    } catch (err) {
        console.log(err);
    }
}
