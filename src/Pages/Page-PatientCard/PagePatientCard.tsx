// n4atan/sfi/SFI-39d4745075640a6a88ebf22b26dbd2e81de6322a/src/pages/PagePatientCard/PagePatientCard.tsx

import { useEffect, useState } from "react";
import axios from "axios";
// ✅ ALTERAÇÃO: Importa useParams
import { useNavigate, useParams } from "react-router-dom";
import CardView from "../../components/Cards/CardView/CardView";
import type { Patient } from "../../services/models"; // Usando a interface base

const BASE_URL = 'https://hackathon2025-0y0f.onrender.com';

// Define a estrutura mínima esperada da API de query para um paciente
interface PatientQueryResponse {
    name: string;
    status: string;
    manchester_prio: string;
    uuid: string;
    specific_prio: number;
}

export default function PagePatientCard() {
    const navigate = useNavigate();
    // ✅ ALTERAÇÃO: Captura o UUID da URL
    const { uuid } = useParams<{ uuid: string }>();
    const [patientData, setPatientData] = useState<Partial<Patient> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token-patient');
        if (!token) {
            alert('Sua sessão expirou. Faça login novamente.');
            navigate('/login-patient');
            return;
        }

        // ✅ NOVO: Verifica se o UUID está disponível na URL
        if (!uuid) {
            setError("Identificador do paciente (UUID) não encontrado na URL.");
            setLoading(false);
            return;
        }

        const fetchPatientData = async () => {
            try {
                // ✅ ALTERAÇÃO: Inclui o UUID como parâmetro de query
                const response = await axios.get<PatientQueryResponse[]>(`${BASE_URL}/patients?uuid=${uuid}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = response.data[0];

                if (data) {
                    // Mapeia o campo 'manchester_prio' (retorno da API) para 'manchester_priority' (esperado pelo CardView.tsx)
                    const mappedData: Partial<Patient> = {
                        ...data,
                        manchester_priority: data.manchester_prio,
                        name: data.name,
                        status: data.status,
                        // Outros campos relevantes para a mensagem do WhatsApp (CardView.tsx) são carregados se existirem
                    };

                    setPatientData(mappedData);
                } else {
                    setError("Dados do paciente não encontrados. Token ou UUID inválido.");
                }
            } catch (e) {
                console.error(e);
                alert('Erro ao carregar dados. Redirecionando para o login.');
                localStorage.removeItem('token-patient');
                navigate('/login-patient');
            } finally {
                setLoading(false);
            }
        };

        fetchPatientData();
    }, [navigate, uuid]); // Adiciona 'uuid' como dependência do useEffect

    if (loading) return <div>Carregando informações do paciente...</div>;
    if (error) return <div style={{ color: 'red', margin: '20px' }}>Erro: {error}</div>;
    if (!patientData) return <div>Nenhum dado encontrado. Faça login novamente.</div>;


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px' }}>
            <h1>Seu Status de Atendimento</h1>
            <p>O cartão abaixo reflete o seu status atual no sistema de triagem.</p>
            <div style={{ margin: '20px' }}>
                <CardView patient={patientData} />
            </div>
            <button
                onClick={() => { localStorage.removeItem('token-patient'); navigate('/login-patient'); }}
                style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}
            >
                Fazer Logout
            </button>
        </div>
    );
}