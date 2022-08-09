import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Privateroute } from "./Components/Privateroute_cmp";
import { AuthContextProvider } from "./Contexts/AuthContext";
import Error404 from "./pages/404";
// Components
import Modal from "react-modal";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login/index";
import { SignUp } from "./pages/SignUp";
import { GlobalStyled } from "./themes/GlobalStyled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import InitialDashboard from "./Components/InitialDashboard";
import { CalenderContextProvider } from "./Contexts/CalenderContext";
import { FeedbackPage } from "./pages/Feedback";
import { ManageClass } from "./pages/ManageClass";
import { FinancialReport } from "./pages/FinancialReport";
import { Students } from "./pages/Students";
import { Schedule } from "./pages/Schedule";

Modal.setAppElement("#root");
function App() {
  return (
    <AuthContextProvider>
      <CalenderContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            {/* Private */}
            <Route
              path="/dashboard"
              element={<Privateroute element={<Dashboard />} />}
            >
              <Route
                path=""
                element={<Privateroute element={<InitialDashboard />} />}
              />
              <Route
                path="manage-class"
                element={<Privateroute element={<ManageClass />} />}
              />
              <Route
                path="feedback"
                element={<Privateroute element={<FeedbackPage />} />}
              />
              <Route
                path="finances"
                element={<Privateroute element={<FinancialReport />} />}
              />
              <Route
                path="schedule"
                element={<Privateroute element={<Schedule/>} />}
              />
              <Route
                path="students"
                element={<Privateroute element={<Students />} />}
              />
            </Route>
            {/* error 404 */}
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        <GlobalStyled />
        <ToastContainer />
      </CalenderContextProvider>
    </AuthContextProvider>
  );
}

export default App;
