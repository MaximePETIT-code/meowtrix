import { NextPage } from 'next';

interface ConversationProps {
  params: {
    uid: string;
  };
}

const Conversation: NextPage<ConversationProps> = ({ params }) => {
  return (
    <div>conversation with user id {params.uid}</div>
  );
};

export default Conversation;
