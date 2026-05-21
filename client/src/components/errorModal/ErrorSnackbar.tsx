import { Snackbar, Alert, AlertTitle } from "@mui/material";
import { ErrorSnackbarProps } from "../../types/componentsPropsTypes";

export default function ErrorSnackbar({ open, messages, onClose }: ErrorSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%", fontSize: "14px" }}>
        <AlertTitle>Form Errors</AlertTitle>
        {messages.map((msg, i) => (
          <div key={i}>• {msg}</div>
        ))}
      </Alert>
    </Snackbar>
  );
}
