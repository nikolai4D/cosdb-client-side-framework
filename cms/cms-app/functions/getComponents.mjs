import { readComponents } from "../requests/readComponents.mjs";

export async function getComponents(type) {
    let components = (await readComponents(type)).map(
        (component) => component.name
    );

    return components;
}