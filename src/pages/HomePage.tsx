import { Box, Grid, Show, GridItem, Flex } from '@chakra-ui/react'
import GameGrid from '../components/GameGrid'
import GameHeading from '../components/GameHeading'
import GenreList from '../components/GenreList'
import PlatformSelector from '../components/PlatformSelector'
import SortSelector from '../components/SortSelector'
import { useNavigate } from 'react-router-dom'
import useLoginStore from '../LoginStore'
import { useEffect } from 'react'

const HomePage = () => {
  const { isLogin } = useLoginStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin, navigate]);

  return (
    <Grid
    templateAreas={{
      base: `"main"`,
      lg: `"aside main"`,
    }}
    templateColumns={{
      base: '1fr',
      lg: '250px 1fr',
    }}
  >
    <Show above="lg">
      <GridItem area="aside" paddingX={5}>
        <GenreList />
      </GridItem>
    </Show>
    <GridItem area="main">
      <Box paddingLeft={2}>
        <GameHeading />
        <Flex marginBottom={5}>
          <Box marginRight={5}>
            <PlatformSelector />
          </Box>
          <SortSelector />
        </Flex>
      </Box>
      <GameGrid />
    </GridItem>
  </Grid>
  )
}

export default HomePage