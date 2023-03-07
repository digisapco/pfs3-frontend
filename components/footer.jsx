import foo from '../styles/footer.module.scss';
import FooterTogglerSection from './FooterTogglerSection';
import { 
    FaPhone, FaChevronRight, FaChevronDown, FaEnvelope, FaWhatsapp,
    FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin, FaLink
} from 'react-icons/fa';

import Link from 'next/link';
import FooterFrequentSearches from './FooterFrequentSearches';

const links = [
    {
        label : 'Blog',
        route : '/blog',
        blank : true
    },
    {
        label : 'Términos y condiciones',
        route : '/pfs/terminos-y-condiciones',
        blank : false
    },
    {
        label : 'Quiénes somos',
        route : '/pfs/quienes-somos',
        blank : false
    },
    {
        label : 'Intranet',
        route : 'https://sites.google.com/a/pfsrealty.com/intranet-pfsrealty/',
        blank : true
    },
    {
        label : 'Login',
        route : '/login',
        blank : false
    },
];

const linksCity = [
    {
        "label" : "Miami",
        "url" : "/casas-y-apartamentos/comprar/ciudad/miami"
    },
    {
        "label" : "Doral",
        "url" : "/casas-y-apartamentos/comprar/ciudad/doral"
    },
    {
        "label" : "Weston",
        "url" : "/casas-y-apartamentos/comprar/ciudad/weston"
    },
    {
        "label" : "Pembroke Pines",
        "url" : "/casas-y-apartamentos/comprar/ciudad/pembroke-pines"
    },
    {
        "label" : "Coral Gables",
        "url" : "/casas-y-apartamentos/comprar/ciudad/coral-gables"
    },
];

const linksPostalCodes = [
    {
        "label" : "33032",
        "url" : "/casas-y-apartamentos/comprar/codigo-postal/33032"
    },
    {
        "label" : "33165",
        "url" : "/casas-y-apartamentos/comprar/codigo-postal/33165"
    },
    {
        "label" : "33182",
        "url" : "/casas-y-apartamentos/comprar/codigo-postal/33182"
    },
    {
        "label" : "33010",
        "url" : "/casas-y-apartamentos/comprar/codigo-postal/33010"
    },
    {
        "label" : "33309",
        "url" : "/casas-y-apartamentos/comprar/codigo-postal/33309"
    },
];

const linksBuildingTypes = [
    {
        "url" : "/casas-y-apartamentos/comprar/tipo-de-vivienda/apartment",
        "label" : "Apartamentos"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/tipo-de-vivienda/casas",
        "label" : "Casas"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/tipo-de-vivienda/townhouse",
        "label" : "Townhouse"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/tipo-de-vivienda/villa",
        "label" : "Villa"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/tipo-de-vivienda/stock-cooperative",
        "label" : "Stock Cooperative"
    }
];

const linksCounties = [
    {
        "url" : "/casas-y-apartamentos/comprar/condado/miami-dade",
        "label" : "Miami Dade"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/condado/broward",
        "label" : "Broward"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/condado/palm-beach",
        "label" : "Palm Beach"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/condado/monroe",
        "label" : "Monroe"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/condado/st-lucie",
        "label" : "St Lucie"
    },
];

const linksProjects = [
    {
        "url" : "/proyectos-preconstruccion/north-miami-beach-zn/one-park-tower",
        "label" : "One Park Tower"
    },
    {
        "url" : "/proyectos-preconstruccion/homestead-zn/the-riviera-by-lennar",
        "label" : "The Riviera by Lennar"
    },
    {
        "url" : "/proyectos-preconstruccion/brickell-zn/cipriani",
        "label" : "Cipriani Residences Miami"
    },
    {
        "url" : "/proyectos-preconstruccion/brickell-zn/smart-brickell",
        "label" : "Smart Brickell"
    },
    {
        "url" : "/proyectos-preconstruccion/bal-harbour-zn/oceana-bal-harbour",
        "label" : "Oceana - Bal Harbour"
    },
];

const linksPriceSale = [
    {
        "url" : "/casas-y-apartamentos/comprar/300000p-pr",
        "label" : "$300.000"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/500000p-pr",
        "label" : "$500.000"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/650000p-pr",
        "label" : "$650.000"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/800000p-pr",
        "label" : "$800.000"
    },
    {
        "url" : "/casas-y-apartamentos/comprar/100000p-pr",
        "label" : "$100.000"
    },
];

const linksPriceRent = [
    {
        "url" : "/casas-y-apartamentos/rentar/900p-pr",
        "label" : "$900"
    },
    {
        "url" : "/casas-y-apartamentos/rentar/1000p-pr",
        "label" : "$900"
    },
    {
        "url" : "/casas-y-apartamentos/rentar/2000p-pr",
        "label" : "$2.000"
    },
    {
        "url" : "/casas-y-apartamentos/rentar/5000p-pr",
        "label" : "$5.000"
    },
    {
        "url" : "/casas-y-apartamentos/rentar/10000p-pr",
        "label" : "$10.000"
    },
];

const currentYear = new Date().getFullYear();

