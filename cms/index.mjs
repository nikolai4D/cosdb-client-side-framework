import { cms_app } from "./cms-app/cms-app.mjs";
import { getComponentsHierarchy } from "./cms-app/requests/getComponentsHierarchy.mjs";

console.log(getComponentsHierarchy());

window.onload = cms_app;
