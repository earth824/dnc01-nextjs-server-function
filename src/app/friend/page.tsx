import prisma from '@/libs/prisma/prisma';

export const revalidate = 30;

export default async function FriendPage() {
  const friends = await prisma.friend.findMany();
  return (
    <div>
      {friends.map((el) => (
        <p key={el.id}>
          id: {el.id}, name: {el.name}, score: {el.score}
        </p>
      ))}
    </div>
  );
}
