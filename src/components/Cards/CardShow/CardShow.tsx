import type { Patient } from "../../../services/models"
import './CardShow.css';



type Props = {
    patient: Patient;
}


export default function CardShow({patient}: Props) {
    return (
       <div className="card-show">
            <h1>{patient.name}</h1>
            <span>{patient.manchester_priority}</span>
            <p>{patient.description}</p>
       </div> 
    )
}