//groomet app generated by the dsl and then adapted (a bit)
import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import { React } from 'react'
import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data'
import { ClassicWidget } from './components/ClassicWidget';

import { ColumnChartWidget } from './components/ColumnChartWidget';

import { LineChartWidget } from './components/LineChartWidget';

import { PolarChartWidget } from './components/PolarChartWidget';

const Line = (props) => (
  <Box
    {...props}
  />
);

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
    <Tab title="pageOne">
      <Box 
        name="widgetWrapperOne"
        //NOTE Removed ' width="100" '
      >
        <ClassicWidget data={statscovid} />
        <ColumnChartWidget data={statCrypto} />

      </Box>
    </Tab>
    <Tab title="pageTwo">
      <Box 
        name="widgetWrapperOne"
        //NOTE Removed ' width="100" '
      >
        <ClassicWidget data={statlicenciement} />
        <LineChartWidget data={statCasContact} />
        <PolarChartWidget data={statParticipation} />
      </Box>
    </Tab>
    <Tab title="pageThree">
      {/* Les trois arguments sont en dur, non configrables par l'utilisateur du DSL */}
      {/* Le nom LINE est juste une BOX, il n'est là que pour la clareté de CE code, donc pas utile pour l'utilisateur du DSL */}
      {/* Je pense donc qu'on peut le retirer */}
      <Line 
        margin="xsmall" 
        direction="row" 
        gap="xsmall" 
      >
        {/* height = "x%" doesn't work for the line,
        without specifying the height, it adapats to its content (the lines in the widget) */}
        {/* TODO Armand : ajouter le width="x%" de l'utilisateur du DSL en second argument des widgets */}
        <ClassicWidget data={statlicenciement} width="12%"/>
        <LineChartWidget data={statParticipation} width="49%"/>
        <PolarChartWidget data={statCasContact} width="38%"/>
      </Line>
    </Tab>
  </Tabs>

);

const myTheme = {
  global: {
    colors: {
      black: '#000000',
      green: '#00FF00',
      white: '#FFFFFF',
      graylight: '#ededed',
    }
  }
}

function App() {

  return (
    
    <Grommet 
      //TODO Added this line
      full="min" 

      background="#ededed" 
      theme="myTheme"
    >
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


