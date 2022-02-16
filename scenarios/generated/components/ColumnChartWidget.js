import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data'
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
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
