
export interface Patient {
    name: string,
    uuid: string,
    phone_number: string,
    partner_name: string,
    partner_phone_number: string,
    description: string,
    manchester_priority: string,
    priority: string,
    status: string
}

export const patients: Patient[] = [
  {
    "name": "Ana Silva",
    "uuid": "8d0b2f1a",
    "phone_number": "(51) 98765-4321",
    "partner_name": "Pedro Santos",
    "partner_phone_number": "(51) 98765-1234",
    "description": "Dor torácica intensa há 2 horas. Histórico de hipertensão.",
    "manchester_priority": "Verde",
    "priority": "Não Urgente",
    "status": "Aguardando atendimento"
  },
  {
    "name": "Bruno Costa",
    "uuid": "2a4e9g6h",
    "phone_number": "(11) 99887-7654",
    "partner_name": "Mariana Oliveira",
    "partner_phone_number": "(11) 99887-7777",
    "description": "Queda com suspeita de fratura no braço esquerdo. Paciente consciente.",
    "manchester_priority": "Laranja",
    "priority": "Muito Urgente",
    "status": "Em atendimento"
  },
  {
    "name": "Carla Meireles",
    "uuid": "7c5a0d3b",
    "phone_number": "(21) 97654-3210",
    "partner_name": "Rafael Teixeira",
    "partner_phone_number": "(21) 97654-0000",
    "description": "Febre alta (39.5°C) e dores abdominais há 2 dias.",
    "manchester_priority": "Amarelo",
    "priority": "Urgente",
    "status": "Aguardando exames"
  },
  {
    "name": "Daniel Fernandes",
    "uuid": "4f8b1c9d",
    "phone_number": "(31) 96543-2109",
    "partner_name": "Lúcia Gomes",
    "partner_phone_number": "(31) 96543-9999",
    "description": "Corte profundo na perna, sutura realizada. Estável. Aguardando liberação.",
    "manchester_priority": "Verde",
    "priority": "Pouco Urgente",
    "status": "Alta prevista"
  },
  {
    "name": "Elisa Santos",
    "uuid": "1e6d3c2a",
    "phone_number": "(81) 95432-1098",
    "partner_name": "Fernando Borges",
    "partner_phone_number": "(81) 95432-1111",
    "description": "Reação alérgica leve após ingestão de camarão. Medicada, sem piora.",
    "manchester_priority": "Azul",
    "priority": "Não Urgente",
    "status": "Em observação"
  },
  {
    "name": "Fábio Lima",
    "uuid": "9g2h5i8j",
    "phone_number": "(41) 94321-0987",
    "partner_name": "Patrícia Moura",
    "partner_phone_number": "(41) 94321-2222",
    "description": "Parada cardiorrespiratória na chegada. RCP em andamento.",
    "manchester_priority": "Vermelho",
    "priority": "Emergência",
    "status": "Em atendimento"
  },
  {
    "name": "Gabriela Rocha",
    "uuid": "3j7k0l4m",
    "phone_number": "(71) 93210-9876",
    "partner_name": "Ricardo Nogueira",
    "partner_phone_number": "(71) 93210-3333",
    "description": "Dor de cabeça unilateral intensa, com náuseas e vômitos.",
    "manchester_priority": "Laranja",
    "priority": "Muito Urgente",
    "status": "Aguardando exames"
  },
  {
    "name": "Hugo Alves",
    "uuid": "6l1m4n8o",
    "phone_number": "(61) 92109-8765",
    "partner_name": "Sofia Diniz",
    "partner_phone_number": "(61) 92109-4444",
    "description": "Dor de garganta e tosse persistente há uma semana. Sem febre.",
    "manchester_priority": "Amarelo",
    "priority": "Urgente",
    "status": "Aguardando atendimento"
  },
  {
    "name": "Ingrid Souza",
    "uuid": "5m9n2o6p",
    "phone_number": "(92) 91098-7654",
    "partner_name": "Vitor Medeiros",
    "partner_phone_number": "(92) 91098-5555",
    "description": "Curativo pós-operatório trocado. Sem sinais de infecção. Aguardando liberação.",
    "manchester_priority": "Verde",
    "priority": "Pouco Urgente",
    "status": "Alta prevista"
  },
  {
    "name": "João Pereira",
    "uuid": "0p3q7r1s",
    "phone_number": "(85) 90987-6543",
    "partner_name": "Diana Castro",
    "partner_phone_number": "(85) 90987-6666",
    "description": "Solicitação de atestado médico para acompanhar familiar. Sem queixas próprias.",
    "manchester_priority": "Azul",
    "priority": "Não Urgente",
    "status": "Em observação"
  }
]