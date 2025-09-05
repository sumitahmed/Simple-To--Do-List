//Once the dom content is loaded then i want to grab my input and ID, because server delay etc might happen
document.addEventListener('DOMContentLoaded', () => {

  /**
   * step 1: Add a task in array with due date functionality
   */
  
  //step a: Grab the elements
  const todoInput = document.getElementById("todo-input");
  const dueDateInput = document.getElementById("due-date-input"); //new: grab due date input
  const dueTimeInput = document.getElementById("due-time-input"); //new: grab due time input
  const addTaskBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  //tip: whatever element is there just grab em and store em in a variable

  //step b: Should be able to store this tasks ...ie array of tasks with due date support
  let tasks = JSON.parse(localStorage.getItem('tasks')) || []; //used because it should be string not array.

  //new: as soon as page loads, check for expired tasks and clean them up
  checkExpiredTasks();

  // Remove empty state and render tasks
  if (tasks.length > 0) {
    todoList.innerHTML = '';
    tasks.forEach(task => renderTasks(task));
  } else {
    showEmptyState();
  }

  //new: set up interval to check for alerts and expired tasks every minute
  setInterval(() => {
    checkForAlerts();
    checkExpiredTasks();
  }, 60000); //check every 60 seconds

  //Step c: Add a task with due date, use Event Listener
  addTaskBtn.addEventListener("click", addTask);

  // Also add task when pressing Enter in input field
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    //as soon as we click the button this function will be called
    const taskText = todoInput.value.trim(); //grab the value from input field
    const dueDate = dueDateInput.value; //new: grab due date
    const dueTime = dueTimeInput.value; //new: grab due time

    //to check if someones directly clicking add task button without entering anything
    if (taskText == "") return;//trim removes extra spaces

    //new: combine date and time to create full due date timestamp
    let dueDateTime = null;
    if (dueDate) {
      //if user provides date, combine with time (default to 11:59 PM if no time provided)
      const timeToUse = dueTime || "23:59";
      dueDateTime = new Date(`${dueDate}T${timeToUse}`).getTime();
    }

    //if tasks is there, we want to add a unique id to it, also want to add a property true or false, based on that property we will display a strike through line css or not
    //new: also add due date and alert status
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      dueDate: dueDateTime, //new: store due date timestamp
      alerted: false, //new: track if 12-hour alert was shown
      createdAt: Date.now() //new: track when task was created
    };

    //Now every single time someone clicks one it, it will grab the values and will create a new whole task object
    tasks.push(newTask)
    saveTasks(); //locally saves tasks
    
    // Remove empty state if this is the first task
    if (tasks.length === 1) {
      todoList.innerHTML = '';
    }

    renderTasks(newTask);

    //if somebody has done it, then would like to clean the input
    //select the value, and add a pair of empty string so it clears the input field
    todoInput.value = ""; //clear the input field
    dueDateInput.value = ""; //new: clear due date input
    dueTimeInput.value = ""; //new: clear due time input

    console.log(tasks);
  }

  /*step 2: Handling Local Storage and DOM event with due date support */

  //so far we have added em in array with due dates, now have to add em in local storage

  //step 3: render the task with due date display, after render delete it
  //to read storage and render it to DOM
  //as soon as the page loads i want to read from the local storage, grab all the tasks, store the task inside tasks[] array, and immediately after that i would love to run a loop, inside the loop ill read all teh individual tasks from this array and would love to call my method on each of this rendered task, so it can go ahead and render it

  function renderTasks(task) {
    const li = document.createElement('li');
    li.setAttribute("data-id", task.id);
    if(task.completed) li.classList.add('completed');

    //new: format due date for display
    let dueDateDisplay = "";
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate);
      dueDateDisplay = `<div class='task-due-date'>Due: ${dueDate.toLocaleDateString()} ${dueDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>`;
    }

    li.innerHTML = `
      <div class='task-content'>
        <span class='task-text'>${task.text}</span>
        ${dueDateDisplay}
      </div>
      <div class='task-buttons'>
        <button class='complete-btn'>✓</button>
        <button class='delete-btn'>Delete</button>
      </div>
    `;

    // Event listeners
    const completeBtn = li.querySelector('.complete-btn');
    const deleteBtn = li.querySelector('.delete-btn');

    completeBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      if(task.completed) li.classList.add('completed');
      else li.classList.remove('completed');

      saveTasks();
    });

    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      li.remove();
      saveTasks();
      if(tasks.length === 0) showEmptyState();
    });

    todoList.appendChild(li);
  }

  // Step 4: Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Step 5: Check for tasks that have expired (not completed and 24 hours elapsed after due date)
  function checkExpiredTasks() {
    const now = Date.now();
    let changed = false;

    tasks = tasks.filter(task => {
      if(task.dueDate && !task.completed && now - task.dueDate > 86400000) { // 24 hours in ms
        changed = true; // task expired and deleted
        return false;
      }
      return true;
    });

    if(changed) {
      saveTasks();
      todoList.innerHTML = '';
      if(tasks.length > 0) tasks.forEach(renderTasks);
      else showEmptyState();
    }
  }

  // Step 6: Alert user if task is due within 12 hours and not completed, alert only once per task
  function checkForAlerts() {
    const now = Date.now();

    tasks.forEach(task => {
      if(task.dueDate && !task.completed && !task.alerted && (task.dueDate - now <= 43200000)) { // 12 hours in ms
        alert(`Task "${task.text}" is due within 12 hours! Please complete it.`);
        task.alerted = true;
        saveTasks();
      }
    });
  }

  // Show a friendly empty state if no tasks exist
  function showEmptyState() {
    todoList.innerHTML = `<div class='empty-state'>No tasks found. Add some tasks to get started!</div>`;
  }

});
