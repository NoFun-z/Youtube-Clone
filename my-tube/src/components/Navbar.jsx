import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

import { logo } from '../utils/constants';
import SearchBar from './SearchBar';

const navbar = () => {
  return (
    <Stack 
      direction="row" 
      alignItems="center" 
      p={2} 
      sx={{position: 'sticky', background: '#1a1a1a', top: 0, justifyContent: 'space-between',
       zIndex: 20, height: 25}}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="logo" height={45} />  
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>Rapid Vids</span>
      </Link>
      <SearchBar/>
    </Stack>
  )
}

export default navbar