
            //groomet app generated : dsl
            import { Grommet, Box, Heading, Tabs, Tab, Image, Text } from 'grommet';
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
<Box round pad="medium" direction="column" background="#EEEEEE"> 
<Box height="xsmall" width="xsmall">
<Image fit="cover" src="shorturl.at/osJY4"/> </Box>
<Heading alignSelf="center" level="2" margin="none" size="small"> Statistiques</Heading>
<Text alignSelf="center" size="90px" weight="bold">1718</Text></Box>

					</Box>
			</Tab>
			<Tab  title="pageTwo">
					<Box name="widgetWrapperOne" 
 width="100"> 
<Box round pad="medium" direction="column" background="#EEEEEE"> 
<Box height="xsmall" width="xsmall">
<Image fit="cover" src="other"/> </Box>
<Heading alignSelf="center" level="2" margin="none" size="small"> Other</Heading>
<Text alignSelf="center" size="90px" weight="bold">1</Text></Box>

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
        