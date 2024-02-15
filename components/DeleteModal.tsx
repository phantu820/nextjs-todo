import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { Loader2, Trash2 } from 'lucide-react';
import { useDeleteTodoMutation } from '@/redux/features/api/apiSlice';
import toast from 'react-hot-toast';

const DeleteModal = ({ todoId }: { todoId: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();

  const handleDelete = async () => {
    try {
      await deleteTodo(todoId);
      toast.success('Todo deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <AlertDialogTrigger asChild>
        <Button size='icon' variant='ghost'>
          <Trash2 className='text-destructive' />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant='destructive'
            onClick={handleDelete}
            disabled={isLoading}
            className='w-24'
          >
            {isLoading ? <Loader2 className='animate-spin' /> : 'Delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteModal;
