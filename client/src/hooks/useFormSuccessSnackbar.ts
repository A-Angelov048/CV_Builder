import { useState } from "react";

export function useFormSuccessSnackbar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string>("");

  const handleSuccess = (message: string) => {
    setMessages(message);
    setOpen(true);
  };

  return {
    openSuccess: open,
    messagesSuccess: messages,
    closeSuccess: () => setOpen(false),
    handleSuccess,
  };
}
