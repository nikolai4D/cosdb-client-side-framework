import { Component } from "../../core/Component.mjs";


export function Atom_dummy1() {
  Component.call(this);

  this.value = [{ value: "placeholder" }];

  this.getHtml = function(){
    return `  <div>
      <h1>${this.value[0].value}</h1>
    </div>
  `;
}

}


// import { Component } from "../../core/Component.mjs";


// export function Atom_listItem(data=null) {
//   Component.call(this);

//   this.value = [{ value: "placeholder" }];

//   this.getHtml = function(){
//     return `<li>${data}</li>
//   `
// }

// }