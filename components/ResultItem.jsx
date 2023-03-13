import { FaHeart, FaBath, FaBed, FaCube } from 'react-icons/fa';
import Search from '../styles/search.module.scss';
import Link from 'next/link';

var slugify = require('slugify');

const ResultItem = ( props ) => {

    var item = props.item;
    var slugCity = (item.address.city!==null) ? slugify(item.address.city) : slugify('Otra ciudad');
    slugCity = slugCity.toLowerCase() + '-ci';

    const cssClassBg = `bld-${item.mlsId}`;
    var imageBg = '/img/pfs-empty-logo.jpeg';
    if(item.photosOrigin[0]) {
        imageBg = item.photosOrigin[0];
    }
    var classBg = '';
    if(props.section!=="map") {
        classBg = `.${cssClassBg}{
            background-image: url(${imageBg});
            background-image: -webkit-image-set(url(${imageBg}) 1x);
        }`;
    }

    var slugCond = '';
    var condText = '';
    switch(item.property.type) {
        case 'RES':
            slugCond = 'comprar';
        break;
        case 'RNT':
            slugCond = 'rentar';
        break;
        case (item.type=='RES' && item.mls.status!=='Active'):
            slugCond = 'vendido';
    }

    var classSelected = '';
    switch(props.section) {
        case 'map': classSelected = Search.item_in_map; break;
        case 'related': classSelected = Search.item_related; break;
        default: classSelected = Search.result_item;
    }

    return (
        <div className={classSelected}>
            <div className={Search.image}>
                {
                    props.section!=="map" ? (
                        <a href="#" className={Search.favorite_icon} data-building={`${item.mlsId}`}></a>
                    ) : null
                }
                <Link href={`/casas-y-apartamentos/${slugCond}/${slugCity}/${item.slug}`} target="_blank">
                    <div className={
                        [
                            Search.photo,
                            cssClassBg
                        ].join(' ')
                    }></div>
                </Link>
                {
                    props.section!=="map" ? (
                        <style>
                            {classBg}
                        </style>
                    ) : null
                }
            </div>
            <div className={Search.data}>
                <Link href={`/casas-y-apartamentos/comprar/${slugCity}/${item.slug}`} target="_blank">
                    <div className={Search.price}>
                        {
                            new Intl.NumberFormat('es-US', { 
                                style: 'currency', 
                                currency: 'USD',
                                minimumFractionDigits: 0
                            }).format(item.listPrice)
                        }
                    </div>
                    <div className={Search.features}>
                        {
                            (item.property.bathsFull!==null) ? (
                                <div><FaBath /> {`${item.property.bathsFull}ba`}</div>
                            ) : null
                        }
                        <div>&nbsp;</div>
                        {
                            item.property.bathsFull!==null ? (
                                <div><FaBed /> {`${item.property.bathsFull}ha`}</div>
                            ) : null
                        }
                        <div>&nbsp;</div>
                        {
                            item.property.area!==null ? (
                                <div><FaCube /> {`${item.property.area}sqft`}</div>
                            ) : null
                        }
                    </div>
                    <div className={Search.address}>
                        <h2>
                            {`${item.property.subTypeText}`} en {`${item.address.full}`}, {`${item.address.city}`}<br />{`${item.address.state}`} {`${item.address.postalCode}`}</h2>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ResultItem;