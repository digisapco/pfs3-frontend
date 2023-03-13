import { FaSearch, FaHome } from 'react-icons/fa';
import HomeSearchInput from "./HomeSearchInput";
import HomeStyle from '../styles/home.module.scss';
import HomeSearchDropdown from './HomeSearchDropdown';

const HomeSearchBox = ( props ) => {

    const handleSelectValue = (event) => {
        document.getElementById(event.target.name).value = event.target.value;
    }

    const handleSubmitHomeForm = (event) => {
        event.preventDefault();

        var url = '';
        switch(document.getElementById('cond').value) {
            case 'buy': url+= '/casas-y-apartamentos/comprar'; break;
            case 'rent': url+= '/casas-y-apartamentos/rentar'; break;
            case 'sold': url+= '/casas-y-apartamentos/rentar'; break;
            case 'project': url+= '/proyectos-preconstruccion'; break;
        }

        if(document.getElementById('ci').value !== '') {
            url+= '/ciudad/' + document.getElementById('ci').value;
        }

        if(document.getElementById('co').value !== '') {
            url+= '/condado/' + document.getElementById('co').value;
        }

        if(document.getElementById('zc').value !== '') {
            url+= '/codigo-postal/' + document.getElementById('zc').value;
        }

        if(document.getElementById('st').value !== '') {
            if(
                document.getElementById('ci').value!=='' ||
                document.getElementById('co').value!=='' ||
                document.getElementById('zc').value!==''
            ) {
                url+= '/' + document.getElementById('st').value.toLowerCase() + '-st';
            } else {
                url+= '/tipo-de-vivienda/' + document.getElementById('st').value.toLowerCase();
            }
        }

        console.log(url);

        props.router.push(url);

    }

    return (
        <form action="/" onSubmit={handleSubmitHomeForm}>
            <input type="hidden" id="cond" value="buy" />
            <input type="hidden" id="ci" />
            <input type="hidden" id="co" />
            <input type="hidden" id="zc" />
            <div className={HomeStyle.search_box_fields}>
                <div className={HomeStyle.search_cond_tabs}>
                    <div data-cond="prebuild" className={HomeStyle.selected_cond}><span>Nuevos</span></div>
                    <div data-cond="used"><span>Usados</span></div>
                    <div data-cond="rent"><span>Rentar</span></div>
                </div>
                <div>
                    <select className={HomeStyle.sel_cond} onChange={handleSelectValue} name="cond">
                        {
                            props.conds.map(item => (
                                <option value={item.value}>{item.name}</option>
                            ))
                        }
                    </select>
                    <select className={HomeStyle.sel_st} id="st">
                        {
                            props.subtypes.map(item => (
                                <option value={item.st_value}>{item.st_label}</option>
                            ))
                        }
                    </select>
                    <HomeSearchInput router={props.router} />
                    <button className={HomeStyle.button_search}>
                        Buscar <FaSearch />
                    </button>
                </div>
            </div>
        </form>
    )

}

export default HomeSearchBox;