import { useState, useRef } from "react";

export default function TodoEditor({ onCreate }) { //app(부모) 에서 받아온 props 
  const inputRef = useRef();
  const [content, setContent] = useState("");

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
//쓴 글을 업데이트 하는 함수 
//setContent 을 호츨히여 이벤트의 타겟인 value의 값을 상태 변화 시킴 
  const onClick = () => {
    if (content === "") {
      inputRef.current.focus();
      return;
    }
//클릭 이벤트 함수 
//만약 콘텐츠의 칸이 빈칸일 경우에 포커스가 인풋간에 다시 맞춰지게 하고
//함수를 종료시킨다 
    onCreate(content);
    setContent("");
  //만약 빈칸이 아닐 경우 상속받은 onCreate함수를 호출하여 content를 업데이트 하며
  //content를 빈칸으로 만든다 
  };

  const onKeydown = (e) => {
    if (e.keyCode === 13) {
      onClick();
    }
    //엔터키 = 13 
    //엔터키를 누르면 위에서 만든 onClick 이벤트를 호출시킨다 
  };

  return (
    <div className="TodoEditor">
      <input
        ref={inputRef}
        value={content} 
        onChange={onChangeContent} 
        onKeyDown={onKeydown} 
        placeholder="새로운 Todo ..."
      />
      <button onClick={onClick}>추가</button>
    </div>
  );
}
