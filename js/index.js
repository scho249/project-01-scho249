'use strict'

//fetching local json data

//allResults contains all the bucket list result ideas shown when user searches for keywords
let allResults = $.getJSON('js/results.json', function () {
    console.log("Fetching Local File")
}).done(function () {
    console.log("Have Data")
    console.log(allResults.responseJSON);

    allResults.responseJSON.map((item) => {
        console.log(item);
    });
});

//keywords is the array of all the keywords available to be searched
let keywords = $.getJSON('js/keywords.json', function () {
    console.log("Fetching Local File")
}).done(function () {
    console.log("Have Data")
    console.log(keywords.responseJSON);

    keywords.responseJSON.map((item) => {
        console.log(item);
    });
});





//side navigation tab in About page. Clicking on each link displays different content. 
if (document.querySelector('.side-tab a')) {
    let aboutLink = document.querySelector('.side-tab a');
    let policyLink = document.querySelector('.side-tab a:last-of-type');
    let aboutC = document.querySelector('.content');
    let policyC = document.querySelector('.content:last-of-type');
    document.querySelectorAll('.side-tab a')[1].addEventListener('click', (event) => {
        event.preventDefault();
        policyC.style.display = 'block';
        aboutC.style.display = 'none';
        policyLink.style.color = '#8f8f8f';
        policyLink.style.textDecoration = 'underline #8f8f8f';
        aboutLink.style.color = '#333333';
        aboutLink.style.textDecoration = 'none';
        resize(); // call resize
    })
    document.querySelectorAll('.side-tab a')[0].addEventListener('click', (event) => {
        event.preventDefault();
        policyC.style.display = 'none';
        aboutC.style.display = 'block';
        policyLink.style.color = '#333333';
        policyLink.style.textDecoration = 'none';
        aboutLink.style.color = '#8f8f8f';
        aboutLink.style.textDecoration = 'underline #8f8f8f';
        // same thing as resize function but for about form
        window.addEventListener('resize', function(event){
            event.preventDefault();
            let policyC = document.querySelector('.content:last-of-type');
            policyC.style.display = 'none'; // hide privacy policy (doesn't work)
            let aboutC = document.querySelector('.content');
            if(window.innerWidth < 768) {
             aboutC.style.display = 'flex';
             aboutC.setAttribute("style", "justify-content: center");
            }else {
                aboutC.style.display = 'block';
            }
          });
    })

}
// change display for privacy policy when page is resized
function resize () {
        window.addEventListener('resize', function(event){
            event.preventDefault();
            let aboutC = document.querySelector('.content');
            aboutC.style.display = 'none'; // hide about section
            let policyC = document.querySelector('.content:last-of-type');
            if(window.innerWidth < 768) { // flex display for smaller screens
                policyC.style.display = 'flex';
                policyC.setAttribute("style", "justify-content: center");
            }else {
                policyC.style.display = 'block'; //block for larger screens
            }
        });
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



}


//hamburger menu for mobile display width
let hamburger = document.querySelector('.hamburger-menu');
let links = document.querySelector('.page-links');

hamburger.addEventListener('click', (event) => {
    event.preventDefault();
    if (links.style.display == 'block') {
        links.style.display = 'none';
    } else {
        links.style.display = 'block';
    }

})



