'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import foo from '../styles/footer.module.scss';

const FooterTogglerSection = ( {title, dataSource, promptTitle, fieldName} ) => {

    const [isShown, setIsShown] = useState(false);
    const { height, width } = useWindowSize();

    const handleClick = event => {
        if(width < 768) {
            setIsShown(current => !current);
        }
    };

    return (
        <div>
            <Link href="#" className={
                [
                    foo.section_container_link,
                    isShown && foo.up
                ].join(' ')
                } rel="noindex" onClick={handleClick}>
                <h6>
                    { title }
                    <span>
                        <FaChevronDown />
                    </span>
                </h6>
            </Link>

            <div className={[
                foo.section_container,
                isShown && foo.visible].join(' ')
            }>
                {
                    dataSource.map( (item, index) => (
                            <a key={index} target="_blank" rel="noreferrer" href={item.url}>{item.label}</a>
                        )
                    )
                }

                <select className="pfs-tab-selection" name={fieldName}>
                    <option value="" key="0">{promptTitle}</option>
                    {
                        /* values */
                    }
                    <option value="_all" key="_all">Ver todo</option>
                </select>
            </div>
        </div>
    );
}

// Hook
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export default FooterTogglerSection;