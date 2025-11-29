import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import RegisterPatient from "../../components/Forms/RegisterPatient/RegisterPatient";
import LoginUser from "../../components/Forms/LoginUser/LoginUser";
import { patients } from "../../services/models";
import { Navigate, useNavigate } from "react-router-dom";


export default function PageNurse() {


    return (
        <main>
            <RegisterPatient />
        </main>
    )
}