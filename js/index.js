'use strict';

let hamburger = document.querySelector('#hamburger-menu');
let links = document.querySelector('.page-links');

// display links when hamburger menu is click
function handleHamburger() {
hamburger.addEventListener('click', () => {
    if (links.style.display === "block") {
        links.style.display = "none";
      } else {
        links.style.display = "block";
      }
  })
}

handleHamburger(); //TODO: export this function


/* your code goes here! */
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
    if(this.complete) {
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
    this.parentElement.appendChild(this.taskList.render());
    this.parentElement.appendChild(new NewTaskForm((string, number, location, date) => this.addTaskToList(string, number, location, date)).render());
  }

  addTaskToList(string, number, location, date) {
    this.taskList.addTask(string, number, location, date);
    this.parentElement.innerHTML = '';
    this.render();
  }
}

let taskListObj = new TaskList([
  new Task("Go to Paris", 1000, "Paris", "2020-09-20", true), 
  new Task("Learn the guitar", 500, "Seattle", "2021-11-20", false)
]);
//taskListObj.addTask("A second task");


let appElem = document.querySelector('#app');
let appObj = new App(appElem, taskListObj); //instantiates app
appObj.render();