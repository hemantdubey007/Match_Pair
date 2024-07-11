const cards = [
    { image: 'strawberry.png', id: 1 },
    { image: 'donut.png', id: 2 },
    { image: 'star.png', id: 3 },
    { image: 'heart.png', id: 4 },
    { image: 'strawberry.png', id: 1 },
    { image: 'donut.png', id: 2 },
    { image: 'star.png', id: 3 },
    { image: 'heart.png', id: 4 },
    { image: 'strawberry.png', id: 1 },
    { image: 'donut.png', id: 2 },
    { image: 'star.png', id: 3 },
    { image: 'heart.png', id: 4 },
    { image: 'strawberry.png', id: 1 },
    { image: 'donut.png', id: 2 },
    { image: 'star.png', id: 3 },
    { image: 'heart.png', id: 4 }
  ];

  let gameBoard = document.getElementById('gameBoard');
  let attemptsSpan = document.getElementById('attempts');
  let attempts = 0;
  let flippedCards = [];
  let matchedCards = [];

  function startGame() {
    attempts = 0;
    attemptsSpan.textContent = attempts;
    flippedCards = [];
    matchedCards = [];

    // Shuffle cards array
    shuffle(cards);

    // Create cards on the game board
    gameBoard.innerHTML = '';
    for (let i = 0; i < cards.length; i++) {
      let card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('data-id', cards[i].id);
      card.addEventListener('click', flipCard);
      let cardImg = document.createElement('img');
      cardImg.src = 'images/' + cards[i].image;
      card.appendChild(cardImg);
      gameBoard.appendChild(card);
    }
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function flipCard() {
    if (flippedCards.length < 2 && !matchedCards.includes(this)) {
      this.classList.add('flipped');
      flippedCards.push(this);
      if (flippedCards.length === 2) {
        // Check if cards match
        setTimeout(() => {
          checkMatch();
        }, 500);
      }
    }
  }

  function checkMatch() {
    attempts++;
    attemptsSpan.textContent = attempts;

    if (flippedCards[0].dataset.id === flippedCards[1].dataset.id) {
      // Cards match
      flippedCards.forEach(card => {
        card.classList.add('matched');
      });
      matchedCards = matchedCards.concat(flippedCards);
      flippedCards = [];

      // Check if all cards are matched
      if (matchedCards.length === cards.length) {
        setTimeout(() => {
          alert('WoW!!! You won!! 🥳🥳🥳');
          startGame();
        }, 500);
      }
    } else {
      // Cards don't match
      setTimeout(() => {
        flippedCards.forEach(card => {
          card.classList.remove('flipped');
        });
        flippedCards = [];
      }, 1000);
    }
  }

  startGame();