'use client';

import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useUpdateTodoMutation } from '@/redux/features/api/apiSlice';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import toast from 'react-hot-toast';
import { Loader2, PenSquare } from 'lucide-react';
import { Todo } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { Textarea } from './ui/textarea';

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
});

const UpdateTodoSheet = ({
  todo,
  disabled,
}: {
  todo: Todo;
  disabled: boolean;
}) => {
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const updatedTodo = await updateTodo({
        id: todo.id,
        body: data,
      }).unwrap();
      if (isLoading) {
        form.reset({
          title: updatedTodo.data.title,
          description: updatedTodo.data.description,
        });
        toast.success('Todo added successfully');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild disabled={disabled}>
        <Button size='icon' variant='ghost'>
          <PenSquare className='text-primary' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Todo</SheetTitle>
          <SheetDescription>Use this form to update a todo.</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className='my-2 flex flex-col gap-4'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
              <Button type='submit' disabled={isLoading} className='min-w-full'>
                {isLoading ? (
                  <Loader2 className='animate-spin' />
                ) : (
                  'Update Todo'
                )}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateTodoSheet;
