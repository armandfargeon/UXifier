
//groomet app generated : dsl
import { Grommet, Box, Heading } from 'grommet';
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
function App() {
    return (
        <Grommet plain>
            <Box fill>

                <AppBar>
                    <Heading level='3' margin='none'>test</Heading>
                </AppBar>
            </Box>
        </Grommet>
    );
}

export default App;
