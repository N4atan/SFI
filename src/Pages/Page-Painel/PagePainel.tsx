import { useEffect, useState } from "react";
import type { Patient } from "../../services/models";
import axios from "axios";
import CardManchester from "../../components/Cards/CardManchester/CardManchester";
import './PagePainel.css';



export default function PagePainel() {
    const [ dataPatients, setDataPatiens ] = useState<Patient[]>();

    useEffect(()=>{
        const fetchData = async () => { // 'async' aqui é opcional se for usar apenas .then()
            axios.get('https://hackathon2025-0y0f.onrender.com/patients') // Adicionei 'https://'
                .then(response => {
                    console.log(response.data);
                    // Assumindo que a API retorna um array de pacientes diretamente em response.data
                    setDataPatiens(response.data);
                })
                .catch(error => {
                    console.error("Erro ao buscar pacientes:", error);
                });
        }

        fetchData();
    }, [])

    function filterByCategory(category: string) {
        if (!dataPatients) {
            return 0;
        }
        
        // Usando filter e retornando o comprimento
        return dataPatients.filter(p => p.manchester_priority === category).length;
    }

    return (
        <>


        <section className="container-manch">
            <h1>Classificação de Risco</h1>

            <div className="container-manch-cards">
                <CardManchester 
                    category="Não Urgente"
                    color="Azul"
                    qtd={filterByCategory('non-urgent')}
                    time="240 Minutos"
                />

                <CardManchester 
                    category="Pouco Urgente"
                    color="Verde"
                    qtd={filterByCategory('standard')}
                    time="120 Minutos"
                />

                <CardManchester 
                    category="Urgente"
                    color="Amarelo"
                    qtd={filterByCategory('urgent')}
                    time="60 Minutos"
                />

                <CardManchester 
                    category="Muito Urgente"
                    color="Laranja"
                    qtd={filterByCategory('very-urgent')}
                    time="10 Minutos"
                />

                <CardManchester 
                    category="Emergência"
                    color="Vermelho"
                    qtd={filterByCategory('immediate')}
                    time="Imediato"
                />
            </div>

            
        </section>
        </>
    )
}