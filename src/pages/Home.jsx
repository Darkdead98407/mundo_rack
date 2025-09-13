export default function Home() {
    return (
        <section className="hero">
            <video autoPlay loop muted className="hero-video">
                <source src="/fondo.mp4"  type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>

            <div className="hero-content">
                <h1>
                    Equipos de Exhibicion <span> Para Tu Tienda</span>
                </h1>
                <p>
                    Percheros, ganchos, espejos y más. Todo lo que necesitas para destacar tus productos. 
                </p>
                <div className="hero-buttons">
                    <button className="btn-primary">Ver Productos</button>
                    <button className="btn-secondary">Contáctanos</button>
                </div>
            </div>
        </section>
    )
}