import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import { React } from 'react'
//TODO Armand : ajouter la width ici
export const PolarChartWidget = ({ data, width }) => (
   //ET ICI
   <Box width={width} align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
      <Box round="5px" background="#FFF" align="center" pad="small" >
         <Box align="center" justify="center" pad="xsmall" margin="xsmall">
            
            {/* TODO V See with the team if we gotta change the heading to a text (to allow truncate to work) AND/OR word-break */}
            <Text truncate="tip" alignSelf="center" margin="none" size="xxlarge" weight="bold"> {data.title} </Text>
            {/* <Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading> */}
            
            {/* TODO V See with the team if we gotta change the paragraph to a text (to have truncate ) AND/OR word-break */}
            <Text truncate="tip" size="small" margin="medium" textAlign="center"> {data.description} </Text>
            {/* <Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph> */}

            {/* 
            NOTE : this acts weirdly when resizing the window dynamically, I guess it's a framework thing
            and is an edge case we shouldn't care about 
            */}
            <PolarChart data={data.data} options={{
               themedData: true, legend: {
                  position: 'left',
               },
            }} />
         </Box>
      </Box>
   </Box>

);
