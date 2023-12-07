import { Container, Typography, Box } from '@mui/material';
import getConversationById from "@/app/actions/getConversationById";
import getMessages from '@/app/actions/getMessages';
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params);
  const messages = await getMessages(params);

  if (!conversation) {
    return (
      <p>Something went wrong!</p>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', maxHeight: '100vh' }}>
      <Header conversation={conversation} />
      <Body initialMessages={messages} />
      <Form />
    </Box>
  );
}

export default ChatId;