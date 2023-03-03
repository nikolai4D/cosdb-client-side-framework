export function Organism_dummy1() {
  Component.call(this);

  this.subComponents = [
    { type: "organism",
      title: "Organism_dummy2"
    },
    { type: "organism",
      title: "Organism_dummy3"
    }
  ]

  this.functions = [
    {
      function: "function3",
    },
    {
      function: "function4",
    }
  ]


  this.getHtml = function(){
    return `<div>
    <div>${this.subComponents[0].title}</div>
    <div>${this.subComponents[1].title}</div>
  </div>
  `;
  }
}

// export function Organism_dummy1() {
//   Component.call(this);

//   this.organisms = [
//     {
//       organism: "Organism_dummy2"
//     },
//     {
//       organism: "Organism_dummy3"
//     }
//   ]

//   this.functions = [
//     {
//       function: "function3",
//     },
//     {
//       function: "function4",
//     }
//   ]


//   this.getHtml = function(){
//     return `<div>
//     <div>${this.organisms[0].organism}</div>
//     <div>${this.organisms[1].organism}</div>
//   </div>
//   `;
//   }
// }