import './CardManchester.css'

export default function CardManchester() {
    return (
        <section className='Card-manchester'>

            {/* Barra de cor (você coloca a cor via lógica depois) */}
            <div className="card-header">
                <div className="color-bar"></div>
            </div>

            <div className="card-body">
                <h1>Categoria</h1>
                <h2>cor categoria</h2>

                <div className='container-details'>
                    <label>Aguardando</label>
                    <span>2 pacientes</span>
                </div>

                <div className='container-details'>
                    <label>Tempo médio</label>
                    <span>5 min</span>
                </div>
            </div>

            
        </section>
    )
}