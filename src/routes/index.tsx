import { Route, Routes } from "react-router-dom";
import App from "../App";
import RegisterPatient from "../components/Forms/RegisterPatient/RegisterPatient";
import PagePainel from "../Pages/Page-Painel/PagePainel";
import PageAdmin from "../Pages/Page-Admin/Page-Admin";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/"                 element={<App />} />
            <Route path="/registrar"                 element={<RegisterPatient />} />
            <Route path="/painel"                 element={<PagePainel />} />
            <Route path="/admin"                 element={<PageAdmin />} />
        </Routes>
    );
}