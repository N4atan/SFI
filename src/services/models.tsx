// n4atan/sfi/SFI-39d4745075640a6a88ebf22b26dbd2e81de6322a/src/services/models.tsx

// Define a interface para o formato de dados retornado pela rota GET /patients
export interface PatientQuery {
    uuid: string,
    name: string,
    status: 'waiting' | 'registering' | 'attending',
    // O nome do campo na resposta da API /patients é 'manchester_prio'
    manchester_prio: 'immediate' | 'very-urgent' | 'urgent' | 'standard' | 'non-urgent',
    specific_prio: number,
    state?: string | null, 
    location?: string | null,
}

export type ManchesterPriority = 'immediate' | 'very-urgent' | 'urgent' | 'standard' | 'non-urgent';
export type PatientStatus = 'waiting' | 'registering' | 'attending';

// Interface original mantida para compatibilidade, mas o PatientQuery é usado no painel
export interface Patient {
    name: string,
    uuid: string,
    phone_number: string,
    partner_name: string | null,
    partner_phone_number: string | null,
    description: string,
    manchester_priority: ManchesterPriority,
    priority: number,
    status: PatientStatus,
    state?: string | null, 
    location?: string | null,
    created_at?: Date | string,
}

export const patients: Patient[] = [];