import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph, Button,Layer } from 'grommet';
import { LineChart, PolarChart } from 'grommet-controls/chartjs';
import Typography from "@material-ui/core/Typography";
import { Row } from 'reactstrap';
import Chart from "react-apexcharts";
import React from 'react'
import { FormClose } from 'grommet-icons';
export const Popup =({ base, pop }) => {
const [open, setOpen] = React.useState(false);
const [full] = React.useState();
const onOpen = () => setOpen(true);
const onClose = () => setOpen(undefined);
return (
<Grommet  full>
<Box fill align="center" justify="center" gap="medium" onClick={onOpen}>
{base}
</Box>
{open && (
<Layer
full={full}
onClickOutside={onClose}
onEsc={onClose}
>
<Box
pad="medium"
gap="small"
width={{ min: "medium" }}
height={{ min: "small" }}
fill >
<Button alignSelf="end" icon={<FormClose />} onClick={onClose} />
{pop}
</Box>
</Layer>)}
</Grommet>);};
