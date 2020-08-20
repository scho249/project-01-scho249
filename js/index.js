'use strict'

//fetching local json data
let allResults = $.getJSON('js/results.json', function () {
    console.log("Fetching Local File")
}).done(function () {
    console.log("Have Data")
    console.log(allResults.responseJSON);

    allResults.responseJSON.map((item) => {
        console.log(item);
    });
});


let keywords = $.getJSON('js/keywords.json', function () {
    console.log("Fetching Local File")
}).done(function () {
    console.log("Have Data")
    console.log(keywords.responseJSON);

    keywords.responseJSON.map((item) => {
        console.log(item);
    });
});

//click on top navigation icon directs to index.html (Build your list page)



//working on side tab - need to tidy up code
if (document.querySelector('.side-tab a')) {
    if ($(window).width > '768px') {
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
    }

}

function toggleDisplay(content) {
    if (content.style.display == 'block') {
        content.style.display = 'none';
    } else  if (content.style.display == 'none') {
        content.style.display = 'block';
    }
}


if (document.querySelector('button')) {

    //Dashboard page search form
    //event listener to search button
    let searchBtn = document.querySelector('button');
    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        let keywordQuery = document.querySelector('#searchQuery').value;
        renderResult(keywordQuery);
        //hide cards
        let cardSection = document.querySelector('#suggestions');
        cardSection.style.display = "none";
    })

    let input = document.querySelector('#searchQuery');
    input.addEventListener('keyup', (event) => {
        event.preventDefault();
        if (event.keyCode == 13) {
            searchBtn.click();
        }
    })


    //returns the search results with matching keyword
    function renderResult(keywordQuery) {
        let searchResults = document.querySelector("#results");
        while (searchResults.hasChildNodes()) {
            searchResults.removeChild(searchResults.firstChild);
        }
        keywordQuery = keywordQuery.toLowerCase();
        console.log(keywordQuery);
        console.log(keywords.responseJSON.includes(keywordQuery))
        if (!keywords.responseJSON.includes(keywordQuery)) {
            renderError(new Error("No Results Found. Try different keywords like below."));
        } else {
            let resultArr = [];
            for (let i = 0; i < allResults.responseJSON.length; i++) {
                allResults.responseJSON[i].keyword.forEach((word) => {
                    if (word.toLowerCase() == keywordQuery) {
                        resultArr.push(allResults.responseJSON[i]);
                    }
                })
            }
            console.log(resultArr);
            if (resultArr.length < 1) {
                renderError(new Error("No Results Found. Try different keywords like below."));
            } else {
                keywordResult(resultArr);
            }
        }

        searchResults.style.marginTop = '50px';
        let borderSpan = document.createElement('span');
        searchResults.appendChild(borderSpan);
        borderSpan.style.display = 'block';
        borderSpan.style.color = 'white';
        borderSpan.style.border = 'none';
        borderSpan.style.height = '1.5px';
        borderSpan.style.margin = '100px auto 50px auto';
        borderSpan.style.background = '#333333';
        borderSpan.style.background = '-webkit-gradient(radial, 50% 50%, 0, 50% 50%, 500, from(#757575), to(#fff))';

    }



    //Add button for cards
    let addBtn = document.querySelectorAll('.cardback button');
    for (let i = 0; i < addBtn.length; i++) {
        addBtn[i].addEventListener('click', function (event) {
            event.preventDefault();
            this.innerHTML = 'Added!';
            this.style.backgroundColor = '#bedef3';
            findData(addBtn[i]);

        })
    }

    let frontBtn = document.querySelectorAll('.cardfront button');
    for (let i = 0; i < frontBtn.length; i++) {
        frontBtn[i].addEventListener('click', (event) => {
            event.preventDefault();
            let icon = frontBtn[i].querySelector('i');
            icon.className = "fa fa-check";
            icon.style.color = '#90e390';
            findData(addBtn[i]);
        })
    }

    function findData(clickedBtn) {
        let clickedCard = clickedBtn.parentElement.parentElement;
        let clickedIdea = clickedCard.querySelector('h3').innerHTML;
        for (let i = 0; i < allResults.responseJSON.length; i++) {
            if (clickedIdea == allResults.responseJSON[i].ideaName) {
                clickedIdea = allResults.responseJSON[i];
            }
        }
        console.log(clickedIdea);
        addToList(clickedIdea);
    }

    function addToList(ideaObj) {
        //where the idea is added to the list
    }

    //functions for search form
    function keywordResult(resultArr) {
        let resultTable = document.createElement('table');
        let tableHead = document.createElement('thead');
        let theadRow = document.createElement('tr');
        let theadD1 = document.createElement('td');
        theadD1.innerHTML = 'Idea';
        theadRow.appendChild(theadD1);
        let theadD2 = document.createElement('td');
        theadD2.innerHTML = 'Location';
        theadRow.appendChild(theadD2);
        let theadD3 = document.createElement('td');
        theadD3.innerHTML = 'Best Season';
        theadRow.appendChild(theadD3);
        let theadD4 = document.createElement('td');
        theadD4.innerHTML = 'Expected Budget';
        theadRow.appendChild(theadD4);
        tableHead.appendChild(theadRow);
        resultTable.appendChild(tableHead);
        //putting results into table
        let tableBody = document.createElement('tbody');
        for (let i = 0; i < resultArr.length; i++) {
            let idea = resultArr[i];
            console.log(idea);
            let trow = document.createElement('tr');
            let tidea = document.createElement('td');
            tidea.innerHTML = idea.ideaName;
            console.log(tidea.innerHTML);
            let tloc = document.createElement('td');
            tloc.innerHTML = idea.location;
            console.log(tloc.innerHTML);
            let tsea = document.createElement('td');
            tsea.innerHTML = idea.season;
            let tbud = document.createElement('td');
            tbud.innerHTML = idea.budget;
            trow.appendChild(tidea);
            trow.appendChild(tloc);
            trow.appendChild(tsea);
            trow.appendChild(tbud);
            tableBody.appendChild(trow);
        }
        resultTable.appendChild(tableBody);
        resultTable.style.width = '80%';
        tableHead.style.backgroundColor = '#dbf1ff';
        document.querySelector('#results').appendChild(resultTable);
    }


    //error
    function renderError(err) {
        let error = document.createElement("h3");
        error.classList = "alert alert-danger";
        error.innerHTML = err.message.italics();
        document.querySelector("#results").appendChild(error);
        error.style.color = '#6699cc';
        error.style.textAlign = 'center';
    }

}






