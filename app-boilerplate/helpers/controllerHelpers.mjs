export function throwErrorIfUndefined(obj) {
    if (!obj) {
      throw new Error(`Object not found`);
    }
  }

export const addAtomComponent = async (slotComp, foundModelAtom, model) => {
    slotComp.slot = foundModelAtom.value;
    slotComp.component = await createComponent("atoms", foundModelAtom.value);
    if (slotComp.component) {
        assignAtomValue(model.atomValues, slotComp.component, [foundModelAtom], 0);
    }
}

export const addMoleculeComponent = async (slotComp, foundModelMolecule, model) => {
    slotComp.slot = foundModelMolecule.value;
    slotComp.component = await createComponent("molecules", foundModelMolecule.value);
    if (slotComp.component.atoms) {
        processAtoms(model, slotComp.component, [foundModelMolecule]);
    }
}

export const addOrganismComponent = async (slotComp, foundModelOrganism, model) => {
    slotComp.slot = foundModelOrganism.value;
    slotComp.component = await createComponent("organisms", foundModelOrganism.value);
    if (slotComp.component.organisms) {
        processOrganisms(model, slotComp.component, foundModelOrganism);
    }
    if (slotComp.component.molecules) {
        processMolecules(model, slotComp.component, [foundModelOrganism]);
    }
    if (slotComp.component.atoms) {
        processAtoms(model, slotComp.component, foundModelSlotsForViewTemplate);
    }
    if (slotComp.component.functions) {
        await processFunction(model, slotComp.component, foundModelOrganism);
    }
}

export const createComponent = async (type, file) => {
    const pathToComponent = `../../components/${type}/${file}.mjs`;
    const Component = await importModuleFromFile(pathToComponent, file)
    return new Component[file]();
}

export const createAction = async (file) => {
    const pathToAction = `../../data-mgmt/actions/${file}.mjs`;
    const action = await importModuleFromFile(pathToAction, file)
    return action[file];
}

export const processFunction  = async (model, component, componentModel) => {
    const foundModelFunctions = model.functions.filter(func => func.parentId === componentModel.id);

    for (const func of foundModelFunctions) {
        const funcId = func.key.split(" ")[1]
        const compFunc = component.functions.find(aFunc => aFunc.id == funcId)
        compFunc.function = func.value
        compFunc.functionCall = await createAction(func.value)
        compFunc.parameters = func.parameters;
    }
}

export const processOrganisms = async (model, comp, foundModelParent) => {
    for (const [index, organism] of comp.organisms.entries()) {
        const organismComponent = organism.component
        const foundModelOrganisms = model.organisms.filter(org => org.parentId === foundModelParent.id)

        if (organismComponent.functions) processFunction(this.model, organismComponent, foundModelOrganisms[index])
        if (organismComponent.molecules) await processMolecules(this.model, organismComponent, foundModelOrganisms);

    }
};

export const processMolecules = async (model, comp, foundModelParent) => {
    for (const [index, molecule] of comp.molecules.entries()) {
        const moleculeComponent = molecule.component;
        let parent = foundModelParent[0]
        if (foundModelParent.length > 1) {
            parent =  foundModelParent[index]
        }
        const foundModelMolecules = model.molecules.filter(mol => mol.parentId === parent.id);
        if (moleculeComponent.functions) processFunction(model, moleculeComponent, parent)
        if (moleculeComponent.atoms) await processAtoms(model, moleculeComponent, [foundModelMolecules[index]]);
    }
    };

export const processAtoms = async (model, moleculeComponent, foundModelMolecules) => {
    for (const [index, atom] of moleculeComponent.atoms.entries()) {
        const atomComponent = atom.component;
        const foundModelAtoms = model.atoms.filter(at => at.parentId === foundModelMolecules[0].id);

        assignAtomValue(model.atomValues, atomComponent, foundModelAtoms, index)
    }
};

export function assignAtomValue(atomValuesModel, atomComp, foundModelAtoms, index) {
    if (atomComp.value) {
        const matchedAtomValue = atomValuesModel.find(at => at.parentId === foundModelAtoms[index].id);
        atomComp.value = [{ value: matchedAtomValue.value }];
    }
}
