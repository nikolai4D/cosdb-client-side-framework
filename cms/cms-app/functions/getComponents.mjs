import { readComponents } from "../requests/readComponents.mjs";

export async function getComponents(types) {
    console.log(types, "types")
    let allComponents = {}

    for (const type of types) {
    
        let components = await readComponents(type)

        console.log(components)
    
            for (const component of components) {
                allComponents[type] = component;
        }
    }

    return allComponents;
}