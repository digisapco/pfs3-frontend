'use client';
import React from 'react';
import SearchStyle from '../styles/search.module.scss';

const SearchFilterDropdown = (props) => {

    const [open, setOpen] = React.useState(false);
    const [menu, setMenu] = React.useState(props.data);
    const handleOpen = () => {
        setOpen(!open);
    };
    const handleSetInputValue = (name, value) => {
        console.log(name, value);
    }

    var defaultValue = '';
    var defaultValueNoNull = 0;
    switch(props.name) {
        case 'cond':
            switch(props.defaultValue) {
                case 'buy': default: defaultValue = 'Comprar'; defaultValueNoNull=1; break;
                case 'rent': defaultValue = 'Rentar'; defaultValueNoNull=1; break;
                case 'sold': defaultValue = 'Vendido'; defaultValueNoNull=1; break;
            }
        break;
        case 'st':
            defaultValueNoNull = 0;
            defaultValue = 'Tipo de inmueble';
        break;
        case 'pr':
            defaultValueNoNull = 0;
            defaultValue = 'Precio';
        break;
        case 'bd':
            defaultValueNoNull = 0;
            defaultValue = 'Habitaciones';
        break;
    }

    return (
        <div className={
            [
                SearchStyle.filter_control,
                SearchStyle.filter_horizontal
            ].join(' ')
        }>
            <div onClick={handleOpen} className={
                open ? SearchStyle.opened : ''
            }>
                {
                    defaultValueNoNull == 1 ? (
                        <span></span>
                    ) : null
                }
                {defaultValue}
            </div>
            <div className={
                open ? SearchStyle.shown : ''
            }>
                {
                    props.name == 'cond' ? (
                        <ul className={SearchStyle.search_cond}>
                            <li data-value="buy" onClick={handleSetInputValue} className={
                                props.defaultValue == 'buy' ? SearchStyle.seach_cond_selected : ''
                            }>Comprar</li>
                            <li data-value="rent" onClick={handleSetInputValue} className={
                                props.defaultValue == 'rent' ? SearchStyle.seach_cond_selected : ''
                            }>Rentar</li>
                            <li data-value="sold" onClick={handleSetInputValue} className={
                                props.defaultValue == 'sold' ? SearchStyle.seach_cond_selected : ''
                            }>Vendido</li>
                        </ul>
                    ) : null
                }

                {
                    props.name == 'st' ? (
                        <div>
                            <label>
                                <input name="subtype" type="radio" value="-all" onChange={handleSetInputValue} checked="checked" className="form-check-input" /> Todas
                            </label>
                            <label>
                                <input name="subtype" type="radio" value="Apartment" onChange={handleSetInputValue} className="form-check-input" /> Apartamentos
                            </label>
                            <label>
                                <input name="subtype" type="radio" value="Casas" onChange={handleSetInputValue} className="form-check-input" /> Casas
                            </label>
                            <label>
                                <input name="subtype" type="radio" value="Townhouse" onChange={handleSetInputValue} className="form-check-input" /> Townhouse
                            </label> 
                            <label>
                                <input name="subtype" type="radio" value="other" onChange={handleSetInputValue} className="form-check-input" /> Otros
                            </label>
                        </div>
                    ) : null
                }
                {
                    props.name == 'pr' ? (
                        <div>
                            <label>Rango de precios</label>

                            <select name="price_min" onChange={handleSetInputValue}>
                                <option value="">No mín.</option>
                                <option value="100000">$100K</option>
                                <option value="200000">$200K</option>
                                <option value="250000">$250K</option>
                                <option value="300000">$300K</option>
                                <option value="350000">$350K</option>
                                <option value="400000">$400K</option>
                                <option value="450000">$450K</option>
                                <option value="500000">$500K</option>
                                <option value="550000">$550K</option>
                                <option value="600000">$600K</option>
                                <option value="650000">$650K</option>
                                <option value="700000">$700K</option>
                                <option value="750000">$750K</option>
                                <option value="800000">$800K</option>
                                <option value="850000">$850K</option>
                                <option value="900000">$900K</option>
                                <option value="950000">$950K</option>
                                <option value="1000000">$1.0M</option>
                                <option value="1100000">$1.1M</option>
                                <option value="1200000">$1.2M</option>
                                <option value="1250000">$1.3M</option>
                                <option value="1400000">$1.4M</option>
                                <option value="1500000">$1.5M</option>
                                <option value="1600000">$1.6M</option>
                                <option value="1700000">$1.7M</option>
                                <option value="1750000">$1.8M</option>
                                <option value="1800000">$1.8M</option>
                                <option value="1900000">$1.9M</option>
                                <option value="2000000">$2.0M</option>
                                <option value="2250000">$2.3M</option>
                                <option value="2500000">$2.5M</option>
                                <option value="2750000">$2.8M</option>
                                <option value="3000000">$3.0M</option>
                                <option value="3500000">$3.5M</option>
                                <option value="4000000">$4.0M</option>
                                <option value="5000000">$5.0M</option>
                                <option value="10000000">$10.0M</option>
                                <option value="20000000">$20.0M</option>
                                <option value="30000000">$30.0M</option>
                                <option value="40000000">$40.0M</option>
                                <option value="50000000">$50.0M</option>
                            </select>
                            
                            <select name="price_max" onChange={handleSetInputValue}>
                                <option value="">No máx.</option>
                                <option value="100000">$100K</option>
                                <option value="200000">$200K</option>
                                <option value="250000">$250K</option>
                                <option value="300000">$300K</option>
                                <option value="350000">$350K</option>
                                <option value="400000">$400K</option>
                                <option value="450000">$450K</option>
                                <option value="500000">$500K</option>
                                <option value="550000">$550K</option>
                                <option value="600000">$600K</option>
                                <option value="650000">$650K</option>
                                <option value="700000">$700K</option>
                                <option value="750000">$750K</option>
                                <option value="800000">$800K</option>
                                <option value="850000">$850K</option>
                                <option value="900000">$900K</option>
                                <option value="950000">$950K</option>
                                <option value="1000000">$1.0M</option>
                                <option value="1100000">$1.1M</option>
                                <option value="1200000">$1.2M</option>
                                <option value="1250000">$1.3M</option>
                                <option value="1400000">$1.4M</option>
                                <option value="1500000">$1.5M</option>
                                <option value="1600000">$1.6M</option>
                                <option value="1700000">$1.7M</option>
                                <option value="1750000">$1.8M</option>
                                <option value="1800000">$1.8M</option>
                                <option value="1900000">$1.9M</option>
                                <option value="2000000">$2.0M</option>
                                <option value="2250000">$2.3M</option>
                                <option value="2500000">$2.5M</option>
                                <option value="2750000">$2.8M</option>
                                <option value="3000000">$3.0M</option>
                                <option value="3500000">$3.5M</option>
                                <option value="4000000">$4.0M</option>
                                <option value="5000000">$5.0M</option>
                                <option value="10000000">$10.0M</option>
                                <option value="20000000">$20.0M</option>
                                <option value="30000000">$30.0M</option>
                                <option value="40000000">$40.0M</option>
                                <option value="50000000">$50.0M</option>
                            </select>
                        </div>
                    ) : null
                }

            </div>

        </div>
    )
}

export default SearchFilterDropdown;