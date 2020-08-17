'use strict'


//array of result ideas
let jsonData1 = $.getJSON('js/results.json', function (data) {
    console.log(jsonData1);
}).fail(function(){
    console.log("Error");
});


//let allResults = $.parseJSON(jsonData1);

//array of all the keywords
let jsonData2;
$.getJSON('js/keywords.json', function (data) {
    jsonData2 = data;
    console.log(data);
}).fail(function(){
    console.log("Error");
});

//let keywords = $.parseJSON(jsonData2);
/*
keywords = keywords.map((word) => {
    word.toLowerCase();
});
*/

function renderResult(data) {
    data.forEach()
}



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





//function to display side navigation content on click
/*
let firstA = document.querySelector('.side-tab a');
let secondA = document.querySelector('.content:last-of-type');
firstA.style.color = '#a9a9a9';
firstA.style.textDecoration = 'underline #a9a9a9';
firstA.style.display = 'block';
secondA.style.display = 'none';

document.querySelectorAll('.side-tab a')[1].addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.content:last-of-type').style.display = 'block';
    document.querySelector('.content').style.display = 'none';
    document.querySelector('.side-tab a:last-of-type').style.color = '#a9a9a9';
    document.querySelector('.side-tab a:last-of-type').style.textDecoration = 'underline #a9a9a9';
    document.querySelector('.side-tab a').style.color = 'black';
    document.querySelector('.side-tab a').style.textDecoration = 'none';
})
document.querySelectorAll('.side-tab a')[0].addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.content:last-of-type').style.display = 'none';
    document.querySelector('.content').style.display = 'block';
    document.querySelector('.side-tab a:last-of-type').style.color = 'black';
    document.querySelector('.side-tab a:last-of-type').style.textDecoration = 'none';
    document.querySelector('.side-tab a').style.color = '#a9a9a9';
    document.querySelector('.side-tab a').style.textDecoration = 'underline #a9a9a9';
    
})



function toggleDisplay(element) {
    if (element.style.display == 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function toggleTextDeco(element) {
    if (element.style.color == 'black') {
        element.style.color = '#a9a9a9';
        element.style.textDecoration = 'underline #a9a9a9';
    } else {
        element.style.color = 'black';
        element.style.textDecoration = 'none';
    }
}
*/