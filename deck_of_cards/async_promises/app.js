let baseUrl = "http://deckofcardsapi.com/api/deck";

//Using async & await

//Part 1

async function drawACard(){
    let response = await $.getJSON(`${baseUrl}/new/draw/?count=1`);
    console.log(`${response.cards[0].value} of ${response.cards[0].suit}`);
}

drawACard();

//Part 2
 async function drawTwoCards(){
     let response1 = await $.getJSON(`${baseUrl}/new/draw/?count=1`);
     let deckId = response1.deck_id;
     let response2 = await $.getJSON(`${baseUrl}/${deckId}/draw/?count=1`);
     let cardArr = [response1.cards[0], response2.cards[0]];
     console.log(`You drew ${cardArr[0].value} of ${cardArr[0].suit} and ${cardArr[1].value} of ${cardArr[1].suit}`);
 }

 drawTwoCards();

 //Part 3
let onloadDeck;
let angle = 0;

 async function newDeck(){
     let response = await $.getJSON(`${baseUrl}/new/shuffle/?deck_count=1`);
     onloadDeck = response.deck_id;     
 }

 async function drawCard(){
     let response = await $.getJSON(`${baseUrl}/${onloadDeck}/draw/?count=1`);
     $('.placeCard').append($('<img>', {
        src: response.cards[0].image,
        css: {
            transform: `rotate(${angle}deg)`,
            position: 'absolute',
            left:0,
            right:0,
        }
    }))
    angle += 10;
    if (response.remaining === 0){
        $('.drawBtn').remove();
    }     
 }


 $('.drawBtn').on('click', ()=>{
    drawCard();
});

$('.reloadBtn').on('click', ()=>{
    location.reload();
});

