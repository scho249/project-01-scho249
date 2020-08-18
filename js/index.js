'use strict'

//const { renderSearchResults } = require("../../problem-set-06-scho249/problem-a/js");

let allResults = [];
//array of result ideas
$.getJSON('js/results.json', function (data) {
    console.log(data);
    $.each(data, function(index, value) {
        allResults.push({
            ideaName : value.ideaName, 
            location: value.location, 
            season : value.season,
            budget : value.budget, 
            keywords : value.keywords});
    });
}).fail(function(){
    console.log("Error");
});

//console.log([{idea: "-", location: "-"}, {idea: "-", location: "-"}, {idea: "-", location: "-"}, {idea: "-", location: "-"}, {idea: "-", location: "-"}, {idea: "-", location: "-"}])

console.log(allResults);
allResults.forEach((obj) => {
    console.log(obj);
})

let keywords = [];
//array of all the keywords
/*
$.getJSON('js/keywords.json', function (data) {
    console.log(data);
    $.each(data, function(index, word) {
        console.log(word);
        keywords[index] = word;
    })
}).fail(function(){
    console.log("Error");
});




keywords = keywords.forEach((word) => {
    word = word.toLowerCase();
});

console.log(keywords);

*/


/*
//event listener to search button
let searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    let keywordQuery = document.querySelector('#searchQuery');
    keywordResult(keywordQuery);
    //hide cards
    let cardSection = document.querySelector('#suggestions');
    cardSection.classList.add(display);
    cardSection.style.display = "none";
})



//returns the search results with matching keyword
function keywordResult (keywordQuery) {
    keywordQuery = keywordQuery.toLowerCase();
    if (keywords.indexOf(keywordQuery) == -1) {
        renderError(new Error("No Results Found."));
    } else {
        let resultArr = [];
        for (let i = 0; i < allResults.length; i++) {
            allResults[i].keyword.forEach((word) => {
                if (word.toLowerCase == keywordQuery) {
                    resultArr[i] = allResults[i];
                }
            })
        }
        if (resultArr.length < 1) {
            renderError(new Error("No Results Found."));
        } else {
            renderResult(resultArr);
        }
        
    }
}

function renderResult(resultArr) {
    let resultTable = document.createElement('table');
    let tableBody = document.createElement('tbody');
    for (let i = 0; i < resultArr.length; i++) {
        let idea = result[i];
        let trow = document.createElement('tr');
        let tidea = document.createElement('td');
        tidea.innerHTML = idea.ideaName;
        let tloc = document.createElement('td');
        tloc.innerHTML = idea.location;
        let tsea = document.createElement('td');
        tsea.innerHTML = idea.season;
        let tbud = document.createElement('td');
        tbud.innerHTML = idea.budget;
        trow.appendChild(tidea, tloc, tsea, tbud);
        tableBody.appendChild(trow);
    }
    resultTable.appendChild(tableBody);
    document.getElementById('results').appendChild(resultTable);
}


//error
function renderError(err) {
    let error = document.createElement("p");
    error.classList = "alert alert-danger";
    error.innerHTML = err.message;
    document.querySelector("#records").appendChild(error);
}



*/

//function to display side navigation content on click
/*
let firstC = document.querySelector('.content');
let firstA = document.querySelector('.side-tab a');
let lastC = document.querySelector('.content:last-of-type');
let lastA = document.querySelector('.side-tab a:last-of-type');



document.querySelectorAll('.side-tab a')[1].addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.content:last-of-type').style.display = 'block';
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.side-tab a:last-of-type').style.color = '#a9a9a9';
    document.querySelector('.side-tab a:last-of-type').style.textDecoration = 'underline #a9a9a9';
    document.querySelector('.side-tab a').style.color = '#333333';
    document.querySelector('.side-tab a').style.textDecoration = 'none';
})
document.querySelectorAll('.side-tab a')[0].addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.content:last-of-type').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.side-tab a:last-of-type').style.color = '#333333';
    document.querySelector('.side-tab a:last-of-type').style.textDecoration = 'none';
    document.querySelector('.side-tab a').style.color = '#a9a9a9';
    document.querySelector('.side-tab a').style.textDecoration = 'underline #a9a9a9';  
})
*/

