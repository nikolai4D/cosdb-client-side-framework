
export function View() {

    // As it is a constructor, View itself cannot be async, Async functions needed for a view should be wrapped into methods (like the setView method below).

    this.title= "default title"
    this.template= null
    
    /**
     * Called by router. In most cases, should not be overridden.
     * @returns {Promise<void>}
     */
    this.setView= async function() {


        console.log(await this.template(), "this.template")
        console.log(this.template(), "this.template.getEelkent")

        console.log(this.template().getElement(), "this.template.getEelkent")

        console.log(await this.template(), "this.template")
        console.log(await (await this.template()).getElement(), "this.template.getEelkent")


        if(!this.template) throw new Error("View template is not set")
        if (!this.template.getElement) document.body.append(await (await this.template()).getElement())

        else document.body.append(this.template.getElement())

        document.title = this.title
    }

}