// n4atan/sfi/SFI-39d4745075640a6a88ebf22b26dbd2e81de6322a/src/Pages/Page-Painel/PagePainel.tsx

import { useEffect, useState } from "react";
import { type PatientQuery, type ManchesterPriority } from "../../services/models"; 
import axios from "axios";
import CardManchester from "../../components/Cards/CardManchester/CardManchester";
import './PagePainel.css';
import Header from "../../components/Header/Header";
import CardRecents, { type PatientForCardRecents } from "../../components/Cards/CardRecents/CardRecents";

// Mapeamento da Prioridade do Backend (immediate, standard, etc.) para a Cor usada no Frontend/CSS (Vermelho, Verde, etc.)
const priorityToColor: Record<ManchesterPriority, string> = {
    'non-urgent': 'Azul',
    'standard': 'Verde',
    'urgent': 'Amarelo',
    'very-urgent': 'Laranja',
    'immediate': 'Vermelho',
};

export default function PagePainel() {
    const [dataPatients, setDataPatients] = useState<PatientQuery[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Adicionado parâmetro opcional isInitialLoad para controlar o estado 'loading'
    const fetchPatients = async (isInitialLoad: boolean = false) => {
        const BASE_URL = 'https://hackathon2025-0y0f.onrender.com/patients';

        try {
            // Define loading como true apenas no carregamento inicial (isInitialLoad === true)
            if (isInitialLoad) {
                setLoading(true);
            }
            setError(null);

            // FIX RÁPIDO PARA O ERRO 500: Realiza duas requisições separadas
            const [registeringRes, attendingRes] = await Promise.all([
                axios.get<PatientQuery[]>(`${BASE_URL}?status=registering`),
                axios.get<PatientQuery[]>(`${BASE_URL}?status=attending`),
            ]);
            
            const registeredPatients = registeringRes.data || [];
            const attendingPatients = attendingRes.data || [];
            
            let combinedPatients = [...registeredPatients, ...attendingPatients];

            // Ordena os pacientes por status para que 'registering' apareça antes de 'attending'
            combinedPatients.sort((a, b) => {
                if (a.status === 'registering' && b.status === 'attending') return -1;
                if (a.status === 'attending' && b.status === 'registering') return 1;
                return 0; // Mantém a ordem original para pacientes com o mesmo status
            });
            
            // --- INÍCIO DA VERIFICAÇÃO DE ATUALIZAÇÃO (BUFFER) ---
            // Converte os dados para string JSON para uma comparação de conteúdo eficiente
            const newDataString = JSON.stringify(combinedPatients);
            const currentDataString = JSON.stringify(dataPatients);

            if (newDataString !== currentDataString) {
                // Se houver diferença, atualiza o estado
                setDataPatients(combinedPatients);
                console.log('Dados do Painel atualizados. Diferença detectada.');
            } else {
                // Se não houver diferença, não faz nada, evitando re-render desnecessário
                console.log('Refresh automático: Nenhuma mudança nos dados.');
            }
            // --- FIM DA VERIFICAÇÃO DE ATUALIZAÇÃO (BUFFER) ---
            
        } catch (e: unknown) {
            console.error("Erro ao buscar pacientes:", e);
            
            setError("Não foi possível carregar a lista de pacientes. Verifique o status do backend.");
            setDataPatients([]);
        } finally {
            // Apenas define loading como false se for o carregamento inicial.
            if (isInitialLoad) {
                setLoading(false);
            }
        }
    };
   
    useEffect(() => {
        // 1. Chama a função com 'true' para o carregamento inicial (mostra loading)
        fetchPatients(true);
        
        // 2. Configura o refresh automático a cada 10 segundos
        // Chama com 'false' (ou sem parâmetro) para que o loading não seja ativado nos refreshes
        const interval = setInterval(() => fetchPatients(false), 10000);
        
        // Limpa o intervalo no unmount
        return () => clearInterval(interval);
    }, []); // O array de dependências vazio garante que isso rode apenas uma vez

    // Função para contar pacientes por categoria de cor (que mapeia para a prioridade do backend)
    function filterByCategory(categoryColor: string): number {
        // Encontra o valor da prioridade do backend correspondente à cor do frontend
        const priority = (Object.keys(priorityToColor) as ManchesterPriority[])
            .find(key => priorityToColor[key] === categoryColor);
        
        if (!priority || !dataPatients) {
            return 0;
        }

        // Usa 'manchester_prio' (formato da rota /patients) para filtrar
        return dataPatients.filter(p => p.manchester_prio === priority).length;
    }

    if (loading) {
        return (
            <>
                {/* A tela de loading agora só aparece no primeiro carregamento */}
                <main style={{ padding: '20px', textAlign: 'center' }}>
                    <h1>Carregando Lista de Pacientes...</h1>
                </main>
            </>
        );
    }
    
    // Altera o título para refletir o novo filtro
    return (
        <>
        <Header />

        <section className="container-recents">
            <h1>Pacientes em Registro e Atendimento</h1>
            
            <div className="container-recents-cards">
                {error && (
                     <p style={{ margin: '10px', fontSize: '1.2em', color: 'red' }}>
                        {error}
                    </p>
                )}

                {!error && dataPatients.length === 0 ? (
                    <p style={{ margin: '10px', fontSize: '1.2em', color: '#8b8b8b' }}>
                        Não há pacientes em registro ou atendimento.
                    </p>
                ) : (
                    dataPatients.map((p) => {
                        // Mapeia a prioridade do backend (ex: 'standard') para a cor do CSS (ex: 'Verde')
                        const colorName = priorityToColor[p.manchester_prio as ManchesterPriority] || 'Azul';
                        
                        // Constrói o objeto de paciente com o campo manchester_priority ajustado para a cor
                        const patientWithColor: PatientForCardRecents = {
                            ...p,
                            manchester_priority: colorName // Agora é do tipo string (cor)
                        } as PatientForCardRecents;

                        return (
                            // O atributo 'key' garante a performance de listas no React, usando o UUID do paciente como identificador único.
                            <CardRecents key={p.uuid} patient={patientWithColor} />
                        );
                    })
                )}
            </div>
        </section>


        <section className="container-manch">
            <h1>Classificação de Risco</h1>

            <div className="container-manch-cards">
                {/* O valor de qtd é obtido da API através da função filterByCategory */}
                <CardManchester 
                    category="Emergência"
                    color="Vermelho"
                    qtd={filterByCategory('Vermelho')}
                    time="Imediato"
                />

                <CardManchester 
                    category="Muito Urgente"
                    color="Laranja"
                    qtd={filterByCategory('Laranja')}
                    time="10 Minutos"
                />
                
                <CardManchester 
                    category="Urgente"
                    color="Amarelo"
                    qtd={filterByCategory('Amarelo')}
                    time="60 Minutos"
                />

                <CardManchester 
                    category="Pouco Urgente"
                    color="Verde"
                    qtd={filterByCategory('Verde')}
                    time="120 Minutos"
                />

                <CardManchester 
                    category="Não Urgente"
                    color="Azul"
                    qtd={filterByCategory('Azul')}
                    time="240 Minutos"
                />
            </div>

            
        </section>
        </>
    )
}