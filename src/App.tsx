import {
  Button,
  Card,
  Typography,
  Stack,
  Container,
  Box,
  Divider,
} from "@mui/material";
import { useAppTheme, useLocalization } from "@/providers";
import { CONFIG } from "@/config";

function App() {
  const { mode, toggleTheme } = useAppTheme();
  const { locale, setLocale, isRTL } = useLocalization();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={4}>
        {/* قسم التحكم - Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h3" fontWeight="bold">
              {CONFIG.APP.NAME}
            </Typography>
            <Typography color="text.secondary">
              وضع التشغيل الحالي: <strong>{mode.toUpperCase()}</strong> | اللغة:{" "}
              <strong>{locale.toUpperCase()}</strong>
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Button variant="outlined" onClick={toggleTheme}>
              {mode === "light" ? "🌙 وضع الليل" : "☀️ وضع النهار"}
            </Button>
            <Button
              variant="contained"
              onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
            >
              {locale === "ar" ? "Switch to English" : "التحويل للعربية"}
            </Button>
          </Stack>
        </Box>

        <Divider />

        {/* بطاقة الاختبار الشاملة */}
        <Card
          sx={{
            p: 4,
            borderLeft: isRTL ? "none" : "5px solid",
            borderRight: isRTL ? "5px solid" : "none",
            borderColor: "primary.main",
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4">
              {locale === "ar"
                ? "اختبار خصائص القالب"
                : "Template Features Test"}
            </Typography>

            <Typography variant="body1">
              لاحظ كيف يتغير <strong>نوع الخط</strong> (IBM Plex Sans Arabic
              للعربية و Inter للإنجليزية) وكيف ينقلب{" "}
              <strong>اتجاه العناصر</strong> (RTL) تلقائياً عند الضغط على الزر
              أعلاه.
            </Typography>

            <Box display="flex" gap={2} flexWrap="wrap">
              <Button variant="contained" color="primary">
                Primary
              </Button>
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
              <Button variant="contained" color="success">
                Success Token
              </Button>
              <Button variant="contained" color="error">
                Error Token
              </Button>
            </Box>

            <Box sx={{ p: 2, bgcolor: "background.neutral", borderRadius: 1 }}>
              هذا الصندوق يستخدم لون الـ <strong>Neutral</strong> الموجود في الـ
              Tokens الخاصة بنا.
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}

export default App;
