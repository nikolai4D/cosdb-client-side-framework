import { readFunctions } from "../requests/readFunctions.mjs";

export async function getFunctions() {
    let functions = (await readFunctions()).map(
        (func) => func.name
    );

    return functions;
}