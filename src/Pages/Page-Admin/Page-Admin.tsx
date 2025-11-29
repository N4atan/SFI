import axios from "axios";
import { useState, useEffect, useCallback } from "react";

// Definições de Tipos (Baseado em src/entities/Patient.ts)
type ManchesterPriority = 'immediate' | 'very-urgent' | 'urgent' | 'standard' | 'non-urgent';
type PatientStatus = 'waiting' | 'registering' | 'attending';

interface Patient {
    name: string;
    uuid: string;
    phone_number: string;
    partner_name: string;
    partner_phone_number: string;
    status: PatientStatus;
    description: string;
    manchester_priority: ManchesterPriority;
    priority: number;
    state: string | null;
    location: string | null;
}

// Mapeamentos para exibição no formulário
const manchesterOptions: { value: ManchesterPriority; label: string }[] = [
    { value: 'immediate', label: 'Vermelho (Emergência)' },
    { value: 'very-urgent', label: 'Laranja (Muito Urgente)' },
    { value: 'urgent', label: 'Amarelo (Urgente)' },
    { value: 'standard', label: 'Verde (Pouco Urgente)' },
    { value: 'non-urgent', label: 'Azul (Não Urgente)' },
];

const statusOptions: { value: PatientStatus; label: string }[] = [
    { value: 'waiting', label: 'Aguardando na Fila' },
    { value: 'registering', label: 'Em Acolhimento/Triagem' },
    { value: 'attending', label: 'Em Atendimento' },
];

// URL base da API
const API_BASE_URL = 'https://hackathon2025-0y0f.onrender.com/patients'; // Rota base corrigida para /patients

