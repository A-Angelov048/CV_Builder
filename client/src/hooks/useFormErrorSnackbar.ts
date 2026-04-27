import { useState } from "react";
import { type FieldErrors } from "react-hook-form";
import { ZodError } from "zod";

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

  const handleCustomError = (message: string) => {
    setMessages([message]);
    setOpen(true);
  };

  const handleZodErrors = (error: ZodError) => {
    const collected: string[] = [];

    error.errors.forEach((err) => {
      if (err.message) {
        collected.push(err.message);
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
    handleCustomError,
    handleZodErrors,
  };
}
