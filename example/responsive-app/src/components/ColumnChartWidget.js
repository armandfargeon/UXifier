import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import { React } from 'react'
//TODO Armand : ajouter la width ici
export const ColumnChartWidget = ({ data, width }) => (
   //ET ICI
   <Box width={width} align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
      <Box round="5px" background="#FFF" align="center" pad="small" >
         <Box align="center" justify="center" pad="xsmall" margin="xsmall">

            {/* TODO V See with the team if we gotta change the heading to a text (to allow truncate to work) AND/OR word-break */}
            <Text truncate="tip" alignSelf="center" margin="none" size="xxlarge" weight="bold"> {data.title} </Text>
            {/* <Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading> */}
            
            {/* TODO V See with the team if we gotta change the paragraph to a text (to have truncate) AND/OR word-break */}
            <Text truncate="tip" size="small" margin="medium" textAlign="center"> {data.description} </Text>
            {/* <Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph> */}

            {/* NOTE : this auto adapts to the size of the screen but when the screen is REALLY small it just doesn't work 
            and I don't know how to make it work */}
            <div id="chart" className="grommet__container">
               <Box pad="small" elevation="medium">
                  <div className="title-chart">
                     <Row>
                        <Typography variant="h6" className="title-chart">{data.title}</Typography>
                     </Row>
                     <Typography variant="subtitle1">{data.description}</Typography>
                  </div>
                  <Chart options={{
                     plotOptions: { bar: { columnWidth: '45%' } }, xaxis: { categories: [''] }, legend: {
                        position: 'left',
                     },
                  }} series={data.series} type="bar" height="300" />
               </Box>
            </div>
         </Box>
      </Box>
   </Box>
);
