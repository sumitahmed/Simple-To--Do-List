https://sumitahmed.github.io/Simple-To--Do-List/
# 📋 Advanced Todo List with Smart Features

A modern, feature-rich todo list application with automatic task management, smart alerts, and a beautiful layered card aesthetic. Built with vanilla HTML, CSS, and JavaScript - perfect for learning web development fundamentals!

![Todo List Preview](https://img.shields.io/badge/Status-Complete-brightgreen) ![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow) ![CSS3](https://img.shields.io/badge/CSS3-Modern-blue) ![HTML5](https://img.shields.io/badge/HTML5-Semantic-orange)

## ✨ Features

### 🎯 Core Functionality
- **Add Tasks**: Simple input field to add new tasks
- **Due Date & Time**: Set specific deadlines with date and time pickers
- **Task Completion**: Mark tasks as complete with a check (✓) button
- **Delete Tasks**: Remove unwanted tasks manually
- **Persistent Storage**: All tasks save to browser's local storage

### 🚀 Smart Features
- **12-Hour Alert System**: Get notified when tasks are due within 12 hours
- **24-Hour Auto-Deletion**: Incomplete tasks automatically delete 24 hours after due date
- **Enter Key Support**: Press Enter to quickly add tasks
- **Empty State Handling**: Friendly message when no tasks exist

### 🎨 Modern Design
- **Layered Card Aesthetic**: Each task gets a different shade (6 color variations)
- **Glassmorphism Effects**: Semi-transparent containers with backdrop blur
- **Smooth Animations**: Hover effects and slide-in animations
- **Responsive Design**: Works perfectly on mobile and desktop
- **Clean Typography**: Modern Inter font for better readability

## 🚀 Quick Start

1. **Clone the repository**
git clone https://github.com/yourusername/advanced-todo-list.git
cd advanced-todo-list

text

2. **Open in browser**
Simply open index.html in your web browser
No build process or dependencies required!
text

3. **Start adding tasks!**
- Type your task in the input field
- Optionally set a due date and time
- Click "Add Task" or press Enter

## 📁 Project Structure

advanced-todo-list/
├── index.html # Main HTML structure
├── styles.css # All styling and animations
├── script.js # Complete JavaScript functionality
└── README.md # This file

text

## 🔧 How It Works (Beginner-Friendly Explanation)

### Step 1: DOM Content Loading
document.addEventListener('DOMContentLoaded', () => {

text
**What this does**: Waits for the webpage to fully load before running our code. This prevents errors if JavaScript tries to grab elements that don't exist yet.

### Step 2: Grabbing Elements
const todoInput = document.getElementById("todo-input");
const dueDateInput = document.getElementById("due-date-input");

text
**What this does**: Like reaching into the HTML and grabbing specific elements by their ID, storing them in variables so we can use them later.

### Step 3: Task Storage System
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

text
**What this does**: 
- Checks browser's storage for saved tasks
- If tasks exist, loads them as an array
- If no tasks exist, creates an empty array
- `JSON.parse()` converts string data back into a JavaScript array

### Step 4: Adding Tasks
function addTask() {
const taskText = todoInput.value.trim();
if (taskText == "") return;

text
const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
    dueDate: dueDateTime,
    alerted: false,
    createdAt: Date.now()
};
}

text
**What this does**:
- Grabs text from input field and removes extra spaces
- Checks if input is empty (prevents adding blank tasks)
- Creates a task object with unique ID and properties
- `Date.now()` gives us a unique timestamp as ID

### Step 5: Rendering Tasks
function renderTasks(task) {
const li = document.createElement('li');
li.innerHTML = HTML template with task data;
todoList.appendChild(li);
}

text
**What this does**:
- Creates a new list item element
- Fills it with HTML template containing task information
- Adds it to the task list on the webpage

### Step 6: Local Storage Management
function saveTasks() {
localStorage.setItem('tasks', JSON.stringify(tasks));
}

text
**What this does**: 
- Converts our tasks array into a string format
- Saves it to browser storage so tasks persist when page refreshes
- `JSON.stringify()` converts JavaScript array into storable string

### Step 7: Smart Alert System
function checkForAlerts() {
tasks.forEach(task => {
if(task.dueDate && !task.completed && !task.alerted && (task.dueDate - now <= 43200000)) {
alert(Task "${task.text}" is due within 12 hours!);
task.alerted = true;
}
});
}

text
**What this does**:
- Loops through all tasks every minute
- Checks if task is due within 12 hours (43200000 milliseconds)
- Shows alert only once per task using `alerted` flag
- Prevents spam alerts

### Step 8: Auto-Cleanup System
function checkExpiredTasks() {
tasks = tasks.filter(task => {
if(task.dueDate && !task.completed && now - task.dueDate > 86400000) {
return false; // Remove expired task
}
return true; // Keep task
});
}

text
**What this does**:
- Runs every minute to check for expired tasks
- If task is incomplete and 24 hours past due (86400000 ms), removes it
- `filter()` creates new array with only tasks that return `true`

## 🎨 Color System

The app uses a beautiful layered aesthetic with 6 different shades:
- **#06141B** - Darkest (1st, 7th, 13th tasks...)
- **#11212D** - Dark blue-gray (2nd, 8th, 14th tasks...)
- **#253745** - Medium dark (3rd, 9th, 15th tasks...)
- **#4A5C6A** - Medium gray (4th, 10th, 16th tasks...)
- **#9BA8AB** - Light gray (5th, 11th, 17th tasks...)
- **#CCD0CF** - Lightest (6th, 12th, 18th tasks...)

Each task automatically gets assigned a color using CSS `nth-child()` selectors!

## 🛠️ Technologies Used

- **HTML5**: Semantic structure and modern input types
- **CSS3**: Flexbox, animations, glassmorphism effects, responsive design
- **Vanilla JavaScript**: No frameworks - pure JavaScript for learning
- **Local Storage API**: Browser storage for data persistence
- **Date API**: Handling due dates and time calculations

## 📱 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🚀 Future Enhancements

- [ ] Task categories/tags
- [ ] Priority levels
- [ ] Task search and filtering
- [ ] Export tasks to JSON/CSV
- [ ] Dark/Light theme toggle
- [ ] Drag and drop reordering
- [ ] Task editing functionality
- [ ] Sound notifications

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Learning Points

This project is perfect for beginners to understand:
- **DOM Manipulation**: How to grab and modify HTML elements
- **Event Handling**: Responding to user clicks and keyboard input
- **Array Methods**: `filter()`, `forEach()`, `push()` for data management
- **Local Storage**: Saving data in the browser
- **Date Handling**: Working with timestamps and date calculations
- **CSS Animations**: Creating smooth, modern user interfaces
- **Responsive Design**: Making apps work on all devices

## 👨‍💻 Author

Built with ❤️ by [Sk Sumit Ahmed]
- GitHub: [@sumitahmed](https://github.com/sumitahmed)

---

⭐ **Star this repo if it helped you learn something new!**
