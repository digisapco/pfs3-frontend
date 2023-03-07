import HomeStyles from '../styles/home.module.scss';
import { FiSun, FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { Link } from 'next/link';

const events = [
    {
        "name":"Dia de inversionistas en Bogotá",
        "date":"2022-02-28",
        "time_start":"09:00",
        "time_end":"19:00",
        "place":"Club El Nogal"
    },
    {
        "name":"Dia de inversionistas en Bogotá",
        "date":"2022-02-28",
        "time_start":"09:00",
        "time_end":"19:00",
        "place":"Club El Nogal"
    },
    {
        "name":"Dia de inversionistas en Bogotá",
        "date":"2022-02-28",
        "time_start":"09:00",
        "time_end":"19:00",
        "place":"Club El Nogal"
    },
];
const HomeUpcomingEvents = () => {
    return (
        <div className={HomeStyles.events}>
            {
                events.map((item, index) => (
                    <div className={HomeStyles.event} key={index}>
                        <div className={HomeStyles.event_bg}>
                            <h5>{item.name}</h5>
                            <div>
                                <a>¡Reserva tu cupo!</a>
                            </div>
                        </div>
                        <div className={HomeStyles.event_detail}>
                            <div>
                                <FiSun /> Tema:
                                <span>{item.name}</span>
                            </div>
                            <div>
                                <FiCalendar /> Fecha:
                                <span>{item.date}</span>
                            </div>
                            <div>
                                <FiClock /> Hora:
                                <span>{item.time_start} a {item.time_end}</span>
                            </div>
                            <div>
                                <FiMapPin /> Lugar:
                                <span>{item.place}</span>
                            </div>
                            <div>
                                <a href="#" className={HomeStyles.rsvp_button}>
                                    Reservar entrada 
                                    <FiCalendar />
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default HomeUpcomingEvents;