import React from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import { formatDistance, subDays } from 'date-fns';
import { Todo } from '@prisma/client';
import DeleteModal from './DeleteModal';
import UpdateTodoSheet from './UpdateTodoSheet';
import { Checkbox } from './ui/checkbox';
import { useUpdateTodoMutation } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();

  const handleClick = async () => {
    try {
      await updateTodo({
        id: todo.id,
        body: {
          isCompleted: !todo.isCompleted,
        },
      });
      toast.success('Todo status updated successfully');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <Collapsible className='my-4 rounded-lg border-border border p-2 flex flex-col gap-4 hover:bg-primary/5 transition-all'>
      <div className='flex items-center gap-2 relative'>
        <Checkbox
          className='absolute -left-5 bg-background w-6 h-6 border-border'
          onCheckedChange={handleClick}
          checked={todo.isCompleted}
          disabled={isLoading}
        />
        <CollapsibleTrigger className='w-full flex ease-in-out duration-300 '>
          <div className='flex flex-row justify-between w-full items-center ml-3'>
            <span
              className={cn(
                'text-2xl font-medium',
                todo.isCompleted && 'line-through text-muted-foreground'
              )}
            >
              {todo.title}
            </span>
            <ChevronsUpDown />
          </div>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='CollapsibleContent'>
        <div className='flex justify-between gap-2'>
          <p
            className={cn(
              'font-light break-all',
              todo.isCompleted && 'text-muted-foreground line-through'
            )}
          >
            {todo.description}
          </p>
          <div className='flex gap-2'>
            <UpdateTodoSheet todo={todo} disabled={todo.isCompleted} />
            <DeleteModal todoId={todo.id} />
          </div>
        </div>
        <p className='mt-2 text-sm italic font-thin'>
          {formatDistance(subDays(new Date(todo.createdAt), 0), new Date(), {
            addSuffix: true,
          })}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default TodoItem;
