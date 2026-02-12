'use server';

import { CreateFriendInput } from '@/app/friend/create/page';
import prisma from '@/libs/prisma/prisma';
import { redirect } from 'next/navigation';
import z from 'zod';

export const simulateLoading = async (second: number = 3) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, second * 1000);
  });
};

const createFriendSchema = z.object({
  name: z.string().min(1),
  score: z.coerce.number().positive().int()
});

export const createFriend = async (input: CreateFriendInput) => {
  // VALIDATE
  await simulateLoading(5);
  const data = createFriendSchema.parse(input);
  await prisma.friend.create({ data });
  redirect('/');
};

// import { ActionState } from '@/app/friend/create/page';

// export const createFriend = async (formData: FormData) => {
//   console.log('SUBMIT CREATE FRIEND');
//   console.log(formData);
//   redirect('/friend/create?error_title="is requireed"')
// };

// export const createFriendWithActionState = async (
//   prevState: ActionState,
//   formData: FormData
// ) => {
//   console.log('PREV: ', prevState);
//   console.log('DATA IN FORM: ', formData);
//   // RETURN NEXT STATE
//   return {
//     title: 'RESPOSNE FROM SERVER'
//   };
// };
