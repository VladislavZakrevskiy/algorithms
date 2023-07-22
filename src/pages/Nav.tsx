import RoyBar from '../components/RoyBar'
import { Box, Typography } from '@mui/material'

const Nav = () => {
	return (
		<Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row' }}>
			<RoyBar width={window.innerWidth / 6} height={window.innerHeight} />
			<Box
				sx={{
					width: '100%',
					borderRight: '1px solid #3f51b5',
					borderLeft: '1px solid #3f51b5',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 1,
					p: 15,
				}}
			>
				<Typography fontSize={40}>Hello!</Typography>
				<Typography fontSize={30} textAlign={'center'}>
					I'm frontend developer, <br /> Vladislav Zakrevskiy
				</Typography>
				<Typography fontSize={20} textAlign={'center'}>
					You are on my demo site with some my projects, that I was making in my freetime. The most
					of projects are based on some intresting algorithms, like raycasting, ant algorithm and
					etc.
				</Typography>
				<Typography fontSize={20} textAlign={'center'} m={3}>
					Thanks for attention, go up to navigation bar and hurry up to check all, promise you will
					not dissappointed
				</Typography>
			</Box>
			<RoyBar width={window.innerWidth / 6} height={window.innerHeight} />
		</Box>
	)
}

export default Nav
