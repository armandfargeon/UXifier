import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph, Button,Layer } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import React from 'react'
import { FormClose } from 'grommet-icons';
export const ClassicWidget= ({ data }) => (
<Box align="center" justify="center" pad="small"  flex={false} fill="vertical" direction="row">
<Box round="5px" background="#FFF" align="center" pad="small" >
<Box align="center" justify="center" pad="xsmall" margin="xsmall">
<Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
<Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

<Text alignSelf="center" size="90px" weight="bold"> {data.data} </Text> 

<Image fit="cover" src={data.icon_url}/>
</Box>
</Box>
</Box>

);
 
