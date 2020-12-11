import * as storage from "./localStorage.js";
function getNewID(){
	return Math.floor(Math.random() * 10000000000);
}
export function addTodo(title, date,id) {
	const todos = document.querySelector('#todos');
	const newID = id ?? getNewID();
	todos.innerHTML += `<div class='todoBlock' title='${newID}'> <div class='vertical'></div>  <h2 id='todoTitle'>${title}</h2> <div id='date'>${date}</div> <button id = 'edit'>Edit</button> <button id = 'delete'>Delete</button> </div>`;
	addEventsToButtons('edit',editTodoButton);
	addEventsToButtons('delete',removeTodo);
	storage.addTodoToLocal(title,date,newID,getCurrentList())
}
function getCurrentList(){
	return document.querySelector('.selected').title;
}
export function removeTodo(event) {
	const parentOfTarget = event.target.parentNode;
	storage.removeTodo(parentOfTarget.title,getCurrentList());
	parentOfTarget.remove();

	//TODO: Remove the Todo from the localStorage;
}
export function createTodo() {
	if(getCurrentList() === undefined) return;
	const createTodoForm = document.querySelector('#newTodoForm');
	createTodoForm.style.display = 'block';
}
export function submitNewTodoForm() {
	const newTitle = document.querySelector('#newTitleForm');
	const newDate = document.querySelector('#newDateForm');
	const newTodoForm = document.querySelector('#newTodoForm');
	newTodoForm.style.display ='none';
	if (newTitle.value.length >= 15) {
		return false;
	}
	addTodo(newTitle.value, newDate.value);
	resetForm(newTitle,newDate);
	//TODO: Call localStorage function to store the todo;
}
export function editTodoButton(event) {
	const parentOfTarget = event.target.parentNode;
	parentOfTarget.classList.add('toEdit');
	editTodoForm(false);
}
export function editTodoForm() {
	const editTodoForm = document.querySelector('#editTodoForm');
	editTodoForm.style.display = 'block';
}
function resetForm(title,date){
	title.value = '';
	date.value = '';
}
export function submitEditTodoForm() {
	const toEditTodo = document.querySelector('.toEdit');
	const editTodoForm = document.querySelector('#editTodoForm');
	const newTitle = document.querySelector('#editTitleForm');
	const newDate = document.querySelector('#editDateForm');
	toEditTodo.children[1].innerText = newTitle.value;
	toEditTodo.children[2].innerText = newDate.value;
	storage.editTodo(toEditTodo.title,getCurrentList(),newTitle.value,newDate.value);
	resetForm(newTitle,newDate);
	editTodoForm.style.display = 'none';
	toEditTodo.classList.remove('toEdit');
}
export function addEventsToButtons(buttonsID,func){
	const eventButtons = document.querySelectorAll(`#${buttonsID}`);
	eventButtons.forEach(button => {
		button.addEventListener('click',func);
	})
}
export function createListButton(){
	const newListForm = document.querySelector('#newListForm');
	newListForm.style.display = 'block';
}
export function submitListButton(){
	const listTitle = document.querySelector('#listTitleForm');
	if(listTitle.value === '') return;
	createList(listTitle.value);
	const newListForm = document.querySelector('#newListForm');
	newListForm.style.display = 'none';
	listTitle.value = '';
}
export function changeOfList(event){
	const target = event.target;
	if(target.classList.contains('selected')){
		return;
	}
	clearTodos();
	selectList(target);
	if(target.title === 'Home'){
		return displayAllTodos(storage.getTodosFromList('Home'));
	}
	displayTodos(storage.getTodosFromList(target.title));
	//TODO: Connection with localStorage object list and her todos.
}
function clearTodos(){
	const todos = document.querySelector('#todos');
	todos.innerText = '';
}
function selectList(target){
	const selected = document.querySelector('.selected');
	if(selected !== null){
		selected.classList.remove('selected');
	}
	return target.classList.add('selected');
}
function displayTodos(listTodos){
	if(Object.keys(listTodos).length === 0) return;
	for(const todos in listTodos){
		console.log(todos,listTodos[todos],'displayTodos');
		addTodo(listTodos[todos].title,listTodos[todos].date,todos);
	}
}
export function displayLists(){
	const lists = storage.getLists();
	for(const list in lists){
		createList(JSON.parse(lists[list]).title,list)
	}
}
function displayAllTodos(allStorage){
	for(const list in allStorage){
		const parsedList = JSON.parse(allStorage[list]).todos;
		console.log(parsedList)
		console.log('hey');
		if(Object.keys(parsedList).length === 0) return;
		for(const todos in parsedList){
			addTodo(parsedList[todos].title,parsedList[todos].date,todos);
		}
	}
}
export function createList(title,id){
	const todoGroup = document.querySelector('#todoGroup');
	const newID = id ?? getNewID();
	todoGroup.innerHTML += `<div id='todoList' title='${newID}'>
	<div id='nameGroup'>${title}</div>
	</div>`;
	addEventsToButtons('todoList',changeOfList);
	if(id === undefined){
		return storage.addListToLocal(title,newID);
	}
}