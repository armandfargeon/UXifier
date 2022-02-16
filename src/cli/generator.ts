import fs from 'fs';
import { CompositeGeneratorNode, processGeneratorNode } from 'langium';
import { extractDestinationAndName } from './cli-util';
import path from 'path';
import { AbstractWidget, App, isLineChartWidget, isClassicWidget, Page, WidgetWrapper, isPolarChartWidget, isColumnChartWidget} from '../language-server/generated/ast';
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
            ${this.generateApp(app)}
        `;
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
    dependencies(): string {
        return `import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet'; \n
                import { LineChart, PolarChart } from 'grommet-controls/chartjs';
                import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data' \n
                import Typography from "@material-ui/core/Typography"; \n
                import { Row } from 'reactstrap';\n
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

    declarationComponents(app: App): string {
        let widgets: AbstractWidget[] = app.menu.pages.map(p =>
            p.widgetWrappers.map(w=>w.widgets).flat()
        ).flat();

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
            }
        });
        return sb.toString();
    }
}
