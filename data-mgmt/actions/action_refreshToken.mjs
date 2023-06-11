export async function action_refreshToken() {

            //AccessToken is TRUE, use RefreshToken to get new accessToken

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

                window.sessionStorage.setItem("accessToken", tokenNew);
            }
