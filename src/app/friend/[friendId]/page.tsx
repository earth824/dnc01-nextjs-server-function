export const generateStaticParams = () => {
  return [{ friendId: '1' }, { friendId: '2' }];
};

export default function SingleFriendPage(
  props: PageProps<'/friend/[friendId]'>
) {
  return <div>SingleFriendPage</div>;
}
