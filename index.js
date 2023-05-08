//const form, input, todos, clearBtn 변수는 각각 HTML의 <form>, <input>, <ul>, <button> 요소를 참조.
const form = document.querySelector("form");
const input = document.querySelector("input");
const todos = document.querySelector(".todos");
const clearBtn = document.querySelector(".clear-btn");

//loadTodos()는 localStorage에 저장된 할일 목록을 불러와서 <ul> 요소에 추가
const loadTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) {
    todos.innerHTML = savedTodos;
  }
};
//addTodo()는 새로운 할일을 추가함 <li> 요소를 생성하고, 그 안에 할일 내용과 완료, 삭제 버튼을 포함함.
const addTodo = (e) => {
  e.preventDefault(); // 이벤트 추가 시 새로고침 X
  const todoText = input.value.trim(); // 입력값에서 양쪽 공백을 제거한 문자열을 가져옴
  if (todoText === "") {
    // 문자열이 빈 문자열인 경우, 함수를 종료함
    return;
  }
  const todoItem = document.createElement("li");
  todoItem.innerHTML = `
    <span class="todo-text">${todoText}</span>
    <div class="btn-container">
      <button class="complete-btn">완료</button>
      <button class="delete-btn">삭제</button>
    </div>
  `;
  //생성된 요소를 <ul> 요소에 추가하고, <input> 요소의 값을 초기화.
  todos.appendChild(todoItem);
  input.value = "";
  //현재 할일 목록을 localStorage에 저장.
  const savedTodos = todos.innerHTML;
  localStorage.setItem("todos", savedTodos);
};
//deleteTodo()는 선택한 할일을 삭제, 삭제 버튼을 클릭하면, 클릭된 버튼의 가장 가까운 <li> 요소를 찾아서 삭제.
const deleteTodo = (e) => {
  const todoItem = e.target.closest("li");
  todos.removeChild(todoItem);
  //현재 할일 목록을 localStorage에 저장.
  const savedTodos = todos.innerHTML;
  localStorage.setItem("todos", savedTodos);
};
//clearAll()은 모든 할일을 삭제, todos 요소의 innerHTML 속성을 빈 문자열로 설정.
const clearAll = () => {
  todos.innerHTML = "";
  localStorage.removeItem("todos"); //, localStorage에서 할일 목록을 제거함.
};
//completeTodo()는 선택한 할일을 완료합니다. 완료 버튼을 클릭하면, 클릭된 버튼의 가장 가까운 <li> 요소에 completed 클래스를 추가함.
const completeTodo = (e) => {
  const todoItem = e.target.closest("li");
  todoItem.classList.toggle("completed");
  //현재 할일 목록을 localStorage에 저장.
  const savedTodos = todos.innerHTML;
  localStorage.setItem("todos", savedTodos);
};
//EventListener들은 각각 할일을 추가하는 폼 입력, 할일 삭제, 완료, 전체 삭제 버튼 클릭 이벤트를 처리.
form.addEventListener("submit", addTodo);
todos.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    deleteTodo(e);
  }
  if (e.target.classList.contains("complete-btn")) {
    completeTodo(e);
  }
});
clearBtn.addEventListener("click", clearAll);
//loadTodos()를 호출해서 이전에 저장된 할일 목록이 있다면 불러옴.
loadTodos();
