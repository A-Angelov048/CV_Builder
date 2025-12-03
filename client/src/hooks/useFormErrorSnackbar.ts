import { useState } from "react";
import { type FieldErrors } from "react-hook-form";

export function useFormErrorSnackbar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleErrors = (errors: FieldErrors) => {
    const collected: string[] = [];

    Object.values(errors).forEach((err) => {
      if (err?.message) {
        collected.push(err.message.toString());
      }
    });

    setMessages(collected);
    setOpen(true);
  };

  return {
    open,
    messages,
    close: () => setOpen(false),
    handleErrors,
  };
}
