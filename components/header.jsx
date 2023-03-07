import Image from 'next/image';
import {BiUserCircle} from 'react-icons/bi';
import HeaderStyle from '../styles/header.module.scss';
//import SearchFormHeader from './styles/search_form_header';
import Link from 'next/link';
import {FaChartBar, FaSuitcaseRolling, FaHeart, FaNewspaper, FaHouseUser, FaDollarSign, FaProjectDiagram, FaRegHandshake, FaUsers, FaPhoneAlt, FaRegUserCircle} from 'react-icons/fa';
import HeaderMenu from '../components/HeaderMenu';

const links = [
    {
        label : 'Inversión',
        route : '#',
        icon : <FaChartBar />
    },
    {
        label : 'Turismo en Miami',
        route : '#',
        icon : <FaSuitcaseRolling />
    },
    {
        label : 'Calidad de vida',
        route : '#',
        icon : <FaHeart />
    },
    {
        label : 'Actualidad',
        route : '#',
        icon : <FaNewspaper />
    },
    {
        label : 'Propiedades',
        route : '#',
        icon : <FaHouseUser />
    },
    {
        label : 'Financiaminto',
        route : '#',
        icon : <FaDollarSign/>
    },
    {
        label : 'Renta en Dólares',
        route : '#',
        icon : <FaDollarSign/>
    },
    {
        label : 'Admón. de propiedades',
        route : '#',
        icon : <FaProjectDiagram />
    },
    {
        label : 'Servicios',
        route : '#',
        icon : <FaRegHandshake />
    },
    {
        label : 'Nosotros',
        route : '#',
        icon : <FaUsers />
    },
    {
        label : 'Contáctenos',
        route : '#',
        icon : <FaPhoneAlt />
    }
];

const Header = ( props ) => {
    return (
        <>
            <navbar className={
                [
                    HeaderStyle.navbar,
                    HeaderStyle.in_home
                ].join(" ")
            }>
                <div className={HeaderStyle.nav_menu}>
                    <HeaderMenu />
                    <ul className={HeaderStyle.list}>
                        {links.map(({label, route, icon}) => (
                            <li key={label}>
                                <Link href={route}>
                                    {icon} 
                                    {label}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="#" className="header-login-btn">
                                Iniciar sesión / Crear cuenta 
                                <FaRegUserCircle />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={HeaderStyle.logo}>
                    <picture>
                        <source media="(min-width:650px)" srcSet="/img/pfs-logo-dark.webp" type="image/webp" />
                        <source media="(min-width:465px)" srcSet="/img/pfs-logo-dark.jpg" type="image/jpg" />
                        <img src="/img/pfs-logo-dark.jpg" alt="PFS Realty" />
                    </picture>
                </div>

                { /*<SearchFormHeader visible={visibleSearch} />*/ }
                <div className={HeaderStyle.user}>
                    <a href="#" className={HeaderStyle.language_sel}>EN</a>
                    <a href="#" className={HeaderStyle.user_icon}>
                        <BiUserCircle />
                    </a>
                </div>
            </navbar>
        </>
    );
}

export default Header;