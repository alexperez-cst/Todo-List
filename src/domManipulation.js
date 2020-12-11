export function addTodo(title, date) {
	const todos = document.querySelector('#todos');
	todos.innerHTML += `<div class='todoBlock'> <div class='vertical'></div>  <h2 id='todoTitle'>${title}</h2> <div id='date'>${date}</div> <button id = 'edit' onClick = 'editTodo()'>Edit</button> <button id = 'delete' onClick='removeTodo()'>Delete</button> </div>`;
}
export function removeTodo(event) {
	const parentOfTarget = event.target.parentNode;
	parentOfTarget.remove();
	//TODO: Remove the Todo from the localStorage;
}
export function createTodo() {
	const createTodoForm = document.querySelector('#newTodoForm');
	createTodoForm.display = 'block';
}
export function submitNewTodoForm() {
	const newTitle = document.querySelector('#newTitleForm').value;
	const newDate = document.querySelector('#newDateForm').value;
	if (newTitle.length >= 15) {
		return false;
	}
	addTodo(newTitle, newDate);
	//TODO: Call localStorage function to store the todo;
}
export function editTodoButton(event) {
	const parentOfTarget = event.target.parentNode;
	parentOfTarget.classList.add('toEdit');
	editTodoForm(false);
}
export function editTodoForm(hide) {
	const editTodoForm = document.querySelector('#editTodoForm');
	if (hide) {
		return (editTodoForm.display = 'null');
	}
	editTodoForm.display = 'block';
}
export function submitEditTodoForm() {
	const toEditTodo = document.querySelector('.toEdit');
	const newTitle = document.querySelector('#editTitleForm');
	const newDate = document.querySelector('#editDateForm');
	editTodoForm(true);
	toEditTodo.children[1].textContent = newTitle;
	toEditTodo.children[2].textContent = newDate;
}
