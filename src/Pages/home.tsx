import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';

import { fetchMTGCards } from '../Util/api/mtg';

const StyledDiv = styled.div`
    color: #333;
`;

const Home: React.FC = () => {

    const handleFetchCards = async () => {
        try {
            const cards = await fetchMTGCards();
            console.log(cards);
            } catch (error) {
            console.error(error);
            }
    }
    
    return (
    <StyledDiv>
        <h1>Welcome to the Home Page</h1>
        <p>This is the home page of our application.</p>
        <Button variant="contained" color="primary" onClick={handleFetchCards}>
            Fetch MTG Cards
        </Button>
    </StyledDiv>
    );
};

export default Home;