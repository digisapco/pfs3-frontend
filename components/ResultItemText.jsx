import Search from '../styles/search.module.scss';
import Link from 'next/link';

var slugify = require('slugify');

const ResultItemText = ( props ) => {

    var item = props.item;
    var slugCity = (item.address.city!==null) ? slugify(item.address.city) : slugify('Otra ciudad');
    slugCity = slugCity.toLowerCase() + '-ci';

    var slugCond = '';
    switch(item.property.type) {
        case 'RES': 
        default: slugCond = 'comprar'; break;
        case 'RNT': slugCond = 'rentar'; break;
    }

    var classSelected = '';
    switch(props.section) {
        case 'map': classSelected = Search.item_in_map; break;
        case 'related': classSelected = Search.item_related; break;
        default: classSelected = Search.result_item;
    }

    var typeProp_relTxt = 'Propiedad';
    if(item.property.subTypeText!=='') {
        switch(item.property.subTypeText) {
            case 'SingleFamilyResidence':
            case 'Single Family Residence': typeProp_relTxt = 'Casa'; break;
            case 'Condominium': typeProp_relTxt = 'Condominio'; break;
            case 'Dockominium': typeProp_relTxt = 'Condominio muelle'; break;
            case 'Efficiency': typeProp_relTxt = 'Apartamento Eficiencia'; break; 
            case 'Mobile Home': typeProp_relTxt = 'Casa móvil'; break;
            case 'Multi Family': typeProp_relTxt = 'Multifamiliar'; break;
            case 'Residential': typeProp_relTxt = 'Residencial'; break;
            case 'Stock Cooperative': typeProp_relTxt = 'Cooperativa de Acciones'; break;
            default: typeProp_relTxt = 'Propiedad'; break;
        }
    }

    return (
        <>
            <h6>
                <Link href={`/casas-y-apartamentos/${slugCond}/${slugCity}/${item.slug}`} target="_blank">
                    {`${typeProp_relTxt}`} en {`${item.address.full}`}
                </Link>
            </h6>
            <p>
                <span>
                    Precio: {
                        new Intl.NumberFormat('es-US', { 
                            style: 'currency', 
                            currency: 'USD',
                            minimumFractionDigits: 0
                        }).format(item.listPrice)
                    } 
                </span> <span>
                    Habitaciones: {item.property.bedrooms} 
                </span> <span>
                    Baños: {item.property.bathsFull}
                </span> <span>Inmueble MLS: {item.mlsId}</span>
            </p>
        </>
    )
}

export default ResultItemText;