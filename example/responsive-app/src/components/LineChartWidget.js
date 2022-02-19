import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import { React } from 'react'
//TODO Armand : ajouter la width ici
export const LineChartWidget = ({ data, width }) => (
   //ET ICI
   <Box width={width} align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
      <Box round="5px" background="#FFF" align="center" pad="small" fill="vertical">
         <Box align="center" justify="center" pad="xsmall" margin="xsmall" fill="vertical">
            
            {/* TODO V See with the team if we gotta change the heading to a text (to allow truncate to work) AND/OR word-break */}
            {/* <Text truncate="true" alignSelf="center" margin="none" size="xxlarge" weight="bold"> {data.title} </Text> */}
            <Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
            
            {/* TODO V See with the team if we gotta change the paragraph to a text (to have truncate) AND/OR word-break */}
            {/* <Text truncate="true" size="small" margin="medium" textAlign="center"> {data.description} </Text> */}
            <Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

            {/* NOTE : this acts weirdly when resizing the window dynamically, I guess it's a framework thing
            and is an edge case we shouldn't care about */}
            <LineChart options={{
               legend: {
                  position: 'left',
               },
            }} data={data.data} />
         </Box>
      </Box>
   </Box>

);