export default function PageAdmin() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
    const [formData, setFormData] = useState<Partial<Patient>>({});
    const [message, setMessage] = useState<string | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    /**
     * Função para buscar o próximo paciente na fila
     */
    const fetchNextPatient = useCallback(async () => {
        setIsLoading(true);
        setMessage(null);
        setCurrentPatient(null);
        setFormData({});

        try {
            const response = await axios.get<Patient>(`${API_BASE_URL}/next-patient`);
            const patientData = response.data;
            
            setCurrentPatient(patientData);
            // Inicializa o formulário com os dados do paciente
            setFormData({
                description: patientData.description,
                manchester_priority: patientData.manchester_priority,
                status: patientData.status,
            });

            setMessage(`Próximo paciente: ${patientData.name}. Classificação: ${manchesterOptions.find(o => o.value === patientData.manchester_priority)?.label}.`);

        } catch (error) {
            console.error("Erro ao buscar pacientes:", error);
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                setMessage("Não há pacientes esperando atendimento.");
            } else {
                setMessage("Erro ao carregar o próximo paciente. Verifique a conexão.");
            }
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNextPatient();
    }, [fetchNextPatient]);

    /**
     * Lida com mudanças nos campos do formulário
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    /**
     * Envia as atualizações do paciente para a API (PUT /:uuid)
     */
    const handleUpdatePatient = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!currentPatient) {
            setMessage("Nenhum paciente carregado para atualizar.");
            return;
        }

        setIsUpdating(true);
        setMessage(null);

        try {
            // Rota de update (PUT)
            await axios.put(`${API_BASE_URL}/${currentPatient.uuid}`, formData);
            
            // 1. Inserir alert para o aviso de salvar
            alert("Status e dados do paciente atualizados com sucesso! O paciente e o acompanhante foram notificados.");
            
            // 3. Após o alert, fechar o paciente (buscar o próximo)
            fetchNextPatient();

        } catch (error) {
            console.error("Erro ao atualizar paciente:", error);
            // Manter o setMessage para erros, pois o alert não é ideal para erros complexos.
            setMessage("Erro ao atualizar os dados do paciente. Tente novamente."); 
        } finally {
            setIsUpdating(false);
        }
    };

    /**
     * Função para simular a chamada do paciente e colocá-lo em atendimento
     */
    const handleCallNext = async () => {
        if (!currentPatient) {
            fetchNextPatient();
            return;
        }

        const callData: Partial<Patient> = {
            status: 'attending', // Define o status como 'attending' (Em Atendimento)
            location: 'Consultório 1', // Exemplo de localização
        };

        setIsUpdating(true);
        setMessage(null);

        try {
            // A rota de update (PUT) irá notificar o paciente via WhatsApp
            await axios.put(`${API_BASE_URL}/${currentPatient.uuid}`, callData);
            
            alert(`Paciente ${currentPatient.name} chamado(a) para atendimento e notificado(a) via WhatsApp. O status foi atualizado para 'Em Atendimento'.`);

            // Recarrega o próximo paciente na fila
            fetchNextPatient();

        } catch (error) {
            console.error("Erro ao chamar paciente:", error);
            setMessage("Erro ao chamar o paciente. Tente novamente.");
        } finally {
            setIsUpdating(false);
        }
    }


    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2>Painel Administrativo - Próximo Paciente</h2>

            {/* Mensagens de Erro/Aviso (Apenas para feedback não-sucesso) */}
            {message && (
                <div style={{ padding: '10px', backgroundColor: message.startsWith('Erro') || message.startsWith('Não há') ? '#fdd' : '#dfd', border: '1px solid', margin: '15px 0' }}>
                    {message}
                </div>
            )}

            <button 
                onClick={handleCallNext} 
                disabled={isLoading || isUpdating || !currentPatient}
                style={{ 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    cursor: 'pointer', 
                    backgroundColor: currentPatient ? '#007bff' : '#6c757d', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '5px' 
                }}
            >
                {currentPatient ? 'CHAMAR PRÓXIMO PACIENTE' : 'Buscar Próximo na Fila'}
            </button>

            {isLoading && (<p>Carregando dados...</p>)}

            {currentPatient && (
                <form onSubmit={handleUpdatePatient} style={{ border: '1px solid #ccc', padding: '20px', marginTop: '20px', borderRadius: '5px' }}>
                    
                    <h3>Dados do Paciente</h3>

                    <p><strong>Nome:</strong> {currentPatient.name}</p>
                    <p><strong>UUID (Identificador):</strong> {currentPatient.uuid}</p>
                    <p><strong>Telefone:</strong> {currentPatient.phone_number}</p>
                    <p><strong>Acompanhante:</strong> {currentPatient.partner_name || 'N/A'}</p>
                    <p><strong>Prioridade Interna:</strong> {currentPatient.priority}</p>

                    <div style={{ margin: '15px 0' }}>
                        <label htmlFor="manchester_priority" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Classificação de Risco (Manchester)
                        </label>
                        <select 
                            id="manchester_priority" 
                            name="manchester_priority" 
                            value={formData.manchester_priority || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            required
                        >
                            {manchesterOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ margin: '15px 0' }}>
                        <label htmlFor="status" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Status do Paciente
                        </label>
                        <select 
                            id="status" 
                            name="status" 
                            value={formData.status || ''}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            required
                        >
                            {statusOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ margin: '15px 0' }}>
                        <label htmlFor="description" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            Observações/Descrição (Editável)
                        </label>
                        <textarea 
                            id="description" 
                            name="description" 
                            value={formData.description || ''}
                            onChange={handleChange}
                            style={{ 
                                width: '100%', 
                                padding: '8px', 
                                borderRadius: '4px', 
                                border: '1px solid #ccc', 
                                minHeight: '100px',
                                resize: 'vertical' // 2. Resize vertical
                            }}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isUpdating}
                        style={{ 
                            padding: '10px 20px', 
                            fontSize: '16px', 
                            cursor: 'pointer', 
                            backgroundColor: '#28a745', 
                            color: 'white', 
                            border: 'none', 
                            borderRadius: '5px' 
                        }}
                    >
                        {isUpdating ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </form>
            )}
            
            {!isLoading && !currentPatient && message !== "Não há pacientes esperando atendimento." && (
                <p>Erro ao carregar dados. Tente usar o botão de busca.</p>
            )}
        </div>
    );
}