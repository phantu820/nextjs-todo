import prisma from '@/lib/prismaDb';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.error();
  }

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json(todos);
}

export async function POST(request: Request) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { title, description } = body;

  const todo = await prisma.todo.create({
    data: {
      title,
      description,
      userId: user.id,
    },
  });

  return NextResponse.json(todo);
}
