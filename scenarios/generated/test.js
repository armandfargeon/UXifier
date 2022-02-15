
            //groomet app generated : dsl
            import { Grommet, Box, Heading, Tabs, Tab, Image, Text, Paragraph } from 'grommet'; 

                import { LineChart, PolarChart } from 'grommet-controls/chartjs';
                import { statscovid, statlicenciement, statCasContact, statParticipation } from './data/data' 

            export const ClassicWidget= ({ data }) => (
<Box align="center" justify="center" pad="small"  flex={false} fill="vertical" direction="row">
<Box round="5px" background="#FFF" align="center" pad="small" >
<Box align="center" justify="center" pad="xsmall" margin="xsmall">
<Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
<Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

<Image fit="cover" src={data.icon_url}/>
<Text alignSelf="center" size="90px" weight="bold"> {data.data} </Text> 

</Box>
</Box>
</Box>

);
 
export const LineChartWidget= ({ data }) => (
<Box align="center" justify="center" pad="small"  flex={false} fill="vertical" direction="row">
<Box round="5px" background="#FFF" align="center" pad="small" >
<Box align="center" justify="center" pad="xsmall" margin="xsmall">
<Heading level="2" size="medium" margin="xsmall" textAlign="center">{data.title}</Heading>
<Paragraph size="small" margin="medium" textAlign="center"> {data.description} </Paragraph>

<LineChart data={data.data} />
</Box>
</Box>
</Box>

);
export const PolarChartWidget= ({ data }) => (
<Box align="center" justify="center" pad="small"  flex={false} fill="vertical" direction="row">
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
			<Tab  title="pageOne">
					<Box name="widgetWrapperOne" 
 width="100"> 
<ClassicWidget data={ statscovid }/>

					</Box>
			</Tab>
			<Tab  title="pageTwo">
					<Box name="widgetWrapperOne" 
 width="100"> 
<ClassicWidget data={ statlicenciement }/>
<LineChartWidget data={ statCasContact }/>
<PolarChartWidget data={ statParticipation }/>

					</Box>
			</Tab>
		</Tabs>

        ); 
            
            const myTheme = {
                global: { 
                    colors: {black: '#000000',
green: '#00FF00',
white: '#FFFFFF',
}}}

            function App() {
                return(
                    <Grommet background="#ededed">
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
        