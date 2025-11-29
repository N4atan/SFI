import { useState } from "react";
// Assumindo que você ainda precisa desta importação para alguma validação futura:


export default function RegisterPatient() {
    const [patientData, setPatientData] = useState({
        name: '',
        phone_number: '',
        partner_name: '',
        partner_phone_number: '',
        description: '',
        manchester_priority: '', // Nível de triagem de Manchester
        priority: '' // Prioridade final
    });

  
    const manchesterPriorityOptions = ['Red (Immediate)', 'Orange (Very Urgent)', 'Yellow (Urgent)', 'Green (Standard)', 'Blue (Non-urgent)'];
    
    const priorityOptions = ['High', 'Medium', 'Low'];

    // 2. Handler de Mudança (Unificado)
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        
        setPatientData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 3. Handler de Submissão
    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        

        console.log('Dados do Paciente a serem submetidos:', patientData);

        // Limpar o formulário após a submissão (opcional)
        // setPatientData({
        //     name: '', uuid: '', phone_number: '', partner_name: '',
        //     partner_phone_number: '', status: 'waiting', description: '',
        //     manchester_priority: '', priority: ''
        // });
    };

    // 4. Renderização do Componente
    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>📋 Registro de Paciente</h2>
            <hr />

            {/* Nome do Paciente (name) */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="name" style={{ display: 'block', fontWeight: 'bold' }}>Nome Completo:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={patientData.name}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            {/* Telefone do Paciente (phone_number) */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="phone_number" style={{ display: 'block', fontWeight: 'bold' }}>Telefone:</label>
                <input
                    type="tel"
                    id="phone_number"
                    name="phone_number"
                    value={patientData.phone_number}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>
            
            <hr />
            <h3>Informações do Contato (Parceiro)</h3>

            {/* Nome do Parceiro (partner_name) */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="partner_name" style={{ display: 'block', fontWeight: 'bold' }}>Nome do Parceiro/Contato:</label>
                <input
                    type="text"
                    id="partner_name"
                    name="partner_name"
                    value={patientData.partner_name}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            {/* Telefone do Parceiro (partner_phone_number) */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="partner_phone_number" style={{ display: 'block', fontWeight: 'bold' }}>Telefone do Parceiro/Contato:</label>
                <input
                    type="tel"
                    id="partner_phone_number"
                    name="partner_phone_number"
                    value={patientData.partner_phone_number}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            <hr />
            <h3>Triagem e Prioridade</h3>
            
            {/* Prioridade de Manchester (manchester_priority) - Usando <select> */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="manchester_priority" style={{ display: 'block', fontWeight: 'bold' }}>Triagem (Manchester):</label>
                <select
                    id="manchester_priority"
                    name="manchester_priority"
                    value={patientData.manchester_priority}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                >
                    <option value="" disabled>Selecione a Prioridade</option>
                    {manchesterPriorityOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>

            {/* Prioridade Final (priority) - Usando <select> */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="priority" style={{ display: 'block', fontWeight: 'bold' }}>Prioridade Final:</label>
                <input
                    type="number"
                    id="priority"
                    name="priority"
                    value={patientData.priority}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                />
            </div>

            {/* Descrição/Queixa Principal (description) */}
            <div style={{ marginBottom: '15px' }}>
                <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold' }}>Queixa Principal/Descrição:</label>
                <textarea
                    id="description"
                    name="description"
                    value={patientData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                    style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                ></textarea>
            </div>
            


            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Registrar Paciente
            </button>
        </form>
    )
}