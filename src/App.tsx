import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "sonner";
import { AppRouter } from "./router/AppRouter";
import { useAuthStatus } from "./shared/hooks/useAuthStatus";
import { useDatabaseSync } from "./shared/hooks/useDatabaseSync";
import Loader from "./shared/components/atoms/Loader";

const AppContent = () => {
  const { user, loading } = useAuthStatus();
  useDatabaseSync();

  if (loading) return <Loader />;

  return (
    <>
      <AppRouter user={user} />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
