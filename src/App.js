import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routs/Router";
import Layout from "./layout/Layout";
import UserProvider from "./users/providers/UserProvider";
import CustomThemeProvider from "./providers/CustomThemeProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import AlertProvider from "./providers/AlertProvider";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <SnackbarProvider>
          <AlertProvider>
            <CustomThemeProvider>
              <Layout>
                <Router />
              </Layout>
            </CustomThemeProvider>
          </AlertProvider>
        </SnackbarProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
