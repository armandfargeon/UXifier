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
    compile(app: App): string {
        return `
            //groomet app generated : ${app.name}
            ${this.dependencies()}
            ${this.declarationComponents(app)}
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
    dependencies(): string {
        return `import { Grommet, Box, Heading, Tabs, Tab, Image, Text } from 'grommet'; \n
                import { statscovid, statlicenciement } from './data/data' \n`;
    }

    capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /////////////////////////////// Generate Menu

    defineTheme(app: App): string {
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

    generateHeader(app: App): string {
        return `${app.header} ` ? `
        <${this.capitalizeFirstLetter(app.header.name)}>
            <Heading level='${app.header.level}' margin='none'>${app.header.title}</Heading>
        </${this.capitalizeFirstLetter(app.header.name)}> ` : ` "s" `;
    }

    headerDeclaration(app: App): string {
        return `${app.header}` ? ` const ${this.capitalizeFirstLetter(app.header.name)} = (props) => (
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
        ); `: ` "x"`;
    }

    ///////////////////////////////////MENU && WIDGET
    generateMenu(app: App): string {
        return `${app.menu} ` ? `
        <${this.capitalizeFirstLetter(app.menu.name)}></${this.capitalizeFirstLetter(app.menu.name)}> 
        `:
            ` "s" `;
    }

    MenuDeclaration(app: App) {
        return `${app.menu}` ? ` const ${app.menu.name} = (props) => (
        ${this.pagesDeclaration(app.menu.pages)}
        ); `: ` "x"`;
    }

    pagesDeclaration(pages: Page[]) {
        let sb: StringBuilder = new StringBuilder();
        sb.write("\t\t<Tabs>\n")
        pages.forEach((page) => {
            sb.write(`\t\t\t<Tab  title="${page.title}">\n` + this.PageDeclaration(page) + "\t\t\t</Tab>\n")
        })
        sb.write("\t\t</Tabs>\n")
        return sb.toString()
    }

    PageDeclaration(page: Page) {
        let pageWW = ""
        page.widgetWrappers.forEach(widget => {
            pageWW += this.WidgetWrapperDeclaration(widget)
        })
        return pageWW;
    }

    WidgetWrappersDeclaration(widgetWrappers: WidgetWrapper[]) {
        let widgetWrappersStr = "\t\t\t\t<Box> \n"
        widgetWrappers.forEach(widget => {
            widgetWrappersStr += this.WidgetWrapperDeclaration(widget)
        })
        widgetWrappersStr += "\n\t\t\t\t</Box>"
        return widgetWrappersStr;
    }

    WidgetWrapperDeclaration(widgetWrapperObj: WidgetWrapper) {
        let widgets = `\t\t\t\t\t<Box name="${widgetWrapperObj.name}" \n width="${widgetWrapperObj.width}"> \n`
        widgetWrapperObj.widgets.forEach(widgetObj => {
            widgets += this.generateWidgets(widgetObj)
        })
        widgets += "\n\t\t\t\t\t</Box>\n"
        return widgets;
    }

    WidgetDeclaration(widget?: Widget) {
        if (widget == undefined) {
            return ''
        } else {
            return `
            \t\t\t\t\t\t<Box>
            \t\t\t\t\t\t\t title: ${widget.title}
            \t\t\t\t\t\t\t description: ${widget.title}
            \t\t\t\t\t\t</Box>
            `
        }
    }

    generateWidgets(widget: Widget): string {
        if (`${widget.$type}` === "WidgetClassique") { // widget classic
            return this.generateWidgetClassic(widget);
        } else { // others types widget 
            console.log(widget);
            return "other type";
        }
    }

    generateWidgetClassic(widget: Widget): string {
        return "<WidgetClassic data={" + `${widget.name}` + "}/>"
    }

    declareConst(name: string): string {
        return "export const " + name + "= ({ data }) => (";
    }

    generateWidgetClassicComponent(): string {
        let sb: StringBuilder = new StringBuilder();
        sb.writeln(this.declareConst("WidgetClassic"));
        sb.writeln("<Box round pad=\"medium\" direction=\"column\" background=\"#EEEEEE\"> ");
        sb.writeln("<Box height=\"xsmall\" width=\"xsmall\">");
        sb.writeln("<Image fit=\"cover\" src={data.icon_url}/> \n </Box>");
        sb.writeln("<Heading alignSelf=\"center\" level=\"2\" margin=\"none\" size=\"small\"> {data.title} </Heading>");
        sb.writeln("<Text alignSelf=\"center\" size=\"90px\" weight=\"bold\"> {data.value} </Text> \n </Box>");
        sb.write(");");
        return sb.toString();
    }

    declarationComponents(app: App): string {
        let widgets: Widget[] = app.menu.pages.map(p =>
            p.widgetWrappers.flatMap(ww => ww.widgets)
        ).flat();

        let isAlreadyVisited = true;
        let sb: StringBuilder = new StringBuilder();
        `${widgets.forEach(widget => {
            switch (widget.$type) {
                case 'WidgetClassique':
                    isAlreadyVisited ? sb.write(this.generateWidgetClassicComponent()) : "";
                    isAlreadyVisited = false;
                    break;
                case 'WidgetHisto':
                    break;
            }
        })}`;
        return sb.toString();
    }
}
