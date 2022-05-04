let baseUrl = "http://deckofcardsapi.com/api/deck";

//Using Promises JSON

//Part 1
$.getJSON(`${baseUrl}/new/draw/?count=1`, response => {
    console.log(`${response.cards[0].value} of ${response.cards[0].suit}`);
})

//Part 2
let deckId;
let cardArr = [];

$.getJSON(`${baseUrl}/new/draw/?count=1`)
.then(res => {
    deckId = res.deck_id
    cardArr.push(res.cards[0])
    return $.getJSON(`${baseUrl}/${deckId}/draw/?count=1`)
}).then(res => {
    cardArr.push(res.cards[0]);
    console.log(`You drew ${cardArr[0].value} of ${cardArr[0].suit} and ${cardArr[1].value} of ${cardArr[1].suit}`);
})

//Part 3

let onloadDeck;
let angle = 0;

function newDeck(){
    $.getJSON(`${baseUrl}/new/shuffle/?deck_count=1`)
    .then(res => {
        onloadDeck = res.deck_id;
    })    
}

$(".drawBtn").on("click", () => {
    $.getJSON(`${baseUrl}/${onloadDeck}/draw/?count=1`)
    .then(res => {
        $('.placeCard').append($('<img>', {
            src: res.cards[0].image,
            css: {
                transform: `rotate(${angle}deg)`,
                position: 'absolute',
                left:0,
                right:0,
            }
        }))
        angle += 10;
        if (res.remaining === 0){
            $('.drawBtn').remove();
        }
    })
})

$('.reloadBtn').on('click', ()=>{
    location.reload();
});