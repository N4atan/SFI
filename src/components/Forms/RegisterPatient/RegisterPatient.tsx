import { useState } from "react";
import './RegisterPatient.css';
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importação necessária

export default function RegisterPatient() {
    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({
        name: "",
        password: "", // Campo obrigatório
        phone_number: "",
        partner_name: "",
        partner_phone_number: "",
        description: "", // Campo obrigatório
        manchester_priority: "undefined", // Ajustado para a opção padrão do select
        priority: 1, // Campo obrigatório com valor padrão
    });
    

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setPatientData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const tokenUser = localStorage.getItem('token-user');

        if (!tokenUser) {
            alert('Você precisa estar logado para registrar um paciente!');
            navigate('/login-user');
            return;
        }

        // Prepara o payload para a requisição
        const payload = {
            name: patientData.name,
            password: patientData.password,
            phone_number: patientData.phone_number,
            partner_name: patientData.partner_name || null, // Garante que é null se estiver vazio
            partner_phone_number: patientData.partner_phone_number || null, // Garante que é null se estiver vazio
            description: patientData.description,
            manchester_priority: patientData.manchester_priority,
            priority: Number(patientData.priority) // Converte a prioridade para número
        };
        
        // O campo 'password' é obrigatório para a criação do paciente

        try {
            await axios.post(
                'https://hackathon2025-0y0f.onrender.com/patients', 
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${tokenUser}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            alert('Paciente registrado com sucesso! Lembre-se do UUID e da senha para o login do paciente.');
            // Limpa o formulário após o sucesso
            setPatientData({
                name: "",
                password: "",
                phone_number: "",
                partner_name: "",
                partner_phone_number: "",
                description: "",
                manchester_priority: "undefined",
                priority: 1,
            });

        } catch (error: any) {
            console.error('Erro ao registrar paciente:', error);
            const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
                ? `Erro: ${error.response.data.message}`
                : 'Erro ao registrar paciente. Verifique o console para mais detalhes.';
            alert(errorMessage);
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
            
            {/* Senha - NOVO CAMPO */}
            <div style={{ marginBottom: 15 }}>
                <label>Senha do Paciente (Para Login):</label>
                <input
                    type="password"
                    name="password"
                    value={patientData.password}
                    onChange={handleChange}
                    required
                    className="input-registrar"
                    minLength={3} // Senha tem 3 caracteres no backend
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

            
            <h2>Classificação de Risco e Queixa</h2>
            
            {/* Descrição */}
            <div style={{ marginBottom: 15 }}>
                <label>Descrição/Queixa Principal:</label>
                <textarea
                    name="description"
                    value={patientData.description}
                    onChange={handleChange}
                    required
                    className="input-registrar"
                    rows={4}
                />
            </div>
            
            {/* Prioridade Manchester */}
            <div style={{ marginBottom: 15 }}>
                <label>Prioridade Manchester (Classificação de Risco):</label>
                <select
                    name="manchester_priority"
                    value={patientData.manchester_priority}
                    onChange={handleChange}
                    required
                    className="input-registrar"
                >
                    <option value="undefined">Indefinida</option>
                    <option value="immediate">Emergência</option>
                    <option value="very-urgent">Muito Urgente</option>
                    <option value="urgent">Urgente</option>
                    <option value="standard">Pouco Urgente</option>
                    <option value="non-urgent">Não Urgente</option>
                </select>
            </div>

            {/* Prioridade Específica (Number) */}
            <div style={{ marginBottom: 15 }}>
                <label>Prioridade Específica (Número. Ex: 1 para menor prioridade, 10 para maior):</label>
                <input
                    type="number"
                    name="priority"
                    value={patientData.priority}
                    onChange={handleChange}
                    required
                    className="input-registrar"
                    min="1"
                    step="1"
                />
            </div>

            <div className="div-blanck"></div>
            
            <h2>Acompanhante (Opcional)</h2>

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