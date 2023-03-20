

import { View } from "../../core/View.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";



export function Controller() {
  View.call(this);

  this.childComponent = null;

  this.slotsFromModel = null;

  this.model = null;

  this.getComponent = async function() {
    this.model = await readModel();
  
    // Get the view title from the URL to find the corresponding view from the model
    const path = window.location.pathname.slice(1);
  
    // Find the view in the model using the path
    const view = this.model.views.find(view => view.value === path);
    if (!view) {
      throw new Error(`View not found for path: ${path}`);
    }
  
    // Find the viewTemplate in the model using the view's ID as the parentId
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id);
    if (!viewTemplate) {
      throw new Error(`ViewTemplate not found for view ID: ${view.id}`);
    }
  
    // Get the name and path of the viewTemplate component file
    const file = viewTemplate.value;
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`;
  
    // Import the viewTemplate component
    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file);
  
    // Filter the slots based on the viewTemplate's ID
    this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id);
  
    // Instantiate the component
    let component = new viewTemplateComponent[file]();
  
    return component;
  };

  this.getComponents = async () => {}

  this.getSlots = async () => {

    const createComponent = async (type, file) => {
      const pathToComponent = `../../components/${type}/${file}.mjs`;
      const Component = await importModuleFromFile(pathToComponent, file)
      return new Component[file]();
    }

    const createAction = async (file) => {
      const pathToAction = `../../data-mgmt/actions/${file}.mjs`;
      const action = await importModuleFromFile(pathToAction, file)
      return action[file];
    }

    const processFunction = async (component, componentModel) => {
        let functionModels = this.model.functions.filter(func => func.parentId === componentModel.id);

        for (let func of functionModels) {
          let funcId = func.key.split(" ")[1]
          let compFunc = component.functions.find(aFunc => aFunc.id == funcId)
          compFunc.function = func.value
          compFunc.functionCall = await createAction(func.value);

        }

    }


    const processMolecules = async (subSubComp, subSubCompModels) => {
      for (let molecule of subSubComp.molecules) {
        let moleculeComponent = molecule.component;
        let moleculeModels = this.model.molecules.filter(mol => mol.parentId === subSubCompModels[0].id);
    
        if (moleculeComponent.functions) {
          // Perform necessary actions with moleculeComponent.functions

          let moleculeFunctions = molecule.functions;
          console.log(moleculeComponent)
          console.log(moleculeModels)
          console.log(subSubCompModels)

          let functionModels = this.model.functions.filter(func => func.parentId === subSubCompModels[0].id);

          console.log(functionModels)

        }
    
        if (moleculeComponent.atoms) {
          await processAtoms(moleculeComponent, moleculeModels);
        }
      }
    };
    
    const processAtoms = async (moleculeComponent, moleculeModels) => {
      for (let [index, atom] of moleculeComponent.atoms.entries()) {
        let atomComponent = atom.component;
        let atomModels = this.model.atoms.filter(at => at.parentId === moleculeModels[0].id);
    
        if (atomComponent.functions) {
          // Perform necessary actions with atomComponent.functions
        }
    
        if (atomComponent.value) {
          let atomValueModel = this.model.atomValues.find(at => at.parentId === atomModels[index].id);
          atomComponent.value = [{ value: atomValueModel.value }];
        }
      }
    };

    // get viewTemplate from model
    let component = this.childComponent

    // loop through slots in viewTemplate
    for (let slot of component.slots) {

      // get the slot from the model
        let specificSlot =  this.slotsFromModel.find(slotModel => slotModel.value === slot.slot)

        // if the slot exists in the model
        if (specificSlot) {

          // get the component from the model with the slot id as parentId
          let specificComponent = this.model.components.find(comp => comp.parentId === specificSlot.id)

          // if the component exists in the model
          if (specificComponent) {

            // find organism with the component id as parentId
            const organismModel = this.model.organisms.find(organism => organism.parentId === specificComponent.id)

            // find molecule with the component id as parentId
            const moleculeModel = this.model.molecules.find(molecule => molecule.parentId === specificComponent.id)

            // find atom with the component id as parentId
            const atomModel = this.model.atoms.find(atom => atom.parentId === specificComponent.id)


            // if the organism exists in the model
            if (organismModel) {
              // set the slot of viewTemplate to the be the value of the organism
              slot.slot = organismModel.value;
              // for that slot in viewTemplate, set component to be organism
              slot.component = await createComponent("organisms", organismModel.value)

              if (slot.component.functions){
                await processFunction(slot.component, organismModel)
              }

              // next step would be to decide if the organism contains other organisms, molecules or atoms
              if(slot.component){
                if (slot.component.organisms) {

                // for viewTempalate slot that has an organism, loop through its organisms
                for (let [index, subCompOrganism] of slot.component.organisms.entries()) {


                  let subSubComp = subCompOrganism.component
                  let subSubCompModels = this.model.organisms.filter(org => org.parentId === organismModel.id)

                  if (subSubCompModels.length > 1) console.log("more than one organism")

                  if (subSubComp.functions) 
                  {
                    let functionModels = this.model.functions.filter(func => func.parentId === subSubCompModels[index].id);

                    for (let func of functionModels) {
                      let action = await createAction(func.value)
                      // action.execute()
                    }
                  }


                  
                  if (subSubComp.molecules) {
                    await processMolecules(subSubComp, subSubCompModels);
                  }


              }
              }

              if (slot.component.molecules) {

                  for (let [index, subCompMolecule] of slot.component.molecules.entries()) {

                    let subSubSubComp = subCompMolecule.component
                    let subSubSubCompModels = this.model.molecules.filter(mol => mol.parentId ===  organismModel.id)

                    if (subSubSubCompModels.length > 1) console.log("more than one molecule")

                    if (subSubSubComp.functions) 

                    await processFunction(subSubSubComp, subSubSubCompModels[index])


                    // {
                    //   let functionModels = this.model.functions.filter(func => func.parentId === subSubSubCompModels[index].id);

                    //   for (let func of functionModels) {
                    //     let action = await createAction(func.value)
                    //     // action.execute()
                    //   }
                    // }

                    if (subSubSubComp.atoms){

                      for (let [index2, subCompAtom] of subSubSubComp.atoms.entries()) {

                        let subSubSubSubComp = subCompAtom.component
                        let subSubSubSubCompModels = this.model.atoms.filter(at => at.parentId === subSubSubCompModels[index].id)
      
                        if (subSubSubSubComp.functions) console.log(subSubSubSubComp.constructorKey, subSubSubSubComp.functions)
      
                        if (subSubSubSubComp.value) {

                          let subSubSubSubSubCompModels = this.model.atomValues.find(at => at.parentId === subSubSubSubCompModels[index2].id)

                          subSubSubSubComp.value = [{value: subSubSubSubSubCompModels.value}]


                        }


                        }

                    }
                    
                  }




              }

              if (slot.component.atoms) {


                  for (let [index, subCompAtom] of slot.component.atoms.entries()) {

                    let subSubSubSubComp = subCompAtom.component
                    let subSubSubSubCompModels = this.model.atoms.filter(at => at.parentId === organismModel.id)

                    if (subSubSubSubComp.functions) console.log(subSubSubSubComp.constructorKey, subSubSubSubComp.functions)

                    if (subSubSubSubComp.value) {

                      let subSubSubSubSubCompModels = this.model.atomValues.filter(at => at.parentId === subSubSubSubCompModels[0].id)

                      subSubSubSubComp.value = [{value: subSubSubSubSubCompModels[index].value}]

                    }


                    }

              }
          }

          }
          
          if (moleculeModel){

            // set the slot of viewTemplate to the be the value of the organism
            slot.slot = moleculeModel.value;
            // for that slot in viewTemplate, set component to be molecule
            slot.component = await createComponent("molecules", moleculeModel.value)

            // next step would be to decide if the molecule contains other molecules, molecules or atoms
            if(slot.component){
              if (slot.component.atoms) {

                      for (let [index, subCompAtom] of slot.component.atoms.entries()) {

                        let subSubSubSubComp = subCompAtom.component
                        let subSubSubSubCompModels = this.model.atoms.filter(at => at.parentId === moleculeModel.id)

                        if (subSubSubSubComp.functions) console.log(subSubSubSubComp.constructorKey, subSubSubSubComp.functions)
      
                        if (subSubSubSubComp.value) {

                          let subSubSubSubSubCompModels = this.model.atomValues.find(at => at.parentId === subSubSubSubCompModels[index].id)

                           subSubSubSubComp.value = [{value: subSubSubSubSubCompModels.value}]


                        }


                        }

                    }
                    
                  }

                }

          if (atomModel){

            // set the slot of viewTemplate to the be the value of the organism
            slot.slot = atomModel.value;
            // for that slot in viewTemplate, set component to be molecule
            slot.component = await createComponent("atoms", atomModel.value)

            // next step would be to decide if the molecule contains other molecules, molecules or atoms
            if(slot.component){
              if (slot.component.value) {

                          let atomValueModel = this.model.atomValues.find(at => at.parentId === atomModel.id)

                          slot.component.value = [{value: atomValueModel.value}]

                    }

                  }

                }
        }
        }
      }
  };

  this.bindNewScripts = async () => {
    let component = this.childComponent;

         component.bindScript = async function() {
          for await (let slot of component.slots) {
            if (await slot.component)
            await component.fillSlot(slot.slot, slot.component.getElement())
        }
      }
    };


  this.template = async () => {
    this.childComponent = await this.getComponent();
    await this.getSlots();
    await this.bindNewScripts();

     this.childComponent.model = this.model;

    return  this.childComponent ;

  }

}
