import { Box, Container, Typography } from "@mui/material";
import Image from "next/image";

const Home = () => {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        py: 12,
        backgroundColor: "#f3f4f6",
      }}
    >
      <Container component="main" maxWidth="md">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Image
            height={52}
            width={52}
            className="mx-auto w-auto"
            src="/images/logo.png"
            alt="Logo"
          />
          <Typography
            component="h3"
            variant="h3"
            sx={{ fontSize: "1.5rem" }}
            mt={1}
            mb={2}>
            Select an active chat or start a new conversation
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
