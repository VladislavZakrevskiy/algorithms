import { Box } from '@mui/material'
import NavButton from './NavButton'
import { Home } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <Box
            sx={{
                m: 2,
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                gap: 3,
            }}
        >
            <Link to={'/'} style={{ fontSize: '64px' }}>
                <Home fontSize="inherit" color="primary" />
            </Link>
            <NavButton to={'/gravity'}>Gravity</NavButton>
            <NavButton to={'/genetic_algorithm'}>Genetic algorithm</NavButton>
            <NavButton to={'/raycasting'}>Raycasting</NavButton>
            <NavButton to={'/cullular_automat_3d'}>Cullular auto 3D</NavButton>
            <NavButton to={'/roy_algorithm'}>Roy Algorithm</NavButton>
            <NavButton to={'/ant_algorithm'}>Ant Algorithm</NavButton>
            <NavButton to={'/sort'}>Sorting</NavButton>
        </Box>
    )
}

export default Navbar
