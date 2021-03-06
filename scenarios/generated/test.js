
            //groomet app generated : dsl
            import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph, Button,Layer } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import React from 'react'
import { FormClose } from 'grommet-icons';
import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data'
import {ClassicWidget} from './components/ClassicWidget';

import {ColumnChartWidget} from './components/ColumnChartWidget';

import {LineChartWidget} from './components/LineChartWidget';

import {PolarChartWidget} from './components/PolarChartWidget';

import {Popup} from './components/Popup';
import { acme } from './components/acme-theme';
import { deepMerge } from 'grommet/utils';

            const DarkMode = deepMerge(Grommet, acme);


            
             const AppBar = (props) => (
            <Box
                tag='header'    
                direction='row'
                align='center'
                justify='between'
                background='#000000'
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
<ClassicWidget data={ statscovid }/>
<ColumnChartWidget data={ statCrypto }/>
<Popup  base ={<PolarChartWidget data={statParticipation} options={statParticipation} />} pop= {<ClassicWidget data={statscovid}/>} />

					</Box>
			</Tab>
			<Tab  title="pageTwo">
					<Box name="widgetWrapperOne" 
 width="100"> 
<ClassicWidget data={ statlicenciement }/>
<LineChartWidget data={ statCasContact }/>
<PolarChartWidget data={ statParticipation }/>

					</Box>
			</Tab>
		</Tabs>

        ); 
            
            const myTheme = {
                global: { 
                    colors: {black: '#000000',
green: '#00FF00',
white: '#FFFFFF',
graylight: '#ededed',
}}}

            function App() {

const [darkMode, setDarkMode] = React.useState(false);
return(
 <Grommet theme={DarkMode}
 themeMode={darkMode ? "dark" : "light"}
> 
 <Box fill> 


        <AppBar>
            <Heading level='3' margin='none'>test</Heading>
        </AppBar> 
</Box>
<div style={{ position: "relative"}}>
<div style={{ position: 'absolute', left: 0}}>
<Button
label="Toggle Dark/Light Mode"
primary
alignSelf="center"
margin="large"
onClick={() => setDarkMode(!darkMode)}
/>
</div>
</div>


        <MyMenu></MyMenu> 
        
</Grommet>
);
}
export default App;


        