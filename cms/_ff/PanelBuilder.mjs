export function buildArchitectPanel(schema, architect, constructorMap){
    let panel = document.createElement("div")

    let saveButton = document.createElement("button")
    saveButton.innerText = "Save"
    saveButton.addEventListener("click", () => architect.outputJSON())

    let componentPanel = buildElementPanelFromSchema(schema, architect, constructorMap)

    panel.appendChild(saveButton)
    panel.appendChild(componentPanel)

    return panel
}

export function buildElementPanelFromSchema(schema, architect, constructorMap){

    let panel = document.createElement("div")
    panel.setAttribute("data-id", schema.id)

    let constructorPanel = buildConstructorPanel(schema.constructorKey, constructorMap, architect, schema.id)
    let optionsPanel = buildOptionsPanel(schema.options, architect, schema.id)
    let subComponentsPanel = buildSubComponentsPanel(schema.subComponents, architect, constructorMap)

    panel.appendChild(constructorPanel)
    panel.appendChild(optionsPanel)
    panel.appendChild(subComponentsPanel)

    return panel
}

export function buildConstructorPanel(constructorKey, constructorMap, architect, id){

    let constructorPanel = document.createElement("div")
    let constructorLabel = document.createElement("label")
    constructorLabel.innerText = "constructorKey: "
    constructorPanel.appendChild(constructorLabel)

    let constructorSelect = document.createElement("select")
    constructorSelect.addEventListener("change", (event) => onConstructorChange(architect, id, event.target.value))
    constructorPanel.appendChild(constructorSelect)


    for(let key of constructorMap.keys()){

        let option = document.createElement("option")
        option.value = key
        option.innerText = key
        constructorSelect.appendChild(option)

        if(key === constructorKey){
            option.selected = true
        }
    }

    return constructorPanel
}

export function buildOptionsPanel(options, architect, id){
    let optionPanel = document.createElement("div")
    addSectionTitle(optionPanel, "Options")

    let optionsList = document.createElement("ul")

    for(let key in options){

        let option = document.createElement("li")
        option.innerText = key
        let input = document.createElement("input")
        input.value = options[key]
        input.addEventListener("change", (event) => onOptionChange(architect, id, key, event.target.value))
        option.appendChild(input)
        optionsList.appendChild(option)
    }

    optionPanel.appendChild(optionsList)

    return optionPanel
}

export function buildSubComponentsPanel(subComponentsSchema, architect, constructorMap){
    let subComponentsPanel = document.createElement("div")
    addSectionTitle(subComponentsPanel, "Subcomponents")

    let list = document.createElement("ul")
    for(let key in subComponentsSchema){
        let subComponent = buildElementPanelFromSchema(subComponentsSchema[key], architect, constructorMap)

        let listItem = document.createElement("li")
        listItem.appendChild(subComponent)
        list.appendChild(listItem)
    }

    subComponentsPanel.appendChild(list)
    return subComponentsPanel
}

export function addSectionTitle(HtmlElement, sectionHeadingText){
    let sectionHeading = document.createElement("h3")
    sectionHeading.innerText = sectionHeadingText
    HtmlElement.appendChild(sectionHeading)
}

export function onConstructorChange(architect, id, newConstructorKey){
    architect.onConstructorUpdate(id, newConstructorKey)
}

export function onOptionChange(architect, id, optionKey, optionValue){
    architect.onOptionUpdate(id, optionKey, optionValue)
}