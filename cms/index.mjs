import { cms_app } from "./cms-app/cms-app.mjs";
import { getComponentsHierarchy } from "./cms-app/requests/getCompoentsHierarchy.mjs";

const path = "/../../../node_modules/cosdb-client-framework/components";
console.log(getComponentsHierarchy(path + "/dir"));

window.onload = cms_app;
