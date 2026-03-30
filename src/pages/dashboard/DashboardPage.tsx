import { Typography, Container } from "@mui/material";
import { CONFIG } from "@/config";

export default function DashboardPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {CONFIG.APP.NAME}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Dashboard placeholder. Add feature components here.
      </Typography>
    </Container>
  );
}

