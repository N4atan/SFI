import { useState } from "react";
import './RegisterPatient.css';
import { useNavigate } from "react-router-dom";

export default function RegisterPatient() {
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        name: "",
        phone_number: "",
        partner_name: "",
        partner_phone_number: "",
    });
    

    const handleChange = (e: unknown) => {
        const { name, value } = e.target;

        setPatientData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tokenUser = localStorage.getItem('token-user');

        if (!tokenUser) {
            alert('Você precisa estar logado!');
            navigate('/login-nurse');
        }


        try {
            const console = await axios.post('https://hackathon2025-0y0f.onrender.com/patient/', )
        }

    };

    return (
        <form 
            onSubmit={handleSubmit}
            id="form-registrar-paciente"
            
        >
            <h2>Registro de Paciente</h2>

            {/* Nome */}
            <div style={{ marginBottom: 15 }}>
                <label>Nome Completo:</label>
                <input
                    type="text"
                    name="name"
                    value={patientData.name}
                    onChange={handleChange}
                    required
                    className="input-registrar"
                />
            </div>

            {/* Telefone */}
            <div style={{ marginBottom: 15 }}>
                <label>Telefone:</label>
                <input
                    type="tel"
                    name="phone_number"
                    value={patientData.phone_number}
                    onChange={handleChange}
                    required
                    className="input-registrar"
                />
            </div>


            <div className="div-blanck"></div>

            
            <h2>Acompanhante</h2>

            <div style={{ marginBottom: 15 }}>
                <label>Nome do acompanhante:</label>
                <input
                    type="text"
                    name="partner_name"
                    value={patientData.partner_name}
                    onChange={handleChange}
                    className="input-registrar"
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <label>Telefone do acompanhante:</label>
                <input
                    type="tel"
                    name="partner_phone_number"
                    value={patientData.partner_phone_number}
                    onChange={handleChange}
                    className="input-registrar"
                />
            </div>

            
            
            <div className="div-blanck"></div>
               

            <button 
                type="submit"
            >
                Registrar Paciente
            </button>
        </form>
    );
}