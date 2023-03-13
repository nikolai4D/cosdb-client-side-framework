import {stringToHTMLElement} from "./helpers.mjs";

export function Component(options = {}){

    /**
     * a reference to the main DOM element of this component. Preferably, use getElement() instead.
     */
    this.element= null
    this.id = null
    this.constructorKey = this.constructor.name // Should be overridden to avoid unwanted behavior when minifying.
    this.subComponents = {}
    this.options = {}


    /**
     * Make sure the returned string have only one component at the top level
     * @returns <string>
     */
     this.getHtml = function() { return `
        <div>
            <h1>default component content</h1>
        </div>
        `
     }


    /**
     * Add js to the component
     * @returns <void>
     */
    this.bindScript= function(){

    }

    this.applyStyle= function(){
        if (this.options?.cssClasses) this.element.classList.add(this.options.cssClasses)
    }

    /**
     * Get the DOM element of the component. Init the element if it is not already done.
     * param <boolean> forceInit if true, the element will be reinitialized
     * @returns <Element>
     */
    this.getElement = async function(forceInit = false){

        if(!this.element || forceInit){
            this.setComponentsToString()
            this.element = stringToHTMLElement(this.getHtml())
            this.deSetComponentsFromString()
            this.bindSlots()
            await this.bindScript()
            this.applyStyle()

            if(this.id) this.element.id = this.id
        }

        return  this.element
    }


    /**
     * Remove the element from the DOM. Can be overridden to do other things.
     * @returns <void>
     */
    this.removeElement= function() {
        if(this.element) this.element.remove()
    }

    /**
     * Replace this component s element by a new one.
     * Also replace it in the dom.
     * The new element is created in the same way as the old one, if component data
      */
    this.updateElement = function(){
        let oldElement = this.element
        this.element = this.getElement(true)
        if(oldElement) oldElement.replaceWith(this.element)
    }

    this.slot = function(component) {
        if(this.isString(component)){
            return `<div data-slot="${component}" class="slot"></div>`
        }
        let key
        try {
            key = Object.keys(this.subComponents).find(key => this.subComponents[key] === component)
        } catch (e) {
            console.error("Error while finding key for component: ", component, "while trying to fill slot",
                "key: ", key,
                "subComponents keys: ", Object.keys(this.subComponents))
        }
        return `<div data-slot="${key}" class="slot"></div>`
    }

      /**
     * Replace the designated slot with the given element
     * @param slotName {String}
     * @param element {HTMLElement}
     */
      this.fillSlot= function(slotName, element) {

        if(!this.element) throw new Error("Cannot fill slot before the element is defined.")

        const slot = this.element.querySelector(`[data-slot="${slotName.toString()}"]`)
        if(!slot) throw new Error(`Slot ${slotName} not found`)
        slot.replaceWith(element)
    }


    /**
     * Replace the designated slots with the given elements
     * @param slotMap {Map<String,HTMLElement>}
     */
    this.fillSlots= function (slotMap) {
        for(let [slotName, element] of slotMap){ this.fillSlot(slotName, element) }
    }



    this.setComponentsToString = function() {
        if(!Object.values(this.subComponents).every(v => v === null)) return;
        for(const [key, value] of Object.entries(this.subComponents)){
            this.subComponents[key] = key
        }
    }

    this.deSetComponentsFromString = function() {
        if(!Object.values(this.subComponents).every(v => this.isString(v))) return;
        for(const [key, value] of Object.entries(this.subComponents)){
            this.subComponents[key] = null
        }
    }

    this.bindSlots = function(){
        let slots = Array.from(this.element.querySelectorAll("[data-slot]"))

        slots.forEach(slot => {
            let key
            try{
                key = slot.getAttribute("data-slot")
                if(this.subComponents[key]){
                    // slot.replaceWith(this.subComponents[key].getElement())
                    // const slotName = slot.attributes["data-slot"].value
                    this.fillSlot(key, this.subComponents[key].getElement());
                }
                else {
                    console.warn("No subComponent found for slot: " + key)
                }
            } catch (e) {
                console.error("Error while binding slot: ", key, slot,
                    "subComponents keys: ", Object.keys(this.subComponents),
                    e)
            }
        })
    }

         /**
     * Create child components
     * @returns <void>
     */
         this.treeCreateComponents= function() {
            for(const [key, value] of Object.entries(this.model)){
                const newSubCompInstance = new value.component(value)
                this.subComponents[key] = newSubCompInstance
            }
        }
    
        // this.bindSlots= function() {
        //     if(!this.element) throw new Error("Cannot fill slot before the element is defined.")
    
        //     const slots = this.element.querySelectorAll(`[data-slot"]`)
    
        //     slots.forEach(element => {
        //         const slotName = element.attributes["data-slot"].value
        //         this.fillSlot(slotName, this.subComponents[slotName].getElement());
        //     });
        //     //this.fillSlot("organism_startInfo", organism_startInfo.getElement());
        //     //this.fillSlot("organismLoginOrSignup", organism_loginOrSignup.getElement());
        // };
    
    

        

    /**
     *
     * @param id
     * @returns {{parentComponent: Component, key: String, foundComponent: Component}}
     */
    this.findComponentDataById= function(id){

        if(this.id === id) return { parentComponent: null, key: null,  foundComponent: this};
        else {
            for (let key in this.subComponents) {
                let component = this.subComponents[key]
                if(component === null) return {parentComponent: this, key: key,  foundComponent: null};
                if(component.id === id) return {parentComponent: this, key: key, foundComponent: component}
                else {
                    let result = component.findComponentDataById(id)
                    if(result) return result
                }
            }
        }

    }

    this.defaultSlotName = varObj => Object.keys(varObj)[0]

    this.isString = myVar => typeof myVar === 'string' || myVar instanceof String
}