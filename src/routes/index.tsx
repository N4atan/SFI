// n4atan/sfi/SFI-39d4745075640a6a88ebf22b26dbd2e81de6322a/src/routes/index.tsx

import { Route, Routes } from "react-router-dom";


import PagePainel from "../Pages/Page-Painel/PagePainel";
import PageNurse from "../Pages/Page-Nurse/PageNurse";
import LoginUser from "../components/Forms/LoginUser/LoginUser";
import LoginPatient from "../components/Forms/LoginPatient/LoginPatient";
import PagePatientCard from "../Pages/Page-PatientCard/PagePatientCard"; // Importar

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/"                 element={<PagePainel />} />
            <Route path="/nurse"            element={<PageNurse />} />
            <Route path="/login-user"       element={<LoginUser />} />
            <Route path="/login-patient"    element={<LoginPatient />} />
            {/* Nova rota para o cartão do paciente */}
            <Route path="/patient-card/:uuid"     element={<PagePatientCard />} /> 
        </Routes>
    );
}