import "../styles/home.module.scss";
import HomeStyles from '../styles/home.module.scss';
import { FaArrowRight } from 'react-icons/fa';

const cities = [
    {
        "name": "Miami",
        "slug": "miami"
    },
    {
        "name": "Orlando",
        "slug": "orlando"
    },
    {
        "name": "Tampa",
        "slug": "tampa"
    },
    {
        "name": "Tallahassee",
        "slug": "tallahassee"
    },
    {
        "name": "Jacksonville",
        "slug": "jacksonville"
    }
];

const PropertiesPerCity = () => {
    return (
        <div className={HomeStyles.properties_city}>
            {
                cities.map((item, index) => (
                    <div className={HomeStyles.property_city} key={index}>
                        <a href={item.slug}>
                            <div className={HomeStyles.property_city_name}>
                                <h4>{item.name}</h4>
                                <span>
                                    Ver propiedad 
                                    <FaArrowRight />
                                </span>
                            </div>
                        </a>
                    </div>
                ))
            }
        </div>
    );
}
export default PropertiesPerCity;