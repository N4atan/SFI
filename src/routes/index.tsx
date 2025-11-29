import { Route, Routes } from "react-router-dom";
import App from "../App";
import RegisterPatient from "../components/Forms/RegisterPatient/RegisterPatient";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/"                 element={<App />} />
            <Route path="/registrar"                 element={<RegisterPatient />} />
        </Routes>
    );
}