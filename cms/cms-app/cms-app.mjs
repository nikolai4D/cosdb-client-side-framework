import { createViewButton } from "./functions/createViewButton.mjs";
import { State } from "./State.mjs"
// import { read } from "./_2_read/read.mjs";
// import { update } from "./_3_update/update.mjs";
// import { delete } from "./_4_delete/delete.mjs";

export async function cms_app() {
  await createViewButton();
  console.log({State})
  // await read();
  // await update();
  // await delete();
}
