import { readComponents } from "../requests/readComponents.mjs";

export async function getComponents(type) {
    return (await readComponents(type)).map(
        (component) => component.name
    );
}