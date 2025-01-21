import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import RoutesMaster from "./routes/RouterMaster";
import "./App.css";
import { MAIN_VIEW, SUPPLIER_DETAILS } from "./consts/routes";
import { Button, createTheme, ThemeProvider } from "@mui/material";

const Nav: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isMainView = location.pathname === MAIN_VIEW;

  const handleNavigation = () => {
    navigate(isMainView ? SUPPLIER_DETAILS : MAIN_VIEW);
  };

  return (
    <div className="nav">
      <Button
        style={{ textTransform: 'none'}}
        color="secondary"
        variant={"contained"}
        onClick={handleNavigation}
      >
        {isMainView ? "Go to Supplier View" : "Go to Main View"}
      </Button>
    </div>
  );
};

const App: FC = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#02B2AF",
      },
      secondary: {
        main: "#FFFFFF",
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Nav />
          <div className="wrapper">
            <Routes>
              {RoutesMaster.map((routeElement, index) => (
                <Route
                  key={index}
                  path={routeElement.path}
                  element={<routeElement.component />}
                />
              ))}
              <Route path="/" element={<Navigate to={MAIN_VIEW} />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
