import './CardManchester.css'


type Props = {
    category: string;
    color: string;
    qtd: number;
    time: string;
}

export default function CardManchester(props: Props) {
    return (
        <section className='Card-manchester'>

            {/* Barra de cor (você coloca a cor via lógica depois) */}
            <div className="card-header">
                <div className="color-bar"></div>
            </div>

            <div className="card-body">
                <h1>{props.category}</h1>
                <h2>{props.color}</h2>

                <div className='container-details'>
                    <label>Aguardando</label>
                    <span>{`${props.qtd} Pacientes`}</span>
                </div>

                <div className='container-details'>
                    <label>Tempo médio</label>
                    <span>{props.time}</span>
                </div>
            </div>

            
        </section>
    )
}