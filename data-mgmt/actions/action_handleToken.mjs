// import {navigateTo} from "../viewRouter.js";

export default async function handleToken(tkn) {
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
            //Clear sessionStorage (accessToken) and set jwt cookie (refreshToken) to expire in the past
            sessionStorage.removeItem("accessToken");
            localStorage.clear();
            await fetch("/api/logout");
            // navigateTo("/login");
            return false;
        } else {
            //AccessToken is TRUE, use RefreshToken to get new accessToken
            try {
                let responseRefreshToken = await fetch("/api/refresh", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                //Set new accessToken
                let tokenNew = `Bearer ${
                    ( await responseRefreshToken.json()).accessToken
                }`;

                console.log("TokenNew: " + tokenNew)

                window.sessionStorage.setItem("accessToken", tokenNew);
                return true;
            } catch (err) {
                console.log(err);
                console.log("error");
            }
        }
    } catch (err) {
        console.log("error");
    }
}
