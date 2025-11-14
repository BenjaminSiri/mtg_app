import React, {useState} from 'react';
import styled from 'styled-components';
import { Button, TextField, Stack, Card, CardContent } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import { fetchMTGCards, fetchMTGCard, fetchMTGCardImage } from '../Util/api/mtg';

import loadingGif from '../gifs/loading.gif';

const StyledDiv = styled.div`
    color: #333;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const SearchContainer = styled.div`
    flex: 1;
    max-width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const ImageContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex: 2;
    max-width: 100%;
`;

const StyledCard = styled(Card)`
    padding: 5px;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-right: 20px;
    height: 50px;
    
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
    width: 100%;
    min-width: 200px;
    max-width: 600px;
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
    min-width: 300px;
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

const StyledImage = styled.img`
    margin: 20px;
    width: 100%;
    min-width: 200px;
    max-width: 400px;
    height: auto;
    object-fit: contain;
`;

const Home: React.FC = () => {

    const [cards, setCards] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingImage, setLoadingImage] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');
    const [imageURI, setImageURI] = useState<string>('');
    const [noMatch, setNoMatch] = useState<boolean>(false);

    const handleFetchCards = async () => {
        setLoading(true);
        setNoMatch(false);
        setImageURI('');
        setCards([]);
        try {
            if (searchString.trim() === '') {
                const cards = await fetchMTGCards();
                const shuffled = cards.Items.sort(() => 0.5 - Math.random());
                const randomCards = shuffled.slice(0, 10);
                setCards(randomCards);
                setLoading(false);
            } else {
                const card = await fetchMTGCard(searchString.toLowerCase());
                if (card) {
                    setCards([card]);
                } else {
                    setNoMatch(true);
                }
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleCardClick = async (cardName: string) => {
        setLoadingImage(true);
        setImageURI('');
        const scryfallJSON = await fetchMTGCardImage(cardName);
        setImageURI(scryfallJSON.image_uris.normal);
        setLoadingImage(false);
    }
    
    return (
    <StyledDiv>
        <SearchContainer>
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
                {noMatch && <p>No matching cards found.</p>}
                {cards.map((card) => (
                    <StyledCard key={card.id_name} variant='outlined' onClick={() => handleCardClick(card.name)}>
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
        </SearchContainer>
        <ImageContainer>
            {imageURI && <StyledImage src={imageURI} alt="MTG Card" />}
            {loadingImage && <img src={loadingGif} alt="Loading..." style={{height: '100px', width: '100px', marginTop: '200px'}} />}
        </ImageContainer>
    </StyledDiv>
    );
};

export default Home;