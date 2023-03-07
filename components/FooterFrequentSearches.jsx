'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import foo from '../styles/footer.module.scss';

const FooterFrequentSearches = () => {

    const [isShown, setIsShown] = useState(false);
    const handleClick = event => {
        setIsShown(current => !current);
    };

    return (
        <>
            <div className={
                [
                    foo.widget_frequent_title,
                    isShown ? foo.up : ''
                ].join(' ')
            }>
                <Link href="#" onClick={handleClick}>
                    <h6>
                        Búsquedas más frecuentes
                        <span>
                            <FaChevronDown />
                        </span>
                    </h6>
                </Link>
            </div>

            <div className={[
                foo.widget_frequent_base,
                isShown ? foo.visible : ''
            ].join(' ')}>
                <div className={foo.widget_frequent_columns}>
                    <div className={foo.column}>
                        <a href="/casas-y-apartamentos/comprar/ciudad/aventura/apartment-st">Apartamentos en venta en Aventura</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/brickell/apartment-st">Apartamentos en venta en Brickell</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/coconut-grove/apartment-st">Apartamentos en venta en Coconut Grove</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/coral-gables/apartment-st">Apartamentos en venta en Coral Gables</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/coral-springs/apartment-st">Apartamentos en venta en Coral Springs</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/doral/apartment-st">Apartamentos en venta en Doral</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/downtown-miami/apartment-st">Apartamentos en venta en Downtown Miami</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/fort-lauderdale/apartment-st">Apartamentos en venta en Fort Lauderdale</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/key-biscayne/apartment-st">Apartamentos en venta en Key Biscayne</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/miami-beach/apartment-st">Apartamentos en venta en Miami Beach</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/miramar/apartment-st">Apartamentos en venta en Miramar</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/plantation/apartment-st">Apartamentos en venta en Plantation</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/pembroke-pines/apartment-st">Apartamentos en venta en Pembroke Pines</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/sunny-isles/apartment-st">Apartamentos en venta en Sunny Isles</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/weston/apartment-st">Apartamentos en venta en Weston</a>
                    </div>
                    <div className={foo.column}>
                        <a href="/casas-y-apartamentos/comprar/ciudad/aventura/casas-st">Casas en Venta en Aventura</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/coral-gables/casas-st">Casas en Venta en Coral Gables</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/miami-beach/casas-st">Casas en Venta en Miami Beach</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/coconut-grove/casas-st">Casas en Venta en Coconut Grove</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/fort-laudardale/casas-st">Casas en Venta en Fort Lauderdale</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/key-biscayne/casas-st">Casas en Venta en Key Biscayne</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/sunny-isles/casas-st">Casas en Venta en Sunny Isles</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/weston/casas-st">Casas en Venta en Weston</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/doral/casas-st">Casas en Venta en Doral</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/coral-springs/casas-st">Casas en Venta en Coral Springs</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/plantation/casas-st">Casas en Venta en Plantation</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/sunrise/casas-st">Casas en Venta en Sunrise</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/pembroke-pines/casas-st">Casas en Venta en Pembroke Pines</a>
                        <a href="/casas-y-apartamentos/comprar/ciudad/miramar/casas-st">Casas en Venta en Miramar</a>
                    </div>
                    <div className={foo.column}>
                        <a href="/proyectos-preconstruccion/downtown-miami-zn/the-crosby">The Crosby</a>
                        <a href="/proyectos-preconstruccion/midtown-miami-zn/the-standard-residences">The Standard</a>
                        <a href="/proyectos-preconstruccion/edgewater-zn/aria-reserve">Aria Reserve</a>
                        <a href="/proyectos-preconstruccion/brickell-zn/baccarat">Baccarat</a>
                        <a href="/proyectos-preconstruccion/brickell-zn/smart-brickell">Smart Brickell</a>
                        <a href="/proyectos-preconstruccion/brickell-zn/lofty">Lofty</a>
                        <a href="/proyectos-preconstruccion/bal-harbour-zn/la-baia">La Baia</a>
                        <a href="/proyectos-preconstruccion/downtown-miami-zn/okan-tower">Okan Tower</a>
                        <a href="/proyectos-preconstruccion/orlando-zn/the-grove-resort-water-park">The Grove</a>
                        <a href="/proyectos-preconstruccion/orlando-zn/the-terraces-at-the-grove-resort">Terraces</a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default FooterFrequentSearches;