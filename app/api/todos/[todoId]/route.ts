import prisma from '@/lib/prismaDb';
import { currentUser } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.error();
  }

  const { todoId } = params;

  const todo = await prisma.todo.deleteMany({
    where: {
      id: todoId,
      userId: user.id,
    },
  });

  return NextResponse.json(todo);
}

export async function PATCH(
  request: Request,
  { params }: { params: { todoId: string } }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.error();
  }

  const { todoId } = params;

  const body = await request.json();

  const todo = await prisma.todo.updateMany({
    where: {
      id: todoId,
      userId: user.id,
    },
    data: {
      ...body,
    },
  });

  const updatedTodo = await prisma.todo.findUnique({
    where: {
      id: todoId,
    },
  });

  return NextResponse.json(updatedTodo);
}
