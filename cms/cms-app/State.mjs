import { writeModel } from "./requests/writeModel.mjs"

export let State = {
        

        views: [],
        viewTemplates: [],
        components: [],
        slots: [],
        organisms: [],
        molecules: [],
        atoms: []

}


export const mutation = {

} 


export const action = {
    create: async function (id, value, parentId, type) {
        console.log({State})
        console.log({type})
        try {
            State[type].push({
                id,
                value,
                parentId
            });
        }
        catch(error) {
            console.log("error in updateModel", error);
        }
    },
    updateModel: async function (data) {
        console.log({State})
            try {
                await writeModel(data);
            }
            catch {
                console.log("error in updateModel");
            }
        },
    // read: async () => {
    //     try {
    //         const response = await fetch("/read");
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error("An error occurred while fetching the data:", error);
    //     }
    // },
    // update: async (type, id, value, parentId) => {
    //     try {
    //         let existingModel = await readModel();
    //         existingModel[type].push({
    //             id,
    //             value,
    //             parentId
    //         });
    //         let newModel = existingModel;
    //         await writeModel(newModel);
    //     }
    //     catch {
    //         console.log("error in updateModel");
    //     }
    // },
    // delete: async (type, id) => {
    //     try {
    //         let existingModel = await readModel();
    //         existingModel[type].push({
    //             id,
    //             value,
    //             parentId
    //         });
    //         let newModel = existingModel;
    //         await writeModel(newModel);
    //     }
    //     catch {
    //         console.log("error in updateModel");
    //     }
    // }
}
