
//groomet app generated : dsl
import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';

import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data'

import Typography from "@material-ui/core/Typography";

import { Row } from 'reactstrap';

import Chart from "react-apexcharts";

export const ClassicWidget = ({ data }) => (
    <Box align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
        <Box round="5px" background="#FFF" align="center" pad="small" >
            <Box align="center" justify="center" pad="xsmall" margin="xsmall">
                <Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
                <Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

                <Text alignSelf="center" size="90px" weight="bold"> {data.data} </Text>

                <Image fit="cover" src={data.icon_url} />
            </Box>
        </Box>
    </Box>

);

export const ColumnChartWidget = ({ data }) => (
    <Box align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
        <Box round="5px" background="#FFF" align="center" pad="small" >
            <Box align="center" justify="center" pad="xsmall" margin="xsmall">
                <Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
                <Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

                <div id="chart" className="grommet__container">
                    <Box pad="small" elevation="medium">
                        <div className="title-chart">
                            <Row>
                                <Typography variant="h6" className="title-chart">{data.title}</Typography>
                            </Row>
                            <Typography variant="subtitle1">{data.description}</Typography>
                        </div>
                        <Chart options={data.options} series={data.series} type="bar" height="300" />
                    </Box>
                </div>

            </Box>
        </Box>
    </Box>

);
export const LineChartWidget = ({ data }) => (
    <Box align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
        <Box round="5px" background="#FFF" align="center" pad="small" >
            <Box align="center" justify="center" pad="xsmall" margin="xsmall">
                <Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
                <Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

                <LineChart data={data.data} />
            </Box>
        </Box>
    </Box>

);
export const PolarChartWidget = ({ data }) => (
    <Box align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
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
        <Tab title="pageOne">
            <Box name="widgetWrapperOne"
                width="100">
                <ClassicWidget data={statscovid} />
                <ColumnChartWidget data={statCrypto} />

            </Box>
        </Tab>
        <Tab title="pageTwo">
            <Box name="widgetWrapperOne"
                width="100">
                <ClassicWidget data={statlicenciement} />
                <LineChartWidget data={statCasContact} />
                <PolarChartWidget data={statParticipation} />

            </Box>
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


