
let baseUrl = "http://numbersapi.com/"

//Using Promises JSON

//Part 1
let favNum = 8;
let numFact;

$.getJSON(`${baseUrl}${favNum}?json`, response => {
    numFact = response;
    console.log(numFact);
})

//Part 2
let favNums = [3, 6, 9];

let numFacts;

$.getJSON(`${baseUrl}${favNums}?json`, response => {
    numFacts = response;
    console.log(numFacts);
})

//Part 3
Promise.all(
    Array.from({length:4}, ()=>{
        return $.getJSON(`${baseUrl}${favNum}?json`);
    })
).then(facts => {
    facts.forEach(fact => $('.partOne').append(`<li>${fact.text}</li>`))
});


//Using async & await

//Part 1
async function getNumFact(){
    let numFactObj = await $.getJSON(`${baseUrl}${favNum}?json`);
    console.log(numFactObj);
}

getNumFact();

//Part 2

async function getNumFacts(){
    let numFactObj = await $.getJSON(`${baseUrl}${favNums}?json`);
    console.log(numFactObj);
}

getNumFacts();

//Part 3

async function getAllNumFacts(){
    let fourNumFacts = await Promise.all(
        Array.from({length:4}, ()=>{
            return $.getJSON(`${baseUrl}${favNum}?json`);
        })
    );
    console.log(fourNumFacts);
    fourNumFacts.forEach(fact => $('.partTwo').append(`<li>${fact.text}</li>`));
}

getAllNumFacts();