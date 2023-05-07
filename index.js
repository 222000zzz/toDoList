const form = document.querySelector("form"); // HTML 문서 내의 form 태그를 가져옴
const input = document.querySelector("input"); // HTML 문서 내의 input 태그를 가져옴
const todos = document.querySelector(".todos"); // HTML 문서 내의 클래스가 todos인 요소를 가져옴
const clearBtn = document.querySelector(".clear-btn"); // HTML 문서 내의 클래스가 clear-btn인 요소를 가져옴

const addTodo = (e) => { // 할 일 추가 함수
  e.preventDefault(); // 이벤트 추가 시 새로고침 X
  const todoText = input.value.trim(); // 입력값에서 양쪽 공백을 제거한 문자열을 가져옴
  if (todoText === "") { // 문자열이 빈 문자열인 경우, 함수를 종료함
    return;
  }
  const todoItem = document.createElement("li"); // li 요소를 생성함
  todoItem.innerHTML = `
    <span class="todo-text">${todoText}</span>
    <div class="btn-container">
      <button class="complete-btn">완료</button>
      <button class="delete-btn">삭제</button>
    </div>
  `; // li 요소 내에 span과 button 요소를 생성함
  todos.appendChild(todoItem); // li 요소를 todos 리스트에 추가함
  input.value = ""; // 입력값을 초기화함
};

const deleteTodo = (e) => { // 할 일 삭제 함수
  const todoItem = e.target.closest("li"); // 클릭한 버튼에 가장 가까운 li 요소를 찾아옴
  todos.removeChild(todoItem); // todos 리스트에서 해당 li 요소를 삭제함
};

const clearAll = () => { // 할 일 전체 삭제 함수
  todos.innerHTML = ""; // todos 리스트 내의 모든 요소를 삭제함
};

const completeTodo = (e) => { // 할 일 완료 함수
  const todoItem = e.target.closest("li"); // 클릭한 버튼에 가장 가까운 li 요소를 찾아옴
  todoItem.classList.toggle("completed"); // 해당 li 요소에 completed 클래스를 추가하거나 삭제함
};

form.addEventListener("submit", addTodo); // form 태그에서 submit 이벤트가 발생하면 addTodo 함수를 실행함
todos.addEventListener("click", (e) => { // todos 리스트에서 click 이벤트가 발생하면 함수를 실행함
  if (e.target.classList.contains("delete-btn")) { // 클릭한 요소의 클래스가 delete-btn인 경우, deleteTodo 함수를 실행함
    deleteTodo(e);
  }
  if (e.target.classList.contains("complete-btn")) { // 클릭한 요소의 클래스가 complete-btn인 경우, completeTodo 함수를 실행함
    completeTodo(e);
  }
});
clearBtn.addEventListener("click", clearAll); // clearBtn 요소에서 click 이벤트가 발생하면 clearAll 함수를 실행함
