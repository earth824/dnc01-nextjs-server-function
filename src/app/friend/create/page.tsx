'use client';

import { createFriend } from '@/libs/actions/friend';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const createFriendSchema = z.object({
  name: z.string().min(1),
  score: z.string().regex(/^[0-9]+$/)
});

export type CreateFriendInput = z.infer<typeof createFriendSchema>;

export default function CreateFriendPage() {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<CreateFriendInput>({
    defaultValues: { name: '', score: '' },
    resolver: zodResolver(createFriendSchema)
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: CreateFriendInput) => {
    startTransition(async () => {
      throw Error('BlaBla');
      await createFriend(data);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="">Name: </label>
        <input
          type="text"
          className="border px-3 py-1.5"
          {...register('name')}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="">Score: </label>
        <input
          type="text"
          className="border px-3 py-1.5"
          {...register('score')}
        />
        {errors.score && <p className="text-red-500">{errors.score.message}</p>}
      </div>
      <button disabled={isPending}>
        {isPending ? 'Creating ...' : 'Create'}
      </button>
    </form>
  );
}

// USEACTIONSTATE
// 'use client';

// // SERVER FUNCTION(GENERAL TERM) ==> DATA MUTATION (CREATE, UPDATE, DELETE)
// // SERVER ACTION: SERVER FUNCTION BIND TO FORM ACTION

// import { createFriendWithActionState } from '@/libs/actions/friend';
// import { useActionState } from 'react';

// // const initialState = {
// //   value: { friendName: '', score: '' },
// //   error: { friendName: '', score: '' }
// // };

// const initialState = {
//   title: 'abcd'
// };

// export type ActionState = typeof initialState;

// export default function CreateFriendPage({}) {
//   const [state, action, isPending] = useActionState(
//     createFriendWithActionState,
//     initialState
//   ); // useFormState
//   return (
//     <div>
//       <form action={action}>
//         <div>
//           <label htmlFor="">Title: </label>
//           <input type="text" className="border px-3 py-1.5" name="friendName" />
//         </div>

//         {/* <div>
//           <label htmlFor="">Score: </label>
//           <input type="text" className="border px-3 py-1.5" name="score" />
//         </div> */}

//         <button>Create</button>
//       </form>
//     </div>
//   );
// }
