import fs from 'fs';
import { CompositeGeneratorNode, processGeneratorNode } from 'langium';
import { extractDestinationAndName } from './cli-util';
import path from 'path';
import { AbstractWidget, App, isLineChartWidget, isClassicWidget, Page, WidgetWrapper, isPolarChartWidget, isColumnChartWidget, Widget, isPopup, Popup} from '../language-server/generated/ast';
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
                    <Grommet background="#ededed">
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
        return `import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph,Button,Layer } from 'grommet'; \n
                import { LineChart, PolarChart } from 'grommet-controls/chartjs';
                import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data' \n
                //import Typography from "@material-ui/core/Typography"; \n
                import { Row } from 'reactstrap';\n
                import { grommet } from 'grommet/themes';\n
                import { deepMerge } from 'grommet/utils';\n
                import { FormClose } from 'grommet-icons';\n
                import React from 'react';\n
                import Chart from "react-apexcharts";\n`;
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
        ${this.pagesDeclaration(app.menu.pages,app)}
        ); `: ` "x"`;
    }

    pagesDeclaration(pages: Page[],app:App) {
        let sb: StringBuilder = new StringBuilder();
        sb.write("\t\t<Tabs>\n")
        pages.forEach((page) => {
            sb.write(`\t\t\t<Tab  title="${page.title}">\n` + this.PageDeclaration(page,app) + "\t\t\t</Tab>\n")
        })
        sb.write("\t\t</Tabs>\n")
        return sb.toString()
    }

    PageDeclaration(page: Page,app:App) {
        let pageWW = ""
        page.widgetWrappers.forEach(widget => {
            pageWW += this.WidgetWrapperDeclaration(widget,app)
        })
        return pageWW;
    }

    WidgetWrappersDeclaration(widgetWrappers: WidgetWrapper[],app:App) {
        let widgetWrappersStr = "\t\t\t\t<Box> \n"
        widgetWrappers.forEach(widget => {
            widgetWrappersStr += this.WidgetWrapperDeclaration(widget,app)
        })
        widgetWrappersStr += "\n\t\t\t\t</Box>"
        return widgetWrappersStr;
    }

    WidgetWrapperDeclaration(widgetWrapperObj: WidgetWrapper,app:App) {
        let widgets = `\t\t\t\t\t<Box name="${widgetWrapperObj.name}" \n width="${widgetWrapperObj.width}"> \n`
        widgetWrapperObj.widgets.forEach(widget => {
            widgets += this.generateWidgetTag(widget,app)
        });
        widgets += "\n\t\t\t\t\t</Box>\n"
        return widgets;
    }

    generateWidgetTag(widget: AbstractWidget,app:App): string {
        if(isPopup(widget)){
            let wid ;
            if(widget.popup){
                wid  = this.findWidgetPrivate(widget,app);
            }
            if(wid)
                return `<${widget.$type}  base ={${this.getWidgetFromPopup(widget.base,widget.base.name)}} pop= {${this.getWidgetFromPopup(wid,wid.name)}} />\n`
        }
        
        return `<${widget.$type} data={ ${widget.name} }/>\n`
    }

    declareConst(name: string): string {
        return "export const " + name + "= ({ data }) => (";
    }

    generateClassicWidgetComponent(): string {
        let sb: StringBuilder = new StringBuilder();
        sb.writeln(this.declareConst("ClassicWidget"));
        sb.writeln(this.generateFirstTagWidgetContainer());
        sb.writeln("<Text alignSelf=\"center\" size=\"90px\" weight=\"bold\"> {data.data} </Text> \n");
        sb.writeln("<Image fit=\"cover\" src={data.icon_url}/>");
        sb.writeln(this.generateLastTagWidgetContainer());
        sb.write(");\n \n");
        return sb.toString();
    }
    
    generateLineChartWidgetComponent(): string {
        let sb: StringBuilder = new StringBuilder();
        sb.writeln(this.declareConst("LineChartWidget"));
        sb.writeln(this.generateFirstTagWidgetContainer());
        sb.writeln("<LineChart data={data.data} />");
        sb.writeln(this.generateLastTagWidgetContainer());
        sb.writeln(");");
        return sb.toString();
    }

    generateFirstTagWidgetContainer(){
        let sb: StringBuilder = new StringBuilder();
        sb.writeln('<Box align="center" justify="center" pad="small"  flex={false} fill="vertical" direction="row">');
        sb.writeln('<Box round="5px" background="#FFF" align="center" pad="small" >');
        sb.writeln('<Box align="center" justify="center" pad="xsmall" margin="xsmall">');   
        sb.writeln(`<Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>`);
        sb.writeln(`<Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>`);     
        return sb.toString()
    }

    generateLastTagWidgetContainer(){
        let sb: StringBuilder = new StringBuilder();
        sb.writeln('</Box>');
        sb.writeln('</Box>');
        sb.writeln('</Box>');
        return sb.toString()
    }

    generatePolarChartWidgetComponent(): string {
        let sb: StringBuilder = new StringBuilder();
        sb.writeln(this.declareConst("PolarChartWidget"));
        sb.writeln(this.generateFirstTagWidgetContainer());
        sb.writeln("<PolarChart data={data.data} options={data.options} />");
        sb.writeln(this.generateLastTagWidgetContainer());
        sb.writeln(");");
        return sb.toString();
    }

    generateColumnChartWidgetComponent(): string{
        let sb: StringBuilder = new StringBuilder();
        sb.writeln(this.declareConst("ColumnChartWidget"));
        sb.writeln(this.generateFirstTagWidgetContainer());
        sb.writeln('<div id="chart" className="grommet__container">');
        sb.writeln('<Box pad="small" elevation="medium">');
        sb.writeln('<div className="title-chart">');
        sb.writeln('<Row>');
        sb.writeln('<Typography variant="h6" className="title-chart">{data.title}</Typography>');
        sb.writeln('</Row>');
        sb.writeln('<Typography variant="subtitle1">{data.description}</Typography>');
        sb.writeln('</div>');
        sb.writeln('<Chart options={data.options} series={data.series} type="bar" height="300" />');
        sb.writeln('</Box>\n</div>\n');
        sb.writeln(this.generateLastTagWidgetContainer());
        sb.writeln(');');
        return sb.toString();
    }
    
    generatePopup(widget:Widget,app:App){
        let sb: StringBuilder = new StringBuilder();
        sb.writeln("const customTheme = deepMerge(grommet, {");
        sb.writeln("layer: {");
        sb.writeln("border: {");
        sb.writeln("radius: 'large',");
        sb.writeln("intelligentRounding: true,");
        sb.writeln("},},});")
        sb.writeln("export const Popup =({ data, dataPopup , base, pop }) => {");
        sb.writeln('const [open, setOpen] = React.useState(false);')
        sb.writeln('const [position] = React.useState();')
        sb.writeln('const [full] = React.useState();')
        sb.writeln('const onOpen = () => setOpen(true);')
        sb.writeln('const onClose = () => setOpen(undefined);')
        sb.writeln('return (')
        sb.writeln('<Grommet theme={customTheme} full>')
        sb.writeln('<Box fill align="center" justify="center" gap="medium" onClick={onOpen}>')     
        if(isPopup(widget)){
            widget.base.$type
            sb.writeln( "{base}");
            //sb.writeln( this.getWidgetFromPopup(widget.base,false));
        }
        sb.writeln('</Box>')
        sb.writeln('{open && (')
        sb.writeln('<Layer')
        sb.writeln('full={full}')
        sb.writeln('position={position}')
        sb.writeln('onClickOutside={onClose}')
        sb.writeln('onEsc={onClose}')
        sb.writeln('>')
        sb.writeln('<Box')
        sb.writeln('pad="medium"')
        sb.writeln('gap="small"')
        sb.writeln('width={{ min: "medium" }}')
        sb.writeln('height={{ min: "small" }}')
        sb.writeln('fill >')
        sb.writeln('<Button alignSelf="end" icon={<FormClose />} onClick={onClose} />');
        sb.writeln("{pop}")
        /*if(isPopup(widget) ){
            if(widget.popup){
                const wid = this.findWidgetPrivate(widget,app);
                sb.writeln(wid?.name)
                if(wid)
                    sb.writeln(this.getWidgetFromPopup(wid,true));
            } 
        }*/
        sb.writeln('</Box>')
        sb.writeln('</Layer>)}')
        sb.writeln('</Grommet>);};')
        return sb.toString();
    }
    getWidgetFromPopup(widget:AbstractWidget, data : string){
        if(isClassicWidget(widget))
            return `<ClassicWidget data={${data}}/>`
        if(isColumnChartWidget(widget))
            return `<Chart options={${data}.options} series={${data}.series} type="bar" height="300" />`;
        if(isLineChartWidget(widget))
            return`<LineChart data={${data}.data} />`;
        if(isPolarChartWidget(widget))
            return `<PolarChart data={${data}.data} options={${data}.options} />`;

        return undefined;
    }

    declarationComponents(app: App): string {
        let widgets: Widget[] = app.menu.pages.map(p =>
            p.widgetWrappers.map(w=>w.widgets).flat()
        ).flat();

        let hiddens : Widget[] = app.hide.widgets;

        widgets = widgets.concat(hiddens);

        let typesVisited : string[] = []

        let sb: StringBuilder = new StringBuilder();
        widgets.forEach(widget => {        
            if(isLineChartWidget(widget)) {
                if(!typesVisited.includes("LineChartWidget")){
                    typesVisited.push("LineChartWidget")
                    sb.write(this.generateLineChartWidgetComponent());
                }
            } else if(isClassicWidget(widget)){
                if(!typesVisited.includes("ClassicWidget")){
                    typesVisited.push("ClassicWidget")
                    sb.write(this.generateClassicWidgetComponent());
                }
            } else if(isPolarChartWidget(widget)){
                if(!typesVisited.includes("PolarChartWidget")){
                    typesVisited.push("PolarChartWidget")
                    sb.write(this.generatePolarChartWidgetComponent());
                }
            }else if(isColumnChartWidget(widget)){
                if(!typesVisited.includes("ColumnChartWidget")){
                    typesVisited.push("ColumnChartWidget")
                    sb.write(this.generateColumnChartWidgetComponent());
                }
            }else if (isPopup(widget)){
                if(!typesVisited.includes("Popup")){
                    typesVisited.push("Popup");
                    sb.write(this.generatePopup(widget,app))
                }
            }
        });
        return sb.toString();
    }

    findWidgetPrivate(popup: Popup , app :App){
       let widFinal = popup.$cstNode?.text;
       widFinal = widFinal?.split(".").pop();

        for(const wid of app.hide.widgets ){
            if(wid.name == widFinal )
                return wid;
        }
        return undefined;      
    }
}
