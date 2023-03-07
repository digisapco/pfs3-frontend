'use client'
import { FaSearch } from 'react-icons/fa';

const HeaderSecondarySearch = (props) => {
    return (
        <>
            <form>
                <input type="text" placeholder="Buscar" />
                <button type="button">
                    <FaSearch />
                </button>
                <input type="hidden" name="ci" value={props.ci} />
                <input type="hidden" name="co" value={props.co} />
                <input type="hidden" name="zc" value={props.zc} />
                <input type="hidden" name="zn" value={props.zn} />
                <input type="hidden" name="bd" value={props.bd} />
                <input type="hidden" name="bt" value={props.bt} />
                <input type="hidden" name="pr" value={props.pr} />
                <input type="hidden" name="sf" value={props.sf} />
                <input type="hidden" name="yr" value={props.yr} />
                <input type="hidden" name="pg" value={props.pg} />
            </form>
        </>
    )
}

export default HeaderSecondarySearch;