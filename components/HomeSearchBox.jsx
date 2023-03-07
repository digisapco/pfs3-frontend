import { FaSearch, FaHome } from 'react-icons/fa';
import HomeSearchInput from "./HomeSearchInput";
import HomeStyle from '../styles/home.module.scss';
import HomeSearchDropdown from './HomeSearchDropdown';

const HomeSearchBox = () => {

    return (
        <form action="/casas-y-apartamentos/">
            <div className={HomeStyle.search_box_fields}>
                <div className={HomeStyle.search_cond_tabs}>
                    <div data-cond="prebuild" className={HomeStyle.selected_cond}><span>Nuevos</span></div>
                    <div data-cond="used"><span>Usados</span></div>
                    <div data-cond="rent"><span>Rentar</span></div>
                </div>
                <div>
                    <select className={HomeStyle.sel_cond}>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                    </select>
                    <select>
                        <option value="">Option 1</option>
                        <option value="">Option 2</option>
                        <option value="">Option 3</option>
                    </select>
                    <HomeSearchInput />
                    <button className={HomeStyle.button_search}>
                        Buscar <FaSearch />
                    </button>
                </div>
            </div>
        </form>
    )

}

export default HomeSearchBox;