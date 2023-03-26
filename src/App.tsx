import { ModalProvider } from "./hooks/Modal";
import { SnackProvider } from "./hooks/Snackbar";
import { Home } from "./page/Home";

export const App = () => {
  return (
    <SnackProvider>
      <ModalProvider>
        <Home />
      </ModalProvider>
    </SnackProvider>
  );
};
