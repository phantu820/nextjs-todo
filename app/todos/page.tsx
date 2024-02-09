'use client';

import AddTodoSheet from '@/components/AddTodoSheet';
import Filter from '@/components/Filter';
import TodoList from '@/components/TodoList';
import { Separator } from '@/components/ui/separator';
import { useGetTodosQuery } from '@/redux/features/api/apiSlice';
import { Todo } from '@prisma/client';
import { Loader2 } from 'lucide-react';
import React from 'react';

const TodoPage = () => {
  const { data, isLoading, isError } = useGetTodosQuery({});
  const [filter, setFilter] = React.useState(null);
  const [todos, setTodos] = React.useState(data);

  React.useEffect(() => {
    let filteredTodos = [];

    if (filter === 'completed') {
      filteredTodos = data?.filter((todo: Todo) => todo.isCompleted === true);
      setTodos(filteredTodos);
    }

    if (filter === 'waiting') {
      filteredTodos = data?.filter((todo: Todo) => todo.isCompleted === false);
      setTodos(filteredTodos);
    }

    if (filter === 'all') {
      filteredTodos = data;
      setTodos(filteredTodos);
    }
  }, [filter, data]);

  return (
    <>
      <div className='flex items-center justify-between mt-2'>
        <Filter filter={filter} setFilter={setFilter} />
        <AddTodoSheet />
      </div>
      <Separator className='my-2' />
      {!isLoading ? (
        <TodoList data={todos || data} />
      ) : (
        <div className='flex items-center justify-center'>
          <Loader2 className='animate-spin' size={64} />
        </div>
      )}
    </>
  );
};

export default TodoPage;
