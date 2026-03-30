import { Container, Typography } from "@mui/material";
import { paths } from "@/routes/paths";

export default function LoginPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        Login placeholder
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Route: <strong>{paths.LOGIN}</strong>
      </Typography>
    </Container>
  );
}

