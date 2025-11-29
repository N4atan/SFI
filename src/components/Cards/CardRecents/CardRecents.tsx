// n4atan/sfi/SFI-39d4745075640a6a88ebf22b26dbd2e81de6322a/src/components/Cards/CardRecents/CardRecents.tsx

import type { PatientQuery } from "../../../services/models"
import './CardRecents.css';

// Tipo que representa o Patient, mas com a prioridade já mapeada para a cor (string do CSS)
export type PatientForCardRecents = Omit<PatientQuery, 'manchester_prio'> & {
    manchester_priority: string; // Espera o nome da cor do CSS (e.g., 'Azul', 'Verde')
};

type Props = {
    patient: PatientForCardRecents;
}

export default function CardRecents({patient}: Props) {
    // O valor de patient.manchester_priority é o nome da classe CSS (ex: bg-Verde)
    return (
        <div className="card-recent">
            
            <div className={`badge-manchester bg-${patient.manchester_priority}`}>

            </div>

            <span className="span-patient-id">
                {patient.uuid}
            </span>

            <span className="span-patient-status">
                {patient.status}
            </span>

        </div>
    )
}