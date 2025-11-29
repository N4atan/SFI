import { Route, Routes } from "react-router-dom";


import PagePainel from "../Pages/Page-Painel/PagePainel";
import PageNurse from "../Pages/Page-Nurse/PageNurse";
import LoginUser from "../components/Forms/LoginUser/LoginUser";
import LoginPatient from "../components/Forms/LoginPatient/LoginPatient";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/"                 element={<PagePainel />} />
            <Route path="/nurse"            element={<PageNurse />} />
            <Route path="/login-user"       element={<LoginUser />} />
            <Route path="/login-patient"    element={<LoginPatient />} />
        </Routes>
    );
}