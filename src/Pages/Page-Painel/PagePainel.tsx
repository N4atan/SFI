import { useEffect, useState } from "react";
import { patients, type Patient } from "../../services/models";
import axios from "axios";
import CardManchester from "../../components/Cards/CardManchester/CardManchester";
import './PagePainel.css';
import Header from "../../components/Header/Header";
import CardRecents from "../../components/Cards/CardRecents/CardRecents";



export default function PagePainel() {
    const [ dataPatients, setDataPatiens ] = useState<Patient[]>(patients);
   

    function filterByCategory(category: string) {
        if (!dataPatients) {
            return 0;
        }
        
        // Usando filter e retornando o comprimento
        return dataPatients.filter(p => p.manchester_priority === category).length;
    }

    return (
        <>
        <Header />

        <section className="container-recents">
            <h1>Últimas Chamadas</h1>
            
            <div className="container-recents-cards">
                {patients.map(p => (
                    <CardRecents patient={p} />
                ))}
            </div>
        </section>


        <section className="container-manch">
            <h1>Classificação de Risco</h1>

            <div className="container-manch-cards">
                <CardManchester 
                    category="Não Urgente"
                    color="Azul"
                    qtd={filterByCategory('Azul')}
                    time="240 Minutos"
                />

                <CardManchester 
                    category="Pouco Urgente"
                    color="Verde"
                    qtd={filterByCategory('Verde')}
                    time="120 Minutos"
                />

                <CardManchester 
                    category="Urgente"
                    color="Amarelo"
                    qtd={filterByCategory('Amarelo')}
                    time="60 Minutos"
                />

                <CardManchester 
                    category="Muito Urgente"
                    color="Laranja"
                    qtd={filterByCategory('Laranja')}
                    time="10 Minutos"
                />

                <CardManchester 
                    category="Emergência"
                    color="Vermelho"
                    qtd={filterByCategory('Vermelho')}
                    time="Imediato"
                />
            </div>

            
        </section>
        </>
    )
}