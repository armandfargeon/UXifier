import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import { statscovid, statlicenciement, statCasContact, statParticipation, statCrypto } from './data/data'
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
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