if (document.querySelector('.form-container')) {
    class Task {
        constructor(string, number, location, date, boolean) {
            this.description = string;
            this.number = number;
            this.location = location;
            this.date = date;
            this.complete = boolean;
        }

        render() {
            let row = document.createElement('tr');
            let elem = document.createElement('td');
            let elem2 = document.createElement('td');
            let elem3 = document.createElement('td');
            let elem4 = document.createElement('td');
            row.appendChild(elem);
            row.appendChild(elem2);
            row.appendChild(elem3);
            row.appendChild(elem4);
            elem.textContent = this.description;
            elem2.textContent = this.number;
            elem3.textContent = this.location;
            elem4.textContent = this.date;
            if (this.complete) {
                row.classList.add('strikeout');
            }
            row.addEventListener('click', () => {
                this.toggleFinished();
                row.classList.toggle('strikeout');
            })
            return row;
        }

        toggleFinished() {
            this.complete = !this.complete; //make opposite
        }
    }

    class TaskList {
        constructor(taskArray) {
            this.tasks = taskArray;
        }

        addTask(string, number, location, date) {
            this.tasks.push(new Task(string, number, location, date, false));
        }

        render() {
            //let olElem = document.createElement('ol');

            let listTable = document.createElement('div');
            listTable.classList.add('list-table');
            let table = document.createElement('table');
            listTable.appendChild(table);
            let head = document.createElement('thead');
            table.appendChild(head);
            let trElem = document.createElement('tr');
            head.appendChild(trElem);
            // table columns
            let col1 = document.createElement('th');
            col1.textContent = "Activity Name";
            col1.setAttribute('scope', 'col1')
            let col2 = document.createElement('th');
            col2.textContent = "Budget";
            col2.setAttribute('scope', 'col1')
            let col3 = document.createElement('th');
            col3.textContent = "Location";
            col3.setAttribute('scope', 'col1')
            let col4 = document.createElement('th');
            col4.textContent = "Completion Date";
            col4.setAttribute('scope', 'col1');
            trElem.appendChild(col1);
            trElem.appendChild(col2);
            trElem.appendChild(col3);
            trElem.appendChild(col4);


            let tbody = document.createElement('tbody');
            table.appendChild(tbody);
            this.tasks.forEach(task => {
                tbody.appendChild(new Task(task.description, task.number, task.location, task.date, task.complete).render());
            });
            return listTable;
        }
    }

    class NewTaskForm {
        constructor(callback) {
            this.submitCallback = callback;
        }

        render() {

            let formElem = document.createElement('form'); // create form

            // children
            let ulElem = document.createElement('ul'); // create ul
            ulElem.classList.add('form-container');

            let liElem = document.createElement('li'); //create li
            ulElem.appendChild(liElem); //append to ul
            let inputElem = document.createElement('input'); // create input
            inputElem.setAttribute('placeholder', "Enter activity name here");
            let labelElem = document.createElement('label'); // create label
            labelElem.setAttribute('for', 'activity-name');
            labelElem.textContent = "Activity Name:";

            let liElem2 = document.createElement('li'); //create li
            ulElem.appendChild(liElem2); //append to ul
            let inputElem2 = document.createElement('input'); // create input
            //inputElem2.setAttribute('type', 'number');
            inputElem2.setAttribute('placeholder', "Enter budget");
            let labelElem2 = document.createElement('label'); // create label
            labelElem2.setAttribute('for', 'budget');
            labelElem2.textContent = "Budget:";

            let liElem3 = document.createElement('li'); //create li
            ulElem.appendChild(liElem3); //append to ul
            let inputElem3 = document.createElement('input'); // create input
            inputElem3.setAttribute('placeholder', "Enter location here");
            let labelElem3 = document.createElement('label'); // create label
            labelElem3.setAttribute('for', 'location');
            labelElem3.textContent = "Location:";

            let liElem4 = document.createElement('li'); //create li
            ulElem.appendChild(liElem4); //append to ul
            let inputElem4 = document.createElement('input'); // create input
            inputElem4.setAttribute('placeholder', "Enter expected finish date");
            inputElem4.setAttribute('type', 'date');
            let labelElem4 = document.createElement('label'); // create label
            labelElem4.setAttribute('for', 'date');
            labelElem4.textContent = "Expected Finish Date:";

            liElem.appendChild(labelElem);
            liElem.appendChild(inputElem);
            liElem2.appendChild(labelElem2);
            liElem2.appendChild(inputElem2);
            liElem3.appendChild(labelElem3);
            liElem3.appendChild(inputElem3);
            liElem4.appendChild(labelElem4);
            liElem4.appendChild(inputElem4);

            // submit button
            let liButton = document.createElement('li');
            ulElem.appendChild(liButton);
            let buttonElem = document.createElement('button');
            buttonElem.classList.add('form-button');
            buttonElem.textContent = "SUBMIT";
            liButton.appendChild(buttonElem);

            formElem.appendChild(ulElem);

            // click add to table
            buttonElem.addEventListener('click', (event) => {
                event.preventDefault();
                this.submitCallback(inputElem.value, inputElem2.value, inputElem3.value, inputElem4.value);
            });

            return formElem;
        }
    }

    class App {
        constructor(app, tasks) {
            this.parentElement = app;
            this.taskList = tasks;
        }

        render() {
            console.log(this.parentElement);
            console.log(this.taskList.render());
            this.parentElement.appendChild(this.taskList.render());
            this.parentElement.appendChild(new NewTaskForm((string, number, location, date) => this.addTaskToList(string, number, location, date)).render());
        }

        addTaskToList(string, number, location, date) {
            this.taskList.addTask(string, number, location, date);
            this.parentElement.innerHTML = '';
            this.render();
        }
    }

    //sample bucket list ideas
    let taskListObj = new TaskList([
        new Task("Go to Paris", 1000, "Paris", "2020-09-20", true),
        new Task("Learn the guitar", 500, "Seattle", "2021-11-20", false)
    ]);


    let appElem = document.querySelector('#app');
    let appObj = new App(appElem, taskListObj); //instantiates app
    appObj.render();

}


//returns the search results with matching keyword
function renderResult(keywordQuery) {
    let searchResults = document.querySelector("#results");
    while (searchResults.hasChildNodes()) {
        searchResults.removeChild(searchResults.firstChild);
    }
    keywordQuery = keywordQuery.toLowerCase();
    console.log(keywordQuery);
    console.log(keywords.responseJSON.includes(keywordQuery))
    if (!keywords.responseJSON.includes(keywordQuery) && keywordQuery != 'all') {
        renderError(new Error("No Results Found. Try different keywords like below."));
    } else {
        let resultArr = [];
        //if the user types in 'all', return all the ideas
        if (keywordQuery == 'all') {
            keywordResult(allResults.responseJSON);
        } else {
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
    }

    searchResults.style.marginTop = '50px';

    //gradient line reference: https://jsfiddle.net/JoshMesser/55ZfK/
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





//functions for dashboard page

//creating a table from extracted result data that matches the user keyword query
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
    let count = document.createElement('p');
    count.textContent = resultArr.length + " ideas found";
    count.style.margin = '0 0 20px 10%';
    document.querySelector('#results').appendChild(count);
    document.querySelector('#results').appendChild(resultTable);
}


//function that displays the given error message
function renderError(err) {
    let error = document.createElement("h3");
    error.classList = "alert alert-danger";
    error.innerHTML = err.message.italics();
    document.querySelector("#results").appendChild(error);
    error.style.color = '#6699cc';
    error.style.textAlign = 'center';
}