
            //groomet app generated : dsl
            import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph,Button,Layer } from 'grommet'; 

                import { LineChart, PolarChart } from 'grommet-controls/chartjs';
                import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data' 

                //import Typography from "@material-ui/core/Typography"; 

                import { Row } from 'reactstrap';

                import { grommet } from 'grommet/themes';

                import { deepMerge } from 'grommet/utils';

                import { FormClose } from 'grommet-icons';

                import React from 'react';

                import Chart from "react-apexcharts";

            export const ClassicWidget= ({ data }) => (
<Box align="center" justify="center" pad="small"  flex={false} fill="vertical" direction="row">
<Box round="5px" background="#FFF" align="center" pad="small" >
<Box align="center" justify="center" pad="xsmall" margin="xsmall">
<Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
<Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

<Text alignSelf="center" size="90px" weight="bold"> {data.data} </Text> 

<Image fit="cover" src={data.icon_url}/>
</Box>
</Box>
</Box>

);
 
const customTheme = deepMerge(grommet, {
layer: {
border: {
radius: 'large',
intelligentRounding: true,
},},});
export const Popup =({ data, dataPopup , base, pop }) => {
const [open, setOpen] = React.useState(false);
const [position] = React.useState();
const [full] = React.useState();
const onOpen = () => setOpen(true);
const onClose = () => setOpen(undefined);
return (
<Grommet theme={customTheme} full>
<Box fill align="center" justify="center" gap="medium" onClick={onOpen}>
{base}
</Box>
{open && (
<Layer
full={full}
position={position}
onClickOutside={onClose}
onEsc={onClose}
>
<Box
pad="medium"
gap="small"
width={{ min: "medium" }}
height={{ min: "small" }}
fill >
<Button alignSelf="end" icon={<FormClose />} onClick={onClose} />
{pop}
</Box>
</Layer>)}
</Grommet>);};
export const PolarChartWidget= ({ data }) => (
<Box align="center" justify="center" pad="small"  flex={false} fill="vertical" direction="row">
<Box round="5px" background="#FFF" align="center" pad="small" >
<Box align="center" justify="center" pad="xsmall" margin="xsmall">
<Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
<Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

<PolarChart data={data.data} options={data.options} />
</Box>
</Box>
</Box>

);

             const AppBar = (props) => (
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
        ); 
             const MyMenu = (props) => (
        		<Tabs>
			<Tab  title="pageOne">
					<Box name="widgetWrapperOne" 
 width="100"> 
<ClassicWidget data={ statlicenciement }/>
<Popup  base ={<LineChart data={statCasContact.data} />} pop= {<PolarChart data={statParticipation.data} options={statParticipation.options} />} />

					</Box>
			</Tab>
			<Tab  title="pageTwo">
					<Box name="widgetWrapperOne" 
 width="100"> 
<ClassicWidget data={ statlicenciement }/>
<Popup  base ={<LineChart data={statCasContact.data} />} pop= {<ClassicWidget data={statlicenciement}/>} />

					</Box>
			</Tab>
		</Tabs>

        ); 
            
            const myTheme = {
                global: { 
                    colors: {black: '#000000',
green: '#00FF00',
white: '#FFFFFF',
}}}

            function App() {
                return(
                    <Grommet background="#ededed">
                        <Box fill>
                            
        <AppBar>
            <Heading level='3' margin='none'>test</Heading>
        </AppBar> 
                        </Box>
                        
        <MyMenu></MyMenu> 
        
                    </Grommet>
                );
            }
            export default App;
        