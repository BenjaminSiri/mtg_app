import React from 'react';
import styled from 'styled-components';

import {Menu, MenuItem, Button} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledNav = styled.nav`
    width: 100%;
    height: 60px;
    background-color: #1976d2;
    display: flex;
    justify-content: space-between;
`;

const NavBar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <StyledNav>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60">
                <circle cx="30" cy="11" r="6" fill="#ef4444"/>
                <circle cx="50" cy="28" r="6" fill="#3b82f6"/>
                <circle cx="43" cy="50" r="6" fill="#22c55e"/>
                <circle cx="17" cy="50" r="6" fill="#a855f7"/>
                <circle cx="10" cy="28" r="6" fill="#f97316"/>
            </svg>
            <Button onClick={handleClick}>
                <AccountCircleIcon sx={{color: 'black',height: '58px', width: '58px'}}/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                list: {
                    'aria-labelledby': 'basic-button',
                },
                }}
            >
                <MenuItem onClick={handleClose}>Login</MenuItem>
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
            </Menu>
        </StyledNav>
    );
}

export default NavBar;