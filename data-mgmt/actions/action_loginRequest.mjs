// import {navigateTo} from "../viewRouter.js";
import { action_routeToView } from "./action_routeToView.mjs";

export async function action_loginRequest (emailAndPwd) {

  const { email, pwd} = emailAndPwd

  console.log("login req entered");
  try {
    const responseAuth = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, pwd }),
    });
    
    if (!responseAuth.ok) {
      if (responseAuth.status === 401) {
        alert("Unauthorized");
        return false;
      }
      throw new Error(
        `status: ${responseAuth.status}, status text: ${responseAuth.statusText}`
      );
    }

    const token = `Bearer ${(await responseAuth.json()).accessToken}`;
    sessionStorage.setItem("accessToken", token);
    
    action_routeToView("process");
  } catch (err) {
    console.log("error: " + err.message);
  }
}
