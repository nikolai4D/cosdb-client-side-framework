import {Component} from "../../core/Component.mjs";

export function t_Split() {
    Component.call(this)

    this.subComponents= {
        left_panel : null,
        right_panel: null
    }

    this.options= {

    }

    this.getHtml = function() {

        return `
            <div class="grid grid__c3r3 template_start">
                <div class="grid-placement__c1r1-3">
                    ${this.slot(this.subComponents.left_panel)}
                </div>
                <div class="grid-placement__c2-3r2">
                    ${this.slot(this.subComponents.right_panel)}
                </div>
            </div>
        `
    }

}