const Footer = () => {
    return (
        <>
            <footer className={foo.main_footer}>
                <div className={foo.widgets}>
                    <h5>Encuentre más propiedades por ciudades y códigos postales</h5>
                    <div className={foo.widget_footer_rel}>
                        <FooterTogglerSection title="Ciudad" dataSource={linksCity} promptTitle="Otras ciudades" fieldName="ci" />
                        <FooterTogglerSection title="Códigos postales" dataSource={linksPostalCodes} promptTitle="Otros códigos" fieldName="zc" />
                        <FooterTogglerSection title="Tipos de vivienda" dataSource={linksBuildingTypes} promptTitle="Otros tipos" fieldName="st" />
                        <FooterTogglerSection title="Condado" dataSource={linksCounties} promptTitle="Otros condados" fieldName="co" />
                    </div>
                    <div className={foo.widget_footer_rel}>
                        <FooterTogglerSection title="Preconstrucciones" dataSource={linksProjects} promptTitle="Otras preconstrucciones" fieldName="mnp" />
                        <FooterTogglerSection title="Precio de venta" dataSource={linksPriceSale} promptTitle="Otros precios" fieldName="spr" />
                        <FooterTogglerSection title="Precio de renta" dataSource={linksPriceRent} promptTitle="Otros precios" fieldName="rpr" />
                    </div>
                    <div className={foo.widget_mortgage}>
                        <Link href="#">
                            <h6>
                                Calculadora hipotecaria
                                <span>
                                    <FaChevronRight />
                                </span>
                            </h6>
                        </Link>
                    </div>

                    <div className={foo.widget_frequent}>
                        <FooterFrequentSearches />
                    </div>
                </div>
                <div className={foo.footer}>
                    <div className={foo.footer_col1}>
                        <picture className={foo.pfs_logo}>
                            <source srcSet="/img/pfs-logo-footer.webp" type="image/webp" />
                            <source srcSet="/img/pfs-logo-footer.png" type="image/png" />
                            <img src="/img/pfs-logo-footer.png" alt="PFS Realty" />
                        </picture>
                        <div className={foo.social}>
                            <a href="https://www.facebook.com/PFSRealtyGroup/" target="_blank" rel="noreferrer noopener nofollow" className="facebook" aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <a href="https://www.instagram.com/pfsrealtygroup/" target="_blank" rel="noreferrer noopener nofollow" className="instagram" aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://twitter.com/PFS_REALTY" target="_blank" rel="noreferrer noopener nofollow" className="twitter" aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://www.youtube.com/channel/UClwKfmqfBZbScqrxzPg8Tyg/" target="_blank" rel="noreferrer noopener nofollow" className="youtube" aria-label="Youtube">
                                <FaYoutube />
                            </a>
                            <a href="https://www.linkedin.com/company/pfs-realty" target="_blank" rel="noreferrer noopener nofollow" className="linkedin" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a target="_blank" rel="noreferrer nofollow" href="https://api.whatsapp.com/send?phone=19545369851&amp;text=Hola, Quiero invertir en Miami" className="whatsapp" aria-label="WhatsApp">
                                <FaWhatsapp />
                            </a>
                        </div>
                    </div>
                    <div className={foo.footer_col2}>
                        <div className="row">
                            <div className="col-md-6 col-sm-12 mb-3">
                                <h6>HEADQUARTERS USA</h6>
                                <div>
                                    <p>2665 Executive Park Dr Suite #2 Weston, Fl. 33331</p>
                                    <p><FaPhone /> <a href="tel:+19542171791" className="d-inline">+1 954-217-1791</a></p>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <h6>NUESTRAS OFICINAS</h6>
                                <p>MEXICO · COLOMBIA · ARGENTINA · ESPAÑA · VENEZUELA · ECUADOR · CHILE · PERÚ · CANADÁ · PORTUGAL</p>
                                <a href="mailto:info@pfsrealty.com"><i className="fa fa-envelope"></i> info@pfsrealty.com</a>
                            </div>
                        </div>
                    </div>
                    <div className={foo.footer_col3}>
                        <h6>DE INTERÉS</h6>
                        <ul>
                            {
                                links.map(({label, route, blank}, index) => (
                                    <li key={index}>
                                        <a href={route} target="_blank" rel="noreferrer">
                                            <span>{label}</span>
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </footer>
            <div className={foo.contact_widgets}>
                <div>
                    <a href="#" className={foo.cw_envelope}>
                        <FaEnvelope />
                    </a>
                    <a href="#" className={foo.cw_whatsapp}>
                        <FaWhatsapp />
                    </a>
                    <a href="#" className={foo.cw_phone}>
                        <FaPhone />
                    </a>
                </div>
            </div>
            <div className={foo.bottom_bar}>
                Copyright &copy; {currentYear} PFS Realty Group All rights reserved.
            </div>
            <div className={foo.partner_logos}>
                <picture>
                    <source srcSet="/img/logo-avanti.png.webp" type="image/webp" />
                    <source srcSet="/img/logo-avanti.png" type="image/png" />
                    <img src="/img/logo-avanti.png" alt="Avanti Lending" />
                </picture>
                <picture>
                    <source srcSet="/img/logo-avanti-managment.png.webp" type="image/webp" />
                    <source srcSet="/img/logo-avanti-managment.png" type="image/png" />
                    <img src="/img/logo-avanti-managment.png" alt="Avanti Lending" />
                </picture>
                <picture>
                    <source srcSet="/img/logo-cnn.png.webp" type="image/webp" />
                    <source srcSet="/img/logo-cnn.png" type="image/png" />
                    <img src="/img/logo-cnn.png" alt="CNN" />
                </picture>
                <picture>
                    <source srcSet="/img/logo-ntn24.png.webp" type="image/webp" />
                    <source srcSet="/img/logo-ntn24.png" type="image/png" />
                    <img src="/img/logo-ntn24.png" alt="NTN24" />
                </picture>
                <picture>
                    <source srcSet="/img/logo-mls.png.webp" type="image/webp" />
                    <source srcSet="/img/logo-mls.png" type="image/png" />
                    <img src="/img/logo-mls.png" alt="MLS" />
                </picture>
            </div>
        </>
    )
}

export default Footer;