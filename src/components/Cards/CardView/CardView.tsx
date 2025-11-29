import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import type { Patient } from "../../../services/models"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
    patient: Partial<Patient>;
}

export default function CardView({patient}: Props){
    const msg = `
    🏥 Atualização do Atendimento \n

    👤 Paciente: ${patient.name} \n
    🎯 Classificação de Risco: ${patient.manchester_priority} \n
    📌 Status atual: ${patient.status} \n
    `

    return (
        <div
            style={{width: '300px', height: '150px', padding: '10px', border: '1px solid rgb(0, 0, 0, 0.1)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)', position: 'relative', display: 'flex', flexDirection: 'column'}}
        >
            <p style={{fontWeight: 'bold'}}>
                {patient.name}
            </p>

            <p style={{color: '#636363ff'}}>
                {patient.status}
            </p>

            

            <div
                style={{position: 'absolute', top: '10px', right: '10px'}}
            >
                <span
                    style={{fontSize: '12px'}}
                >
                    {patient.manchester_priority}

                </span>
            </div>


            <a
                style={{marginTop: 'auto', padding: '8px', backgroundColor: '#25D366', color: '#fff', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none', textAlign: 'center'}}
                href={`https://wa.me/${'5551997433224'}?text=${msg}`}
                target="_blank"
            >
                <FontAwesomeIcon icon={faWhatsapp} />
                Notificar
            </a>
        </div>
    )
}