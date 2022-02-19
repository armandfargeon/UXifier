import fs from 'fs';
import { CompositeGeneratorNode, isCrossReference, processGeneratorNode } from 'langium';
import { extractDestinationAndName } from './cli-util';
import path from 'path';
import { AbstractWidget, App, isLineChartWidget, isClassicWidget, Page, WidgetWrapper, isPolarChartWidget, isColumnChartWidget, PolarChartWidget, ColumnChartWidget, LineChartWidget, isFQN, Color} from '../language-server/generated/ast';
import { StringBuilder } from '../utils/StringBuilder';

export function generateJavaScript(app: App, filePath: string, destination: string | undefined): string {
    const data = extractDestinationAndName(filePath, destination);
    const generatedFilePath = `${path.join(data.destination, data.name)}.js`;
    const fileNode = new CompositeGeneratorNode();
    const grommetAppGenerator = new GrommetAppGenerator();
    fileNode.append(grommetAppGenerator.compile(app, data.destination + "/components"));

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
    compile(app: App, destination: string): string {
        return `
            //groomet app generated : ${app.name}
            ${this.dependencies(false)}
            ${this.declarationComponents(app, destination)}
            ${this.headerDeclaration(app)}
            ${this.MenuDeclaration(app)}
            ${this.defineTheme(app)}
            ${this.generateApp(app)}
        `;
    }

    componentsFiles(p:string, node:CompositeGeneratorNode, nameComponent: string){
        const generatedFilePath = `${path.join(p, nameComponent)}.js`;
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p, { recursive: true });
        }
        fs.writeFileSync(generatedFilePath, processGeneratorNode(node));
    }

    generateApp(app: App): string{
        let sb: StringBuilder = new StringBuilder();
        sb.writeln('function App() {\n');
        sb.writeln('return(\n <Grommet background="#ededed" theme='+`"${app.theme.name}"`+'> \n <Box fill> \n');
        sb.writeln(`${this.generateHeader(app)}`);
        sb.writeln('</Box>');
        sb.writeln(`${this.generateMenu(app)}`);
        sb.writeln('</Grommet>\n);\n}');
        sb.writeln('export default App;\n');
        return sb.toString()
    }


    /**
     * Define dependencies
     * @returns dependencies as a string 
     * //todo le faire dynamiquement
     */
    dependencies(isForComponents: boolean): string {
        let dependencies: StringBuilder = new StringBuilder();
        dependencies.writeln("import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';");
        dependencies.writeln("import { LineChart, PolarChart } from 'grommet-controls/chartjs';");
        dependencies.writeln('import Typography from "@material-ui/core/Typography";');
        dependencies.writeln("import { Row } from 'reactstrap';");
        dependencies.writeln('import Chart from "react-apexcharts";');
        dependencies.writeln("import { React } from 'react'");
        ;
        if(!isForComponents){
            dependencies.writeln("import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data'")
            dependencies.writeln("import {ClassicWidget} from './components/ClassicWidget';\n");
            dependencies.writeln("import {ColumnChartWidget} from './components/ColumnChartWidget';\n");
            dependencies.writeln("import {LineChartWidget} from './components/LineChartWidget';\n");
            dependencies.writeln("import {PolarChartWidget} from './components/PolarChartWidget';\n");
        }
        return dependencies.toString();
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
        let colorTheme : Color|undefined = this.findColorHeader(app)        
        return `${app.header}` ? ` const ${this.capitalizeFirstLetter(app.header.name)} = (props) => (
            <Box
                tag='header'    
                direction='row'
                align='center'
                justify='between'
                background='${colorTheme?.code}'
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
        widgetWrapperObj.widgets.forEach(widget => {
            widgets += this.generateWidgetTag(widget)
        });
        widgets += "\n\t\t\t\t\t</Box>\n"
        return widgets;
    }

    generateWidgetTag(widget: AbstractWidget): string {
        return `<${widget.$type} data={ ${widget.name} }/>\n`
    }

    declareConst(name: string): string {
        return "export const " + name + "= ({ data }) => (";
    }

    generatePosition(objOptions:any){
        let sb: StringBuilder = new StringBuilder();
        sb.write(`
            ${objOptions.legend_position ? `position: '${objOptions.legend_position}',` : ""}
        `);
        return sb;
    }

    generateOptionByWidget(widget: AbstractWidget) {
        let sb: StringBuilder = new StringBuilder();
        sb.write("{{ ");
        if(isPolarChartWidget(widget) && (widget.position)) {
            let objOptions = {legend_position: widget.position}
            sb.write(`themedData: true, legend: { ${this.generatePosition(objOptions)} },`)
        } else if(isLineChartWidget(widget) && (widget.position)) {
            let objOptions = {legend_position: widget.position}
            sb.write(`legend: { ${this.generatePosition(objOptions)} },`)
        } else if(isColumnChartWidget(widget) && (widget.position)) {
            let objOptions = {legend_position: widget.position, column_width: widget.columnWidth}
            sb.write(`plotOptions: { bar: { columnWidth: '${objOptions.column_width}'} }, xaxis: { categories: ['']},`)
            sb.write(`legend: { ${this.generatePosition(objOptions)} },`)
        } 
        sb.write(" }}");
        return sb.toString();
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
    
    generateLineChartWidgetComponent(widget: LineChartWidget): string {
        let sb: StringBuilder = new StringBuilder();
        sb.writeln(this.declareConst("LineChartWidget"));
        sb.writeln(this.generateFirstTagWidgetContainer());
        sb.writeln(`<LineChart options=${this.generateOptionByWidget(widget)} data={data.data} />`);
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

    generatePolarChartWidgetComponent(widget: PolarChartWidget): string {
        let sb: StringBuilder = new StringBuilder();
        sb.writeln(this.declareConst("PolarChartWidget"));
        sb.writeln(this.generateFirstTagWidgetContainer());
        sb.writeln(`<PolarChart data={data.data} options=${this.generateOptionByWidget(widget)} />`);
        sb.writeln(this.generateLastTagWidgetContainer());
        sb.writeln(");");
        return sb.toString();
    }

    generateColumnChartWidgetComponent(widget: ColumnChartWidget): string{
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
        sb.writeln(`<Chart options=${this.generateOptionByWidget(widget)} series={data.series} type="bar" height="300" />`);
        sb.writeln('</Box>\n</div>\n');
        sb.writeln(this.generateLastTagWidgetContainer());
        sb.writeln(');');
        return sb.toString();
    }

    populateNode(node: CompositeGeneratorNode, component: string, body: string, visited: string[], destination: string){
        visited.push(component);
        node.append(this.dependencies(true));
        node.append(body);
        this.componentsFiles(destination, node, component);
    }


    findColorHeader(app: App){
        if(isFQN(app.header.color)){
            if(isCrossReference(app.header.color.$cstNode?.feature)){
                for(const colorTheme of app.theme.colors){
                    let color = app.header.color.$cstNode?.text
                    if(color?.split(".").pop() === colorTheme.name){
                        return colorTheme
                    }
                }
            }
        }
        return undefined
    }

    declarationComponents(app: App, destination: string): string {
        let widgets: AbstractWidget[] = app.menu.pages.map(p =>
            p.widgetWrappers.map(w=>w.widgets).flat()
        ).flat();

        let typesVisited : string[] = [];
        let sb: StringBuilder = new StringBuilder();
        widgets.forEach(widget => {        
            if(isLineChartWidget(widget)) {
                if(!typesVisited.includes("LineChartWidget")){
                    const lineNode = new CompositeGeneratorNode();
                    this.populateNode(lineNode, "LineChartWidget", this.generateLineChartWidgetComponent(widget), typesVisited, destination);
                }
            } else if(isClassicWidget(widget)){
                if(!typesVisited.includes("ClassicWidget")){
                    const classicNode = new CompositeGeneratorNode();
                    this.populateNode(classicNode, "ClassicWidget", this.generateClassicWidgetComponent(), typesVisited, destination);
                }
            } else if(isPolarChartWidget(widget)){
                if(!typesVisited.includes("PolarChartWidget")){
                    const polarNode = new CompositeGeneratorNode();
                    this.populateNode(polarNode, "PolarChartWidget", this.generatePolarChartWidgetComponent(widget), typesVisited, destination);
                }
            }else if(isColumnChartWidget(widget)){
                if(!typesVisited.includes("ColumnChartWidget")){
                    const columnNode = new CompositeGeneratorNode();
                    this.populateNode(columnNode, "ColumnChartWidget", this.generateColumnChartWidgetComponent(widget), typesVisited, destination);
                }
            }
        });
        return sb.toString();
    }
}
