import { View } from "../../core/View.mjs";
import { ViewTemplate_dummy1 } from "../../components/viewTemplates/ViewTemplate_dummy1.mjs";
import { ViewTemplate_dummy2 } from "../../components/viewTemplates/ViewTemplate_dummy2.mjs";
import { State } from "../State.mjs";
import { importModuleFromFile } from "../../core/helpers.mjs";
import { readModel } from "./readModel.mjs";



export function Controller() {
  View.call(this);


  this.childComponent = null;

  this.slotsFromModel = null;

  this.model = null;

  this.getComponent = async () => { 

    this.model = await readModel();

    // getting the view title from the url to get the view from model
    const path = window.location.pathname.slice(1)
    // getting the view from the model to get the id
    const view = this.model.views.find(view => view.value === path)
    // getting the viewTemplate from the model with the view id as parentId
    const viewTemplate = this.model.viewTemplates.find(viewTemplate => viewTemplate.parentId === view.id)
    // getting the name of the viewTemplate
    const file = viewTemplate.value;
    // getting the path to the viewTemplate prototype
    const pathToComponent = `../../components/viewTemplates/${file}.mjs`
    // importing the viewTemplate prototype

    const viewTemplateComponent = await importModuleFromFile(pathToComponent, file)

    this.slotsFromModel = this.model.slots.filter(slot => slot.parentId === viewTemplate.id)

    let component = new viewTemplateComponent[file]();

    return component

  }

  this.getSlots = async () => {

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

              // get the name of the organism from the model and import it from the organisms folder
              const fileOrganism = organismModel.value;
              const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`;
              const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
              let organismComp =  new organismComponent[fileOrganism]();

              // for that slot in viewTemplate, set component to be organism
              slot.component =  organismComp

              // next step would be to decide if the organism contains other organisms, molecules or atoms
              if(slot.component){

                // for viewTempalate slot that has an organism, loop through its organisms
                for (let subCompOrganism of organism.organisms) {

                  let subSubComp = subCompOrganism.component

                  console.log("subSubComp", subSubComp)

                  // get the organism from the model with the organism id as parentId
                  // const subOrganismModel = this.model.organisms.find(org => org.parentId === organismModel.id)

                  // if the organism exists in the model
                //   if (subOrganismModel) {

                //     organismComp.slot = organismModel.value;
                //     const fileOrganism = organismModel.value;
                //     const pathToComponent = `../../components/organisms/${fileOrganism}.mjs`;
                //     const organismComponent = await importModuleFromFile(pathToComponent, fileOrganism)
                //     let subCompOrganism =  new organismComponent[fileOrganism](specificComponent.id);
                // }
              }
            }

                          // if (organism.molecules) {
              //   console.log("contains molecules")
              // }

              // if (organism.atoms) {
              //   console.log("contains atoms")
              // }
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
