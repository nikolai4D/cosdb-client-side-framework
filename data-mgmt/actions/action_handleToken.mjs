import { action_logoutRequest } from "./action_logoutRequest.mjs";
import { action_refreshToken } from "./action_refreshToken.mjs";

export async function action_handleToken(tkn) {
    let getHeaders = {
        "Content-Type": "application/json",
        authorization: tkn,
    };

    try {
        const responseVerifyToken = await fetch("/api/verify", {
            method: "GET",
            headers: getHeaders,
        });

        if ((await responseVerifyToken.ok) !== true) {
            await action_logoutRequest();
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
