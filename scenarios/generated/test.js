
            //groomet app generated : dsl
            import { Grommet, Box, Heading, Tabs, Tab, Image, Text } from 'grommet'; 

                import { LineChart } from 'grommet-controls/chartjs';
                import { statscovid, statlicenciement, statCasContact } from './data/data' 

            export const ClassicWidget= ({ data }) => (
<Box round pad="medium" direction="column" background="#EEEEEE"> 
<Box height="xsmall" width="xsmall">
<Image fit="cover" src={data.icon_url}/> 
 </Box>
<Heading alignSelf="center" level="2" margin="none" size="small"> {data.title} </Heading>
<Text alignSelf="center" size="90px" weight="bold"> {data.data} </Text> 

<Text alignSelf="left"> {data.description} </Text> 
 </Box>
);
 
export const ChartWidget= ({ data }) => (
<Box pad="medium" direction="column" background="#EEEEEE"> 
<Heading level={2}>{data.title}</Heading>
<Text alignSelf="center" size="20px" weight="bold"> {data.description} </Text>
<LineChart data={data.data} />
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
<ChartWidget data={ statCasContact }/>

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
                    <Grommet plain>
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
        