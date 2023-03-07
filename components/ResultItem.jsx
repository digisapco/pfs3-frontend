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
    if(!props.inMap) {
        classBg = `.${cssClassBg}{
            background-image: url(${imageBg});
            background-image: -webkit-image-set(url(${imageBg}) 1x);
        }`;
    }

    return (
        <div className={
            props.inMap ? Search.item_in_map : Search.result_item
        }>
            <div className={Search.image}>
                {
                    !props.inMap ? (
                        <a href="#" className={Search.favorite_icon} data-building={`${item.mlsId}`}></a>
                    ) : null
                }
                <Link href={`/casas-y-apartamentos/comprar/${slugCity}/${item.slug}`} target="_blank">
                    <div className={
                        [
                            Search.photo,
                            cssClassBg
                        ].join(' ')
                    }></div>
                </Link>
                {
                    !props.inMap ? (
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
                        <div><FaBath /> {`${item.property.bathsFull}ba`}</div>
                        <div>&nbsp;</div>
                        <div><FaBed /> {`${item.property.bathsFull}ha`}</div>
                        <div>&nbsp;</div>
                        <div><FaCube /> {`${item.property.area}sqft`}</div>
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