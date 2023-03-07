"use client"

import HeaderStyle from "../styles/header.module.scss";

const HeaderMenu = () => {

    const handleButtonMenu = () => {
        let pfs_button = document.getElementsByClassName( HeaderStyle.menu_button )[0];
        if(pfs_button.classList.contains( HeaderStyle.button_open )) {
            pfs_button.classList.remove( HeaderStyle.button_open );
        } else {
            pfs_button.classList.add( HeaderStyle.button_open );
        }
    }

    return (
        <>
            <input type="checkbox" id={HeaderStyle.check} />
            <label htmlFor={HeaderStyle.check} className={HeaderStyle.checkBtn}>
                <div className={HeaderStyle.menu_button} onClick={handleButtonMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </label>
        </>
    );
}

export default HeaderMenu;