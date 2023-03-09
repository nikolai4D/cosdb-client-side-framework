
export function View() {

    // As it is a constructor, View itself cannot be async, Async functions needed for a view should be wrapped into methods (like the setView method below).

    this.title= "default title"
    this.template= null
    
    /**
     * Called by router. In most cases, should not be overridden.
     * @returns {Promise<void>}
     */
    this.setView= async function() {


        let awaitedTemaplte = await this.template()

        if(!this.template) throw new Error("View template is not set")
        if (!this.template.getElement) await document.body.append(await awaitedTemaplte.getElement())

        else document.body.append(this.template.getElement())

        document.title = this.title
    }

}