import { Component } from "../../../core/Component.mjs";

export function Atom_Image(){
    Component.call( this );

    this.value = [{ value: "placeholder" }];

    this.getHtml = function ()
    {
        return `
        <img src="${this.value[0].value}" alt="project-image" class="atom_image" />`;
    };

}