import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import type { Patient } from "../../../services/models"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    patient: Partial<Patient>;
}

// Mapeamento de cor da Prioridade de Manchester 
const getPriorityColor = (priority: string | undefined): string => {
    switch (priority?.toUpperCase()) {
        case 'VERMELHO':
            return '#E30000'; // Vermelho (Extrema urgência)
        case 'LARANJA':
            return '#FF8C00'; // Laranja (Muito urgente)
        case 'AMARELO':
            return '#FFD700'; // Amarelo (Urgente)
        case 'VERDE':
            return '#32CD32'; // Verde Limão (Pouco urgente)
        case 'AZUL':
            return '#1E90FF'; // Azul (Não urgente)
        default:
            return '#6c757d'; // Padrão (Cinza)
    }
}


export default function CardView({ patient }: Props) {
    // ✅ MENSAGEM DO WHATSAPP TRADUZIDA
    const msg = `
    🏥 Atualização do Atendimento \n

    👤 Paciente: ${patient.name || 'Nome Indisponível'} \n
    🎯 Classificação de Risco: ${patient.manchester_priority || 'N/A'} \n
    📌 Status atual: ${patient.status || 'Aguardando classificação'} \n
    `

    const priorityColor = getPriorityColor(patient.manchester_priority);
    const manchesterPriorityText = patient.manchester_priority ? `Classificação: ${patient.manchester_priority}` : 'Sem Classificação';

    return (
        <div
            style={{
                width: '320px',
                padding: '20px',
                border: `2px solid ${priorityColor}40`,
                borderRadius: '12px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#f8f9fa',
                minHeight: '180px'
            }}
        >
            {/* Título (Nome do Paciente) */}
            <p style={{ fontWeight: '900', fontSize: '1.3rem', marginBottom: '5px', color: '#007bff' }}>
                {patient.name}
            </p>

            {/* Classificação de Risco (Manchester Priority) */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '15px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid #dee2e6'
                }}
            >
                {/* Indicador Colorido */}
                <div
                    style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: priorityColor,
                        boxShadow: `0 0 5px ${priorityColor}99`,
                    }}
                ></div>
                {/* Texto da Classificação */}
                <span
                    style={{ fontSize: '0.95rem', fontWeight: 'bold', color: priorityColor }}
                >
                    {manchesterPriorityText}
                </span>
            </div>

            {/* Status atual */}
            <p style={{ color: '#495057', fontSize: '1rem', marginBottom: 'auto', fontWeight: '600' }}>
                Status Atual: <span style={{ color: '#212529' }}>{patient.status}</span>
            </p>

            {/* Botão de WhatsApp */}
            <a
                style={{
                    marginTop: '20px',
                    padding: '12px 15px',
                    backgroundColor: '#25D366',
                    color: '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: '1rem'
                }}
                href={`https://wa.me/${'5551997433224'}?text=${encodeURIComponent(msg)}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FontAwesomeIcon icon={faWhatsapp} />
                Compartilhar Status
            </a>
        </div>
    )
}