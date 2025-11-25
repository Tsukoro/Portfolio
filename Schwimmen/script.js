// Phase 1: The Virtual Deck
let playerHand = [];
let opponentHand = [];
let centerCards = [];
let selectedPlayerCardIndex = null;
let selectedCenterCardIndex = null;
let currentTurn = 'player'; // 'player' or 'opponent'
let knocker = null;
let gameActive = true;



function logEvent(message) {
    const logDiv = document.getElementById("game-log");
    if (logDiv) {
        logDiv.innerText = message;
    }
}

function selectCard(index) {
    if (!gameActive) return;
    if (currentTurn !== 'player') return;
    if (selectedPlayerCardIndex === index) {
        selectedPlayerCardIndex = null;
    } else {
        selectedPlayerCardIndex = index;
    }
    renderGame();
    swapCardsPlayer();
}

function selectCenterCard(index) {
    if (!gameActive) return;
    if (currentTurn !== 'player') return;
    if (selectedCenterCardIndex === index) {
        selectedCenterCardIndex = null;
    } else {
        selectedCenterCardIndex = index;
    }
    renderGame();
    swapCardsPlayer();
}

// function for skipping turn (Button Handler)
function skip() {
    if (!gameActive) return;
    if (currentTurn !== 'player') return;
    logEvent("Player skipped turn.");
    performSkip();
}

// Internal skip logic
function performSkip() {
    if (!gameActive) return;
    switchTurn();
}

// function for knocking (Button Handler)
function knock() {
    if (!gameActive) return;
    if (currentTurn !== 'player') return;
    performKnock();
}

// Internal knock logic
function performKnock() {
    if (!gameActive) return;
    if (knocker !== null) return; // Can't knock if someone already knocked

    knocker = currentTurn;
    logEvent("Player KNOCKED!");
    switchTurn();
}

// function for swapping all cards (Button Handler)
function swapALL() {
    if (!gameActive) return;
    if (currentTurn !== 'player') return;
    performSwapAll();
}

// Internal swap all logic
function performSwapAll() {
    if (!gameActive) return;
    if (currentTurn === 'player') {
        let a = playerHand;
        playerHand = centerCards;
        centerCards = a;
        logEvent("Player swapped ALL cards!");
        switchTurn();
    } else {
        let a = opponentHand;
        opponentHand = centerCards;
        centerCards = a;
        logEvent("Opponent swapped ALL cards!");
        switchTurn();
    }
}

// Centralized function to handle turn switching and game end checks
function switchTurn() {
    // Toggle turn
    if (currentTurn === 'player') {
        currentTurn = 'opponent';
    } else {
        currentTurn = 'player';
    }

    // Check if the turn returned to the knocker -> Game Over
    if (knocker === currentTurn) {
        endGame();
        return;
    }

    renderGame();

    // If it's now opponent's turn, trigger their move
    if (currentTurn === 'opponent') {
        setTimeout(opponentTurn, 1000);
    }
}

// function to swap two cards
function swapCardsPlayer() {
    // Only allow swap if it's player's turn and both cards are selected
    if (!gameActive) return;
    if (currentTurn !== 'player') return;

    if (selectedPlayerCardIndex != null && selectedCenterCardIndex != null) {
        let a = playerHand[selectedPlayerCardIndex]
        let b = centerCards[selectedCenterCardIndex]
        playerHand[selectedPlayerCardIndex] = b
        centerCards[selectedCenterCardIndex] = a

        // Reset selections
        selectedPlayerCardIndex = null;
        selectedCenterCardIndex = null;

        logEvent("Player swapped a card.");
        // Switch turn
        switchTurn();
    }
}

