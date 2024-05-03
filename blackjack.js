const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;
let gameStarted = false;

function createDeck() {
  deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  shuffleDeck();
}

function shuffleDeck() {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

function dealInitialCards() {
  playerHand = [drawCard(), drawCard()];
  dealerHand = [drawCard(), drawCard()];
  updateScores();
  renderHands();
}

function drawCard() {
  return deck.pop();
}

function updateScores() {
  playerScore = calculateScore(playerHand);
  dealerScore = calculateScore(dealerHand);
  document.getElementById('player-score').textContent = `Score: ${playerScore}`;
  document.getElementById('dealer-score').textContent = `Score: ${dealerScore}`;
}

function calculateScore(hand) {
  let score = 0;
  let aceCount = 0;
  for (let card of hand) {
    if (card.value === 'ace') {
      aceCount++;
      score += 11;
    } else if (['jack', 'queen', 'king'].includes(card.value)) {
      score += 10;
    } else {
      score += parseInt(card.value);
    }
  }
  while (score > 21 && aceCount > 0) {
    score -= 10;
    aceCount--;
  }
  return score;
}

function renderHands() {
  const playerCardsDiv = document.getElementById('player-cards');
  const dealerCardsDiv = document.getElementById('dealer-cards');
  playerCardsDiv.innerHTML = '';
  dealerCardsDiv.innerHTML = '';
  playerHand.forEach(card => {
    const cardImg = document.createElement('img');
    cardImg.src = `images\\${card.value}_of_${card.suit}.png`; // Update path to card image
    cardImg.alt = `${card.value} of ${card.suit}`;
    playerCardsDiv.appendChild(cardImg);
  });
  dealerHand.forEach((card, index) => {
    const cardImg = document.createElement('img');
    if (index === 0 && !gameStarted) {
      cardImg.src = 'images\\back.png'; // Display hidden card for dealer's first card
      cardImg.alt = 'Hidden Card';
    } else {
      cardImg.src = `images\\${card.value}_of_${card.suit}.png`; // Update path to card image
      cardImg.alt = `${card.value} of ${card.suit}`;
    }
    dealerCardsDiv.appendChild(cardImg);
  });
}

function startGame() {
  createDeck();
  dealInitialCards();
  gameStarted = true;
  document.getElementById('hit-button').disabled = false;
  document.getElementById('stand-button').disabled = false;
}

function hit() {
  playerHand.push(drawCard());
  updateScores();
  renderHands();
  if (playerScore > 21) {
    endGame();
  }
}

function stand() {
  while (dealerScore < 17) {
    dealerHand.push(drawCard());
    updateScores();
  }
  endGame();
}

function endGame() {
  gameStarted = false;
  document.getElementById('hit-button').disabled = true;
  document.getElementById('stand-button').disabled = true;
  renderHands();
  // Determine winner
  if (playerScore > 21 || (dealerScore <= 21 && dealerScore > playerScore)) {
    alert('Dealer wins!');
  } else if (dealerScore > 21 || playerScore > dealerScore) {
    alert('Player wins!');
  } else {
    alert('It\'s a tie!');
  }
}