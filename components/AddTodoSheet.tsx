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
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useAddTodoMutation } from '@/redux/features/api/apiSlice';
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
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
});

const AddTodoSheet = () => {
  const [addTodo, { isLoading }] = useAddTodoMutation();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await addTodo(data);
      toast.success('Todo added successfully');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsOpen(false);
      form.reset();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger asChild>
        <Button variant='secondary'>Add Todo</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Todo</SheetTitle>
          <SheetDescription>
            Use this form to add a new todo item to the list.
          </SheetDescription>
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
                {isLoading ? <Loader2 className='animate-spin' /> : 'Add Todo'}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTodoSheet;