function opponentTurn() {
    if (!gameActive) return;

    // Simple AI: Swap the first card for now (we can make this smarter later)
    console.log("Opponent is thinking...");
    logEvent("Opponent is thinking...");

    // Advanced AI
    // Building all permutations of possible swaps
    let copy = opponentHand;
    // no swap, knock or pass
    let hand1 = copy.slice();
    // swap All
    let hand2 = centerCards.slice();
    // swap first card with first card of center
    let hand3 = copy.slice();
    hand3[0] = centerCards[0];
    // swap second card with first card of center
    let hand4 = copy.slice();
    hand4[1] = centerCards[0];
    // swap third card with first card of center
    let hand5 = copy.slice();
    hand5[2] = centerCards[0];
    // swap first card with second card of center
    let hand6 = copy.slice();
    hand6[0] = centerCards[1];
    // swap second card with second card of center
    let hand7 = copy.slice();
    hand7[1] = centerCards[1];
    // swap third card with second card of center
    let hand8 = copy.slice();
    hand8[2] = centerCards[1];
    // swap first card with third card of center
    let hand9 = copy.slice();
    hand9[0] = centerCards[2];
    // swap second card with third card of center
    let hand10 = copy.slice();
    hand10[1] = centerCards[2];
    // swap third card with third card of center
    let hand11 = copy.slice();
    hand11[2] = centerCards[2];
    let list_of_all_perms = [];
    list_of_all_perms.push(hand1, hand2, hand3, hand4, hand5, hand6, hand7, hand8, hand9, hand10, hand11);
    let max_perm = hand1;
    for (perm of list_of_all_perms) {
        let perm_val = calculateHandValue(perm);
        if (perm_val > calculateHandValue(max_perm)) {
            max_perm = perm;
        }
    }
    if (max_perm == hand1) {
        if (calculateHandValue(max_perm) >= 27 && knocker === null) {
            knocker = currentTurn;
            logEvent("Opponent KNOCKED!");
            switchTurn();
        } else {
            logEvent("Opponent skipped turn.");
            performSkip();
        }
    }
    if (max_perm == hand2) {
        performSwapAll();
    }
    if (max_perm == hand3) {
        let a = opponentHand[0];
        opponentHand[0] = centerCards[0];
        centerCards[0] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand4) {
        let a = opponentHand[1];
        opponentHand[1] = centerCards[0];
        centerCards[0] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand5) {
        let a = opponentHand[2];
        opponentHand[2] = centerCards[0];
        centerCards[0] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand6) {
        let a = opponentHand[0];
        opponentHand[0] = centerCards[1];
        centerCards[1] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand7) {
        let a = opponentHand[1];
        opponentHand[1] = centerCards[1];
        centerCards[1] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand8) {
        let a = opponentHand[2];
        opponentHand[2] = centerCards[1];
        centerCards[1] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand9) {
        let a = opponentHand[0];
        opponentHand[0] = centerCards[2];
        centerCards[2] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand10) {
        let a = opponentHand[1];
        opponentHand[1] = centerCards[2];
        centerCards[2] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }
    if (max_perm == hand11) {
        let a = opponentHand[2];
        opponentHand[2] = centerCards[2];
        centerCards[2] = a;
        logEvent("Opponent swapped a card.");
        switchTurn();
    }

    // Failsafe: If turn didn't switch, force skip
    if (currentTurn === 'opponent' && gameActive) {
        console.warn("Opponent AI hung. Forcing skip.");
        performSkip();
    }
}

// End Game Function
function endGame() {
    if (!gameActive) return; // Prevent double ending
    gameActive = false;

    renderGame(); // Render one last time to show final state (and maybe reveal opponent cards?)

    let playerVal = calculateHandValue(playerHand);
    let opponentVal = calculateHandValue(opponentHand);
    let message = "";

    if (playerVal > opponentVal) {
        message = "Player wins! (" + playerVal + " vs " + opponentVal + ")";
    } else if (playerVal < opponentVal) {
        message = "Opponent wins! (" + opponentVal + " vs " + playerVal + ")";
    } else {
        message = "It's a tie! (" + playerVal + ")";
    }

    console.log(message);
    logEvent(message);
    document.querySelector("h1").innerText = message;
}

// function to calculate the score of a hand
// expects an array with 3 elements
function calculateHandValue(hand) {
    let suitSums = {
        "♥": 0,
        "♦": 0,
        "♣": 0,
        "♠": 0
    }
    // edge case: three of a kind
    if (hand[0].rank == hand[1].rank && hand[1].rank == hand[2].rank && hand[0].rank != "A") {
        return 30.5
    }
    // second edge case: three Aces
    if (hand[0].rank == hand[1].rank && hand[1].rank == hand[2].rank && hand[0].rank == "A") {
        return 33
    }
    // calculate normal sums
    for (let card of hand) {
        if (card.suit == "♥") {
            suitSums["♥"] += card.value
        } else if (card.suit == "♦") {
            suitSums["♦"] += card.value
        } else if (card.suit == "♣") {
            suitSums["♣"] += card.value
        } else if (card.suit == "♠") {
            suitSums["♠"] += card.value
        }
    }
    // return the highest sum
    return Math.max(suitSums["♥"], suitSums["♦"], suitSums["♣"], suitSums["♠"])
}

