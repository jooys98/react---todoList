import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import { useState, useRef } from "react";

const mockData = [
//기본 데이터 
  { 
    id: 0,
    isDone: true, //체크박스
    content: "React 공부하기",
    createdDate: new Date().getTime(),// 현재시간 출력 
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(), 
  },
  {
    id: 2,
    isDone: true,
    content: "음악 연습하기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  //mockData = todos 
  //setTodos : todos의 상태를 변화시키는 함수 

  const idRef = useRef(3);
//기본 데이터의 갯수를 useRef 로 저장 , 새로운 데이터를 추가했을때 리렌더링 방지 

  const onCreate = (content) => {
    const newTodo = {  // 새로운 글을 추가할때의 기본 양식 선언 
      id: idRef.current++, // 아이디의 숫자에 +1 
      isDone: false, // 체크박스 초기값
      content,
      createdDate: new Date().getTime(),
    };
    setTodos([...todos, newTodo]);
    //기존의 todos객체를 복사하고 새롭게 작성한 글을 추가하여 새로운 배열을 생성 
    //setTodos를 사용하여 상태를 변화시킨다 
  };

  //글을 추가하는 함수 이자, app (부모)의 자식컴포넌트 ( Header , TodoItems , ..) 
  //전달할 수 있는 props

  const onUpdate = (targetId) => { 
    //체크박스 체크 
    //todos 의 ID를 타겟으로 
    setTodos( 
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )// 현재항목의 id와 targetId 가 일치하면 isDone 의 객체를 복사하여 상태를 바꿔준다
       //일치하지 않을 경우 원래의 todo를 출력  
    );
  };

  const onDelete = (targetId) => { // 삭제
    setTodos(todos.filter((todo) => todo.id !== targetId));
  }; // targetId 와 현재 아이디가 일치하지 않는 항목만 보여준다 

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
      {/* 위에서 만들어 놓은 함수들을 호출 */}
    </div>
  );
}

export default App;
