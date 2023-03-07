"use client"
import { FaBuilding, FaChevronDown, FaHome, FaPlus } from 'react-icons/fa';
import { useRef } from 'react';
import HomeStyle from '../styles/home.module.scss';

const HomeSearchDropdown = ( props ) => {

    /*
    const ref = useRef(null);
    const button = ref.current;
    const buttonRect = button.getBoundingClientRect();
    const chevron = document.getElementById(HomeStyle.dropdown_chevron);
    const chevronRect = chevron.getBoundingClientRect();
    const menuRight = buttonRect.right - chevronRect.right;
    const menuTop = chevronRect.top - buttonRect.top;

    const menu = document.getElementById(HomeStyle.dropdown_menu);
    menu.style.top = `${menuTop}px`;
    menu.style.right = `${menuRight}px`;

    const handleToggleDropdown = () => {
        const dropdown = document.getElementById(HomeStyle.dropdown);

        if(dropdown.classList.contains(HomeStyle.open)) {
            menu.style.top = `${menuTop}px`;
            menu.style.right = `${menuRight}px`;
        } else {
            menu.style.top = `${button.clientHeight + 10}px`;
            menu.style.right = 0;
        }

        dropdown.classList.toggle(HomeStyle.open);
    }
    */

    return (
        <div className={
            [
                HomeStyle.dropdown,
                props.name == 'cond' ? HomeStyle.sel_cond : ''
            ].join(' ')
        } id={props.name}>
            <button type="button">
                {props.label}
                <span id="dropdown_chevron" className={HomeStyle.dropdown_chevron}>
                    <FaChevronDown />
                </span>
                <span>
                    {props.icon}
                </span>
            </button>
            <div id={HomeStyle.dropdown_menu} className={HomeStyle.dropdown_menu}>
                <button key={0}>
                    <span>
                        <FaBuilding />
                    </span>
                    Apartamentos
                </button>
                <button key={1}>
                    <span>
                        <FaHome />
                    </span>
                    Casas
                </button>
                <button key={2}>
                    <span>
                        <FaHome />
                    </span>
                    Townhouses
                </button>
                <button key={3}>
                    <span>
                        <FaPlus />
                    </span>
                    Otros
                </button>
            </div>
        </div>
    )
}

export default HomeSearchDropdown;