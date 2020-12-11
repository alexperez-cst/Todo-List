
export function addListToLocal(title,id){
	localStorage.setItem(id,JSON.stringify({title,todos:{}}));
}
export function addTodoToLocal(title,date,id,currentList){
	const localStorageList = localStorage.getItem(currentList);
	const parsedLocalStorage = JSON.parse(localStorageList);
	parsedLocalStorage.todos[id] = {
		title,
		date,
	};
	localStorage.setItem(currentList,JSON.stringify(parsedLocalStorage));
}
export function getTodosFromList(list){
	if(list === 'Home'){
		return {...localStorage}
	}
	console.log(JSON.parse(localStorage.getItem(list)),list,'getTodosFromList');
	const selectedListTodos = JSON.parse(localStorage.getItem(list)).todos;
	return selectedListTodos;
}
export function removeTodo(title,currentList){
	const selectedList = JSON.parse(localStorage.getItem(currentList));
	delete selectedList.todos[title];
	localStorage.setItem(currentList, JSON.stringify(selectedList));
}
export function editTodo(title,currentList,newTitle,newDate){
	const selectedList = JSON.parse(localStorage.getItem(currentList));
	selectedList.todos[title].title = newTitle;
	selectedList.todos[title].date = newDate;
	localStorage.setItem(currentList, JSON.stringify(selectedList));
}
export function getLists(){
	return {...localStorage}
}
