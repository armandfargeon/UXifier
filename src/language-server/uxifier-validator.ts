import { isCrossReference, ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { AbstractWidget, isFQN, App, UxifierAstType } from './generated/ast';
import { UxifierServices } from './uxifier-module';
import { datas } from './data/data'
import fs from "fs";

/**
 * Map AST node types to validation checks.
 */
type UxifierChecks = { [type in UxifierAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class UxifierValidationRegistry extends ValidationRegistry {
    constructor(services: UxifierServices) {
        super(services);
        const validator = services.validation.UxifierValidator;
        const checks: UxifierChecks = {
            AbstractWidget: validator.checkWidget,
            App: [validator.checkColor,validator.checkPath]
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class UxifierValidator {
    checkWidget(widget: AbstractWidget, accept: ValidationAcceptor): void {
        let isFound = false;
        const widgetsNames = Object.entries(datas).map(([arr, exported])=> arr) 
        Object.entries(widgetsNames).forEach(([index, name]) => {
            if(name == widget.name){
                isFound = true;
            }
        });
        if(!isFound){
            accept('warning', `Widget ${widget.name} does not exists.`, { node: widget, property: 'name' }); 
            accept('info', `Please use one of these following widgets: {${widgetsNames.toString()}}.`, { node: widget, property: 'name' }); 
        }
	}

    checkColor(app: App, accept: ValidationAcceptor): void{
        let colors : (string|undefined)[] = []
        if(isFQN(app.header.color)){
            if(isCrossReference(app.header.color.$cstNode?.feature)){
                for(const colorTheme of app.theme.colors){
                    let textColor = app.header.color.$cstNode?.text
                    colors.push(textColor)
                    if(textColor?.split(".").pop() === colorTheme.name){
                        return;
                    }
                }
            }
        }
        accept('warning', `This color does not exists in ${app.theme.name} theme.`, { node: app.header, property: 'color' }); 
        accept('info', `Please use one of these following colors: {${colors.toString().replaceAll(',', ', ')}}.`, { node: app.header, property: 'color' }); 
    }

    checkPath(app: App, accept: ValidationAcceptor){
        if (!fs.existsSync(app.path)) {
            accept('warning', `Path ${app.path} does not exists.`, { node: app, property: 'path' }); 
            accept('info', `Please specify the path of you're working Grommet App.`, { node: app, property: 'path' }); 
        }
    }
}
