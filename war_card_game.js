const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

function createDeck() {
  const deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function playRound() {
  const playerCardDiv = document.getElementById('player-card');
  const aiCardDiv = document.getElementById('ai-card');
  const resultDiv = document.getElementById('result');

  const deck = createDeck();
  shuffleDeck(deck);

  const playerCard = deck.pop();
  const aiCard = deck.pop();

  playerCardDiv.textContent = `${playerCard.value} of ${playerCard.suit}`;
  aiCardDiv.textContent = `${aiCard.value} of ${aiCard.suit}`;

  playerCardDiv.src = `images\\${playerCard.value}_of_${playerCard.suit}.png`;
  aiCardDiv.src = `images\\${aiCard.value}_of_${aiCard.suit}.png`;

  if (values.indexOf(playerCard.value) > values.indexOf(aiCard.value)) {
    resultDiv.textContent = 'Player wins!';
  } else if (values.indexOf(playerCard.value) < values.indexOf(aiCard.value)) {
    resultDiv.textContent = 'AI wins!';
  } else {
    resultDiv.textContent = 'It\'s a tie!';
  }
}