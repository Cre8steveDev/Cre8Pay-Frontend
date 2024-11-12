// src/utils/errorHandler.ts
import { useAppStore } from "@/store";

type ErrorStatusMessages = {
  [key: number]: {
    title: string;
    message: string;
  };
};

const ERROR_MESSAGES: ErrorStatusMessages = {
  401: {
    title: "Invalid Credentials",
    message: "The email or password you entered is incorrect.",
  },
  403: {
    title: "Access Denied",
    message: "You don't have permission to perform this action.",
  },
  404: {
    title: "Not Found",
    message: "The requested resource was not found.",
  },
  500: {
    title: "Server Error",
    message: "Something went wrong on our end. Please try again later.",
  },
};

export const handleError = (error: any) => {
  const setError = useAppStore.getState().setError;

  if (!error.response) {
    setError({
      title: "Network Error",
      message: "Please check your internet connection and try again.",
    });
    return;
  }

  const status = error.response.status;
  const errorConfig = ERROR_MESSAGES[status] || {
    title: "An Error occured.",
    message: error.response.data?.message || "An unexpected error occurred.",
  };

  setError(errorConfig);
};
