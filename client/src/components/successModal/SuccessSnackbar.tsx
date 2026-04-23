import { Snackbar, Alert, AlertTitle } from "@mui/material";

interface SuccessSnackbarProps {
  open: boolean;
  messages: string;
  onClose: () => void;
}

export function SuccessSnackbar({ open, messages, onClose }: SuccessSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%", fontSize: "14px" }}>
        <AlertTitle>Success</AlertTitle>
        <div>• {messages}</div>
      </Alert>
    </Snackbar>
  );
}
