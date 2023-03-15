import model from '../model.json';
import { Controller } from "./Controller.mjs"
// import { importModuleFromFile } from '../node_modules/cosdb-client-framework/core/helpers.mjs';

export function processModel () {

    this.toRouter = model.views.map(view => {

        const viewTemplate = model.viewTemplates.find(
                                                        viewTemplate => 
                                                            viewTemplate.parentId === view.id
                                                    )

        const slots = model.slots.filter(
                                            slot => 
                                                slot.parentId === viewTemplate.id
                                        )

        for (let slot of slots) {
            let organisms = model.organisms.find(
                                                    organism => 
                                                        organism.parentId === slot.id
                                                )

            let molecules = model.molecules.find(
                                                    molecule => 
                                                        molecule.parentId === slot.id
                                                )

            let atoms = model.atoms.find(
                                            atom => 
                                                atom.parentId === slot.id
                                        )

            let component = [organisms, molecules, atoms].find(component => component !== undefined)
            slot.slot = component.value;
        }

        return {
            path: view.value,
            component: Controller(view.value, view.value, viewTemplate.value, slots)
        }
    })

}