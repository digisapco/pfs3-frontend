import { Inter } from "next/font/google";
import HomeStyle from '../styles/home.module.scss';
import PropertiesPerCity from '../components/PropertiesPerCity';
import HomeSearchBox from '../components/HomeSearchBox';
import HomeUsedProperties from '../components/HomeUsedProperties';
import HomeUpcomingEvents from '../components/HomeUpcomingEvents';
import HomeBlog from '../components/HomeBlog';
import Header from '../components/header';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Header home={true} />
            <div className={HomeStyle.search_box}>
                <h1>Con <strong>PFS Realty</strong> es más facil</h1>
                <HomeSearchBox />
            </div>
            <div className={HomeStyle.properties}>
                <h2>Encuentra tu propiedad en Miami</h2>
                <div>Contamos con cientos de propiedades para usted, tales como casas, departamentos, oficinas y mucho más.</div>
                <h3>Explorar propiedades</h3>
                <PropertiesPerCity />
            </div>
            <div className={HomeStyle.services}>
                <h2>Nuestros servicios</h2>
                <div>
                <img src='/img/pfs-home-services.svg' className={HomeStyle.services_img} />
                </div>
            </div>
            <div className={HomeStyle.outstand_props}>
                <h3>Viviendas usadas</h3>
                <HomeUsedProperties />
                <h3>Proyectos destacados</h3>
                <HomeUsedProperties />
            </div>
            <div className={HomeStyle.upcoming_events}>
                <h3>Próximos eventos</h3>
                <HomeUpcomingEvents />
            </div>
            <div className={HomeStyle.blog}>
                <h3>Noticias Recientes</h3>
                <HomeBlog />
            </div>
        </>
    )
}
