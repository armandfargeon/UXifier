
//groomet app generated : responsive
import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph, Button, Layer, ResponsiveContext } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import React from 'react'
import { FormClose } from 'grommet-icons';
import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto, contaminations, globalContaminations, newsCrypto, contact } from './data/data'
import { ClassicWidget } from './components/ClassicWidget';

import { ColumnChartWidget } from './components/ColumnChartWidget';

import { LineChartWidget } from './components/LineChartWidget';

import { PolarChartWidget } from './components/PolarChartWidget';

import { Popup } from './components/Popup';
import { acme } from './components/acme-theme';
import { deepMerge } from 'grommet/utils';
import DarkModeToggle from 'react-dark-mode-toggle'

const DarkMode = deepMerge(Grommet, acme);



const Line = (props) => (
  <Box
    {...props}
  />
); const AppBar = (props) => (
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
const Menu = (props) => {
  const size = React.useContext(ResponsiveContext);
  switch (size) {
    case 'small':
      return (<Tabs>
        <Tab title="Crypto">
          <Line
            margin="xsmall"
            direction="row"
            gap="xsmall"
          >					<Box name="news_crypto_mobile"
            width="100%" direction="row" overflow="auto">
              <ClassicWidget data={newsCrypto} width="100%" />

            </Box>
          </Line><Line
            margin="xsmall"
            direction="row"
            gap="xsmall"
          >					<Box name="stats_crypto_mobile"
            width="100%" direction="row" overflow="auto">
              <ColumnChartWidget data={statCrypto} width="100%" />

            </Box>
          </Line>			</Tab>
        <Tab title="Covid">
          <Line
            margin="xsmall"
            direction="row"
            gap="xsmall"
          >					<Box name="widgetGlobalContaminations"
            width="100%" direction="row" overflow="auto">
              <ClassicWidget data={globalContaminations} width="100%" />

            </Box>
          </Line>			</Tab>
        <Tab title="Contact">
          <Box name="widgetContact"
            width="100%" direction="row" overflow="auto">
            <ClassicWidget data={contact} width="100%" />

          </Box>
        </Tab>
      </Tabs>
      );
    case 'medium':
      return (<Tabs>
        <Tab title="Crypto">
          <Line
            margin="xsmall"
            direction="row"
            gap="xsmall"
          >					<Box name="widgetWrapperOthers"
            width="100%" direction="row" overflow="auto">
              <ClassicWidget data={newsCrypto} width="50%" />
              <ColumnChartWidget data={statCrypto} width="50%" />

            </Box>
          </Line>			</Tab>
        <Tab title="Covid">
          <Line
            margin="xsmall"
            direction="row"
            gap="xsmall"
          >					<Box name="widgetContaminations"
            width="100%" direction="row" overflow="auto">
              <LineChartWidget data={contaminations} width="100%" />

            </Box>
          </Line>			</Tab>
        <Tab title="Contact">
          <Box name="widgetContact"
            width="100%" direction="row" overflow="auto">
            <ClassicWidget data={contact} width="100%" />

          </Box>
        </Tab>
      </Tabs>
      );
    case 'large':
      return (<Tabs>
        <Tab title="Crypto">
          <Line
            margin="xsmall"
            direction="row"
            gap="xsmall"
          >					<Box name="widgetWrapperOthers"
            width="100%" direction="row" overflow="auto">
              <ClassicWidget data={newsCrypto} width="50%" />
              <ColumnChartWidget data={statCrypto} width="50%" />

            </Box>
          </Line>			</Tab>
        <Tab title="Covid">
          <Line
            margin="xsmall"
            direction="row"
            gap="xsmall"
          >					<Box name="widgetContaminations"
            width="100%" direction="row" overflow="auto">
              <LineChartWidget data={contaminations} width="100%" />

            </Box>
          </Line>			</Tab>
        <Tab title="Contact">
          <Box name="widgetContact"
            width="100%" direction="row" overflow="auto">
            <ClassicWidget data={contact} width="100%" />

          </Box>
        </Tab>
      </Tabs>
      );
    default:
      return (<Tabs>
        <Tab title="Crypto">
          <Box name="news_crypto_mobile"
            width="100%" direction="row" overflow="auto">
            <ClassicWidget data={newsCrypto} width="100%" />

          </Box>
          <Box name="stats_crypto_mobile"
            width="100%" direction="row" overflow="auto">
            <ColumnChartWidget data={statCrypto} width="100%" />

          </Box>
          <Box name="widgetWrapperOthers"
            width="100%" direction="row" overflow="auto">
            <ClassicWidget data={newsCrypto} width="50%" />
            <ColumnChartWidget data={statCrypto} width="50%" />

          </Box>
        </Tab>
        <Tab title="Covid">
          <Box name="widgetContaminations"
            width="100%" direction="row" overflow="auto">
            <LineChartWidget data={contaminations} width="100%" />

          </Box>
          <Box name="widgetGlobalContaminations"
            width="100%" direction="row" overflow="auto">
            <ClassicWidget data={globalContaminations} width="100%" />

          </Box>
        </Tab>
        <Tab title="Contact">
          <Box name="widgetContact"
            width="100%" direction="row" overflow="auto">
            <ClassicWidget data={contact} width="100%" />

          </Box>
        </Tab>
      </Tabs>
      );
  }
};

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

  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <Grommet theme={DarkMode}
      themeMode={darkMode ? "dark" : "light"}
    >
      <Box fill>


        <AppBar>
          <Heading level='3' margin='none'>Responsive scenario</Heading>
        </AppBar>
      </Box>
      <div style={{ position: "relative" }}>
        <div style={{ position: 'absolute', left: 0 }}>
          <DarkModeToggle
            onChange={setDarkMode}
            checked={darkMode}
            size={80}
            margin="xsmall"
          />
        </div>
      </div>


      <Menu></Menu>

    </Grommet>
  );
}
export default App;


