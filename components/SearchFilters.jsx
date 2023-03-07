import SearchStyle from '../styles/search.module.scss';
import SearchFilterDropdown from './SearchFilterDropdown';

const SearchFilter = (props) => {
    return (
        <>
            <div className={[
                SearchStyle.filter_controls,
                (!props.show_keep) ? SearchStyle.filter_center_box : ''
                ].join(' ')}>
                <div className={SearchStyle.filter_control}>
                    <div>Comprar</div>
                    <ul>
                        <li>Comprar</li>
                        <li>Rentar</li>
                        <li>Vendido</li>
                    </ul>
                </div>
                <div className={[
                    SearchStyle.filter_control,
                    SearchStyle.show_filters
                ].join(' ')}>
                    <div>Filtros</div>
                    <div></div>
                </div>
                
                <SearchFilterDropdown name="st" data={st} />

                <div className={
                    [
                        SearchStyle.filter_control,
                        SearchStyle.filter_horizontal
                    ].join(' ')
                }>
                    <div>Precio</div>
                    <ul className={SearchStyle.range}>
                        <li>
                            <select></select>
                        </li>
                        <li>
                            <select></select>
                        </li>
                    </ul>
                </div>
                <div className={
                    [
                        SearchStyle.filter_control,
                        SearchStyle.filter_horizontal
                    ].join(' ')
                }>
                    <div>Habitaciones</div>
                    <ul className={SearchStyle.bdt}>
                        <li>
                            <input type="radio" name="bd" />
                        </li>
                    </ul>
                </div>
                <div className={
                    [
                        SearchStyle.filter_control,
                        SearchStyle.filter_horizontal
                    ].join(' ')
                }>
                    <div>Más opciones</div>
                    <ul className={SearchStyle.bdt}>
                        <li>
                            <input type="radio" name="bd" />
                        </li>
                    </ul>
                </div>
            </div>
            {
                props.show_keep ? (
                    <div className={SearchStyle.filter_keep}>
                        <a>
                            Guardar búsqueda
                        </a>
                    </div>
                ) : ''
            }
        </>
    )
}

export default SearchFilter;