//function to render the game
//expects no arguments
function renderGame() {
    document.getElementById("player-area").innerHTML = "";
    document.getElementById("center-area").innerHTML = "";
    document.getElementById("opponent-area").innerHTML = "";

    playerHand.forEach((card, index) => {
        document.getElementById("player-area").appendChild(renderCard(card, index, 'player'));
    });

    for (let card of opponentHand) {
        document.getElementById("opponent-area").appendChild(renderOpponentCard(card));
    }

    centerCards.forEach((card, index) => {
        document.getElementById("center-area").appendChild(renderCard(card, index, 'center'));
    });

    document.getElementById("score-area").innerText = calculateHandValue(playerHand);
    if (calculateHandValue(playerHand) >= 31) {
        endGame();
    }
    if (calculateHandValue(opponentHand) >= 31) {
        endGame();
    }

    // Update button states
    const btnKnock = document.getElementById("btn-knock");
    const btnSkip = document.getElementById("btn-skip");
    const btnSwapAll = document.getElementById("btn-swap-all");

    if (btnKnock) {
        btnKnock.disabled = !gameActive || (knocker !== null);
        if (knocker !== null) {
            btnKnock.style.opacity = "0.5";
            btnKnock.style.cursor = "not-allowed";
        } else {
            btnKnock.style.opacity = "1";
            btnKnock.style.cursor = "pointer";
        }
    }
    if (btnSkip) btnSkip.disabled = !gameActive;
    if (btnSwapAll) btnSwapAll.disabled = !gameActive;
}

// helper function for dealing cards to a stack_of_cards
// expects an array and a deck as arguments
function dealCards(stack_of_cards, deck) {
    for (let i = 0; i < 3; i++) {
        stack_of_cards.push(deck.pop())
    }
}


// function to start a new game
// expects no arguments
function startNewGame() {
    let Deck = createDeck();
    let shuffledDeck = shuffleDeck(Deck);
    playerHand = [];
    opponentHand = [];
    centerCards = [];
    knocker = null;
    currentTurn = 'player';
    gameActive = true;
    document.querySelector("h1").innerText = "Schwimmen";
    dealCards(playerHand, shuffledDeck)
    dealCards(opponentHand, shuffledDeck)
    dealCards(centerCards, shuffledDeck)
    renderGame()
    logEvent("New Game Started! Good Luck.");
}


function createDeck() {
    // Your code here
    // creates a deck of cards
    const deck = [];
    const suits = ["♥", "♦", "♣", "♠"];
    const ranks = ["7", "8", "9", "10", "J", "Q", "K", "A"]
    for (let suit of suits) {
        for (let rank of ranks) {
            let value;
            if (rank == "J") {
                value = 10
            } else if (rank == "Q") {
                value = 10
            } else if (rank == "K") {
                value = 10
            } else if (rank == "A") {
                value = 11
            } else {
                value = parseInt(rank)
            }

            const card = {
                suit,
                rank,
                value
            }
            console.log(card)
            deck.push(card)
        }
    }
    return deck
}

function shuffleDeck(deck) {
    // Fisher-Yates Shuffle
    // Multiplies the index+1 with a random number between 0 and 1 and then floors it to get a random index.
    // Then swaps the two elements at the random index and the current index.
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck
}

function renderCard(cardObject, index, type) {
    // renders a card as a div
    // cardObject is an object with the properties suit, rank, and value
    // type is "player" or "center"
    const cardDiv = document.createElement("div");

    let isSelected = false;
    if (type === 'player' && index === selectedPlayerCardIndex) {
        isSelected = true;
    } else if (type === 'center' && index === selectedCenterCardIndex) {
        isSelected = true;
    }

    if (isSelected) {
        cardDiv.classList.add("Selectedcard");
    } else {
        cardDiv.classList.add("card");
    }

    cardDiv.dataset.suit = cardObject.suit;
    cardDiv.innerText = cardObject.suit + " " + cardObject.rank;

    if (type === 'player') {
        cardDiv.onclick = function () {
            selectCard(index);
        };
    } else if (type === 'center') {
        cardDiv.onclick = function () {
            selectCenterCard(index);
        };
    }

    return cardDiv;
}

function renderOpponentCard(cardObject) {
    // renders a card as a div
    // cardObject is an object with the properties suit, rank, and value
    const cardDiv = document.createElement("div");

    if (!gameActive) {
        cardDiv.classList.add("card");
        cardDiv.dataset.suit = cardObject.suit;
        cardDiv.innerText = cardObject.suit + " " + cardObject.rank;
    } else {
        cardDiv.classList.add("opponent-card");
        cardDiv.innerText = "?";
    }
    return cardDiv;
}



// Test code
startNewGame()
