import fs from 'fs';
import { CompositeGeneratorNode, processGeneratorNode } from 'langium';
import { extractDestinationAndName } from './cli-util';
import path from 'path';
import { App } from '../language-server/generated/ast';

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
            function App() {
                return(
                    <Grommet plain>
                        <Box fill>
                            ${this.generateHeader(app)}
                        </Box>
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
        return `import { Grommet, Box, Heading } from 'grommet';`;
    }

    generateHeader(app: App): string{
        return `${app.header} `?`
        <AppBar>
            <Heading level='${app.header.level}' margin='none'>${app.header.title}</Heading>
        </AppBar> `:` "s" `;
    }

    headerDeclaration(app: App): string{
        return `${app.header}` ?` const ${app.header.name} = (props) => (
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
}
