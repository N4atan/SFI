import { useState } from "react";

export default function RegisterPatient() {
    const [patientData, setPatientData] = useState({
        name: "",
        phone_number: "",
        partner_name: "",
        partner_phone_number: "",
        description: "",
        manchester_priority: "",
        priority: ""
    });

    const manchesterOptions = [
        { label: "Vermelho", value: "immediate" },
        { label: "Laranja", value: "very-urgent" },
        { label: "Amarelo", value: "urgent" },
        { label: "Verde", value: "standard" },
        { label: "Azul", value: "non-urgent" }
    ];

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setPatientData(prev => ({
            ...prev,
            [name]: name === "priority" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        console.log("Enviando:", patientData);

        try {
            const res = await fetch("https://hackathon2025-0y0f.onrender.com/patients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patientData)
            });

            const data = await res.json();
            console.log("Resposta da API:", data);

            alert("Paciente cadastrado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar:", error);
            alert("Erro ao registrar paciente.");
        }
    };

    return (
        <form 
            onSubmit={handleSubmit}
            style={{ maxWidth: 600, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}
        >
            <h2>📋 Registro de Paciente</h2>
            <hr/>

            {/* Nome */}
            <div style={{ marginBottom: 15 }}>
                <label>Nome Completo:</label>
                <input
                    type="text"
                    name="name"
                    value={patientData.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8 }}
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
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <hr />
            <h3>Acompanhante</h3>

            <div style={{ marginBottom: 15 }}>
                <label>Nome do acompanhante:</label>
                <input
                    type="text"
                    name="partner_name"
                    value={patientData.partner_name}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <div style={{ marginBottom: 15 }}>
                <label>Telefone do acompanhante:</label>
                <input
                    type="tel"
                    name="partner_phone_number"
                    value={patientData.partner_phone_number}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <hr />
            <h3>Triagem</h3>

            {/* Manchester */}
            <div style={{ marginBottom: 15 }}>
                <label>Triagem:</label>
                <select
                    name="manchester_priority"
                    value={patientData.manchester_priority}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: 8 }}
                >
                    <option value="">Selecione</option>
                    {manchesterOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            </div>

            {/* Priority numérica */}
            <div style={{ marginBottom: 15 }}>
                <label>Prioridade Interna:</label>
                <input
                    type="number"
                    name="priority"
                    value={patientData.priority}
                    onChange={handleChange}
                    required
                    min="0"
                    max="9"
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            {/* Descrição */}
            <div style={{ marginBottom: 15 }}>
                <label>Descrição:</label>
                <textarea
                    name="description"
                    value={patientData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    style={{ width: "100%", padding: 8 }}
                />
            </div>

            <button 
                type="submit"
                style={{ padding: "10px 20px", background: "#007bff", color: "white", border: 0, borderRadius: 5 }}
            >
                Registrar Paciente
            </button>
        </form>
    );
}