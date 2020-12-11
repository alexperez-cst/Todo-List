import * as DOM from './domManipulation.js'
/*
	# The 'todos' are going to be objects created with classes
	# A 'todo' will have:
		*Title
		*Description
		*dueDate (fecha de finalizacion)
		*priority
	# Can create more than a todo list and a default list with all the 'todos'
	# Separar el programa en diferentes modulos:
		*Creacion de todos
		*Dom manipulation
		*seleccionar todos como finalizado
		*crear nuevas listas de todos
	# Guardar los datos en el local storage
	# usar date-fns para las fechas de los todos
*/
(() => {
	DOM.displayLists();
	const newBlock = document.querySelector('#newBlock');
	const newList = document.querySelector('#createList');
	const editTodoSubmit = document.querySelector('#submitEdit');
	const newTodoSubmit = document.querySelector('#submitNewTodo');
	const listSubmit = document.querySelector('#submitList');
	const allLists = document.querySelectorAll('#todoList');
	function addEventToSubmit(element,func){
		element.addEventListener('click',e => {
			e.preventDefault();
			return func(e);
		})
	}
	addEventToSubmit(editTodoSubmit,DOM.submitEditTodoForm);
	addEventToSubmit(newTodoSubmit,DOM.submitNewTodoForm);
	addEventToSubmit(listSubmit,DOM.submitListButton);
	allLists.forEach(list => {
		list.addEventListener('click',DOM.changeOfList)
	});
	DOM.addEventsToButtons('edit',DOM.editTodoButton);
	DOM.addEventsToButtons('delete',DOM.removeTodo);
	newBlock.addEventListener('click',DOM.createTodo);
	newList.addEventListener('click',DOM.createListButton)
})();

