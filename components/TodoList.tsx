import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@prisma/client';

const TodoList = ({ data }: { data: Todo[] }) => {
  if (data.length === 0) {
    return <p className='text-2xl text-center'>There is no todo</p>;
  }

  return (
    <div>
      {data.map((todo: Todo) => (
        <TodoItem key={todo.id.toString()} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
