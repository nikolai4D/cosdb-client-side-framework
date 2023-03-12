import { State } from "../State.mjs";

export async function mutation_initializeState(model) {
  State.views = model.views;
  State.viewTemplates = model.viewTemplates;
  State.slots = model.slots;
  State.components = model.components;
  State.organisms = model.organisms;
  State.molecules = model.molecules;
  State.atoms = model.atoms;
  State.atomValues = model.atomValues;
  State.functions = model.functions;

  console.log(State);
}
