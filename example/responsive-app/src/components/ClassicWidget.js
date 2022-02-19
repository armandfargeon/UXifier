import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import { React } from 'react'
//TODO Armand : ajouter la width ici
export const ClassicWidget = ({ data, width }) => (
    //ET ICI
    <Box width={width} align="center" justify="center" pad="small" flex={false} fill="vertical" direction="row">
        <Box round="5px" background="#FFF" align="center" pad="small" >
            <Box align="center" justify="center" pad="xsmall" margin="xsmall">
                {/* TODO V See with the team if we gotta change the heading to a text (to allow truncate to work) AND/OR word-break */}
                {/* <Text truncate="true" alignSelf="center" margin="none" size="xxlarge" weight="bold"> {data.title} </Text> */}
                <Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
                {/* TODO V See with the team if we gotta change the paragraph to a text (to have truncate) AND/OR word-break */}
                {/* <Text truncate="true" size="small" margin="medium" textAlign="center"> {data.description} </Text> */}
                <Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>
                {/* TODO V See with team if we gotta add the truncate element */}
                <Text 
                    // truncate="true" 
                    alignSelf="center" size="90px" weight="bold"> {data.data} </Text>
                {/* DONE added a box to make the image small (even if the image is big af) */}
                <Box width="xxsmall" height="xxsmall" round="full" background="light-2">
                    <Image fill="true" fit="cover" src={data.icon_url} />
                </Box>  
            </Box>
        </Box>
    </Box>

);

