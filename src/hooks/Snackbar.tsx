import React, { createContext, useContext, useMemo, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";

export interface ISnackMessage {
  id: string;
  message: string;
  open?: boolean;
  severity: "error" | "warning" | "info" | "success";
  handleClose?(): void;
}

interface ISnackContextData {
  createSnack(message: Omit<ISnackMessage, "id">): void;
}

const SnackContext = createContext<ISnackContextData>({} as ISnackContextData);

const RenderSnack = ({
  id,
  message,
  open,
  severity,
  handleClose,
}: ISnackMessage) => {
  const messageId = `message-${id}`;
  let title;

  switch (severity) {
    case "error":
      title = "Erro";
      break;
    case "warning":
      title = "Aviso";
      break;
    case "info":
      title = "Informação";
      break;
    case "success":
      title = "Sucesso";
      break;
    default:
      break;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      ContentProps={{
        "aria-describedby": messageId,
      }}
      onClose={handleClose}
    >
      <Alert id={messageId} severity={severity} onClose={handleClose}>
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Snackbar>
  );
};

const SnackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ current, queue }, setState] = useState<any>({
    current: null,
    queue: [],
  });

  const createSnack = ({ message, ...options }: ISnackMessage) => {
    const id = uuidv4();

    const snack = { ...options, id, message, open: true };

    if (current) {
      setState({ current, queue: queue.concat(snack) });
    } else {
      setState({ queue, current: snack });
    }

    return id;
  };

  const openNext = () => {
    if (queue.length) {
      setState({ current: queue[0], queue: queue.slice(1) });
    } else {
      setState({ current: null, queue: [] });
    }
  };

  const handleClose = () => {
    setState((currentState: { current: any }) => ({
      ...currentState,
      current: { ...currentState.current, open: false },
    }));
    // * time to snack close animation
    setTimeout(openNext, 1000);
  };

  const snackProviderValue = useMemo(() => ({ createSnack }), []);

  return (
    <SnackContext.Provider value={snackProviderValue}>
      {current && (
        <RenderSnack key={current.id} {...current} handleClose={handleClose} />
      )}
      {children}
    </SnackContext.Provider>
  );
};

function useSnackbar(): ISnackContextData {
  const context = useContext(SnackContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackProvider");
  }

  return context;
}

export { SnackProvider, useSnackbar };
