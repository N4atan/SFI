import type { Patient } from "../../../services/models"
import './CardRecents.css';



type Props = {
    patient: Patient;
}

export default function CardRecents({patient}: Props) {
    return (
        <div className="card-recent">
            
            <div className={`badge-manchester ${patient.manchester_priority}`}>

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