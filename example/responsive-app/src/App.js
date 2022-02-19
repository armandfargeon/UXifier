import './App.css';

import { Grommet, Box, Heading, Text, Button, Layer } from 'grommet';

import { LineChart } from 'grommet-controls/chartjs';
import { statlicenciement, statCasContact } from './data/data';

import React from 'react';
import { FormClose } from 'grommet-icons';

export const ClassicWidget = ({ fn, data }) => (
  <Box 
    align="center" 
    justify="center" 
    onClick={fn}
    round 
    pad="medium" 
    direction="column" 
    background="#EEEEEE"
  >
    {/* The following text is equivalent to 
    <Heading alignSelf="center" level="2" margin="none" size="small"> {data.title} </Heading>
    Text was used to make truncate work (it exists in Heading but it does NOT work)
    */}
    <Text truncate="true" alignSelf="center"  margin="none" size="xxlarge" weight="bold"> {data.title} </Text>
    <Text truncate="true" alignSelf="center" size="90px" weight="bold"> {data.data} </Text>
    <Text truncate="true" alignSelf="left"> {data.description} </Text>
  </Box>
);

export const ChartWidget = ({ fn, data }) => (
  <Box 
    align="center" 
    justify="center" 
    onClick={fn}
    round 
    pad="medium" 
    direction="column" 
    background="#EEEEEE"
  >
    <Text truncate="true" alignSelf="center"  margin="none" size="xxlarge" weight="bold"> {data.title} </Text>
    <Text truncate="true" alignSelf="center" size="20px" weight="bold"> {data.description} </Text>
    <LineChart data={data.data} />
  </Box>
);

export const RoundLayer = (props) => {
  const [open, setOpen] = React.useState(false);
  const [position, setPosition] = React.useState();
  const [full, setFull] = React.useState();
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  return (
    <Box {...props}>
      <ChartWidget fn={onOpen} data={statlicenciement} />

      {open && (
        <Layer
          full={false}
          position={position}
          onClickOutside={onClose}
          onEsc={onClose}
        >
          <Button alignSelf="end" icon={<FormClose />} onClick={onClose} />

          <ChartWidget data={statCasContact} />

        </Layer>
      )}
    </Box>
  );
};

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
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

function App() {
  return (
    <Grommet plain>
      <Box fill>
        <AppBar>
          <Heading level='3' margin='none'>Trying to make something flexible</Heading>
        </AppBar>
      </Box>

      {/* For the line and its content, 
      adding the gap (logically) makes it so that we can't add all the purcentages up to a 100% 
      I feel like we have to make it add up to (100 - number of gaps)% (requires further testing)
      */}
      <Line 
        margin="xsmall" 
        direction="row" 
        gap="xsmall" 
        // height="xxsmall"
      >
        {/* height = "x%" doesn't work for the line,
        without specifying the height, it adapats to its content (the lines in the widget) */}
        <RoundLayer wrap="true" width="12%"/>
        <RoundLayer width="49%"/>
        <RoundLayer width="38%"/>
      </Line>
    </Grommet>
  );
}
export default App;
