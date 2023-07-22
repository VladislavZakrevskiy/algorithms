import {Button} from '@mui/material'
import {ReactNode} from 'react'
import {useNavigate} from 'react-router-dom'

interface INavButton {
    children: ReactNode
    to: string
}



const NavButton = ({children, to}: INavButton) => {
    const nav = useNavigate()

    return (
        <Button onClick={() => nav(to)} variant='contained' sx={{width: '100%'}}>
            {children}
        </Button>
    )
}

export default NavButton