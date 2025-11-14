const BASE_URL = "https://pgkeyjjn9f.execute-api.us-east-2.amazonaws.com";

export async function fetchMTGCards() {
  const response = await fetch(`${BASE_URL}/cards`);
  if (!response.ok) {
    throw new Error(`Error fetching MTG cards: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchMTGCard(input: string) {
  const response = await fetch(`${BASE_URL}/cards/${input}`);
  if (!response.ok) {
    throw new Error(`Error fetching MTG cards: ${response.statusText}`);
  }
  return response.json();
}

export async function fetchMTGCardImage(cardName: string) {
  const IMAGE_URL = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`;
  const response = await fetch(IMAGE_URL);
  if (!response.ok) {
    throw new Error(`Error fetching MTG card image: ${response.statusText}`);
  }
  return response.json();
}