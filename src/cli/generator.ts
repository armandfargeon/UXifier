import fs from 'fs';
import { CompositeGeneratorNode, processGeneratorNode } from 'langium';
import { extractDestinationAndName } from './cli-util';
import path from 'path';
import { App, Page, WidgetWrapper, Widget } from '../language-server/generated/ast';
import { StringBuilder } from '../utils/StringBuilder';

export function generateJavaScript(app: App, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;

    const fileNode = new CompositeGeneratorNode();

    const grommetAppGenerator = new GrommetAppGenerator();

    fileNode.append(grommetAppGenerator.compile(app));

    //model.greetings.forEach(greeting => fileNode.append(`console.log('Hello, ${greeting.person.$refText}!');`, NL));

    if (!fs.existsSync(data.destination)) {
        fs.mkdirSync(data.destination, { recursive: true });
    }
    fs.writeFileSync(generatedFilePath, processGeneratorNode(fileNode));
    return generatedFilePath;
}

class GrommetAppGenerator {

    /**
     * Entry point
     * @param app 
     * @returns code generated (app.js)
     */
    compile(app: App): string{
        return `
            //groomet app generated : ${app.name}
            ${this.dependencies()}
            ${this.headerDeclaration(app)}
            ${this.MenuDeclaration(app)}
            ${this.defineTheme(app)}
            function App() {
                return(
                    <Grommet plain>
                        <Box fill>
                            ${this.generateHeader(app)}
                        </Box>
                        ${this.generateMenu(app)}
                    </Grommet>
                );
            }
            export default App;
        `;
    }

    /**
     * Define dependencies
     * @returns dependencies as a string 
     * //todo le faire dynamiquement
     */
    dependencies(): string{
        return `import { Grommet, Box, Heading, Tabs, Tab } from 'grommet';`;
    }

    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /////////////////////////////// Generate Menu

    defineTheme(app: App): string{
        let sb: StringBuilder = new StringBuilder();
        sb.write(`
            const ${app.theme.name} = {
                global: { 
                    colors: {`);
        
        `${app.theme.colors.forEach((c) => { 
            sb.write(c.name);
            sb.write(": '");
            sb.write(c.code);
            sb.writeln("',");
        })}`;
    
        sb.writeln("}}}");
        return sb.toString();
    }

    /////////////////////////////// Generate Header

    generateHeader(app: App): string{
        return `${app.header} `?`
        <${this.capitalizeFirstLetter(app.header.name)}>
            <Heading level='${app.header.level}' margin='none'>${app.header.title}</Heading>
        </${this.capitalizeFirstLetter(app.header.name)}> `:` "s" `;
    }

    headerDeclaration(app: App): string{
        return `${app.header}` ?` const ${this.capitalizeFirstLetter(app.header.name)} = (props) => (
            <Box
                tag='header'
                direction='row'
                align='center'
                justify='between'
                background='brand'
                pad={{ left: 'medium', right: 'small', vertical: 'small' }}
                elevation='medium'
                style={{ zIndex: '1' }}
                {...props}
            />
        ); `:` "x"`;
    }

    ///////////////////////////////////MENU && WIDGET
    generateMenu(app: App): string{
        return `${app.menu} `?`
        <${this.capitalizeFirstLetter(app.menu.name)}></${this.capitalizeFirstLetter(app.menu.name)}> 
        `:
        ` "s" `;
    }

    MenuDeclaration(app:App){
        return `${app.menu}` ?` const ${app.menu.name} = (props) => (
        ${this.pagesDeclaration(app.menu.pages)}
        ); `:` "x"`;   
    }

    pagesDeclaration(pages:Page[]){
        let tabs = "\t\t<Tabs>\n"
        pages.forEach((page)=>{
            tabs += `\t\t\t<Tab  title="${page.title}">\n`+ this.PageDeclaration(page)+"\t\t\t</Tab>\n"
        })
        tabs+="\t\t</Tabs>\n"
        return tabs
    }

    PageDeclaration(page: Page){
        let pageWW = ""
        page.widgetWrappers.forEach(widget=>{
            pageWW += this.WidgetWrapperDeclaration(widget)
        })
        return pageWW;
    }

    WidgetWrappersDeclaration(widgetWrappers: WidgetWrapper[]){
        let widgetWrappersStr = "\t\t\t\t<Box> \n"
        widgetWrappers.forEach(widget=>{
            widgetWrappersStr += this.WidgetWrapperDeclaration(widget)
        })
        widgetWrappersStr += "\n\t\t\t\t</Box>"
        return widgetWrappersStr;
    }
    
    WidgetWrapperDeclaration(widgetWrapperObj: WidgetWrapper){
        let widgets = `\t\t\t\t\t<Box name="${widgetWrapperObj.name}" \n width="${widgetWrapperObj.width}"> \n`
        widgetWrapperObj.widgets.forEach(widgetObj=>{
            widgets += this.WidgetDeclaration(widgetObj)
        })
        widgets += "\n\t\t\t\t\t</Box>\n"
        return widgets;
    }

    WidgetDeclaration(widget?: Widget){
        if(widget == undefined){
            return ''
        }else{
            return `
            \t\t\t\t\t\t<Box>
            \t\t\t\t\t\t\t title: ${widget.title}
            \t\t\t\t\t\t\t description: ${widget.description}
            \t\t\t\t\t\t</Box>
            `
        }
    }
}
