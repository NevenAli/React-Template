import { Container, Typography, Link as MuiLink, Stack } from "@mui/material";
import { paths } from "@/routes/paths";

export default function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={1}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          404 - Not Found
        </Typography>
        <Typography color="text.secondary">
          The page you requested does not exist.
        </Typography>
        <MuiLink href={paths.LOGIN}>Go to login</MuiLink>
      </Stack>
    </Container>
  );
}

