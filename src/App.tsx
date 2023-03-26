import { SnackProvider } from "./hooks/Snackbar";
import { Home } from "./page/Home";

export const App = () => {
  return (
    <SnackProvider>
      <Home />
    </SnackProvider>
  );
};
