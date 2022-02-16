
            //groomet app generated : dsl
            import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import { React } from 'react'
import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data'
import {ClassicWidget} from './components/ClassicWidget';

import {ColumnChartWidget} from './components/ColumnChartWidget';

import {LineChartWidget} from './components/LineChartWidget';

import {PolarChartWidget} from './components/PolarChartWidget';


            
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

return(
 <Grommet background="#ededed" theme="myTheme"> 
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


        