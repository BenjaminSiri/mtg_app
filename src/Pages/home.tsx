import React, {useState} from 'react';
import styled from 'styled-components';
import { Button, TextField, Stack, Card, CardContent } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { fetchMTGCards, fetchMTGCard } from '../Util/api/mtg';

const StyledDiv = styled.div`
    color: #333;
`;

const StyledCard = styled(Card)`
    padding: 5px;
    margin-bottom: 10px;
    height: 50px;
    width: 400px;
    border: 1px solid red;
    
    &:hover {
        background-color: #e0e0e0;
    }
`;

const StyledCardContent = styled(CardContent)`
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const StyledStack = styled(Stack)`
    margin-left: 20px;
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const InputDiv = styled.div`
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 50px;
`;

const StyledTextField = styled(TextField)`
    height: 100%;
    align-items: center;
    justify-content: center;


  & .MuiInputBase-root {
    height: 100%;
  }
`;

const StyledButton = styled(Button)`
    height: 100%;
    margin-left: 10px;
`; 

const Home: React.FC = () => {

    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');

    const handleFetchCards = async () => {
        setLoading(true);
        setCards([]);
        try {
            if (searchString.trim() === '') {
                const cards = await fetchMTGCards();
                console.log(cards);
                const shuffled = cards.Items.sort(() => 0.5 - Math.random());
                const randomCards = shuffled.slice(0, 10);
                setCards(randomCards);
                setLoading(false);
            } else {
                const card = await fetchMTGCard(searchString.toLowerCase());
                console.log(card);
                setCards([card]);
                setLoading(false);
            }
            } catch (error) {
            console.error(error);
            }
    }

    const handleCardClick = () => {
        alert('Card clicked!');
    }
    
    return (
    <StyledDiv>
        <InputDiv>
            <StyledTextField
                label="Search cards"
                variant="outlined"
                size="small"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
            />
            <StyledButton variant="contained" color="primary" onClick={handleFetchCards}>
                <SearchIcon />
            </StyledButton>
        </InputDiv>
        <StyledStack>
            {loading && <p>Loading...</p>}
            {cards.map((card) => (
                <StyledCard key={card.id_name} variant='outlined' onClick={handleCardClick}>
                    <StyledCardContent sx={{m:0,p:0}}>
                        <CardHeader>
                            <h4 style={{ margin: 0, padding: 0 }}>{card.name}</h4>
                            <h4 style={{ margin: 0, padding: 0 }}>{card.manaCost}</h4>
                        </CardHeader>
                        <p style={{ margin: 0, padding: 0 }}>{card.type}</p>
                    </StyledCardContent>
                </StyledCard>
            ))}
        </StyledStack>
    </StyledDiv>
    );
};

export default Home;