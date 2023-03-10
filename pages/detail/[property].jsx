import dbConnect from '../../lib/dbConnect';
import Properties from '../../models/Properties';

import HeaderSecondary from '../../components/HeaderSecondary';
import Head from 'next/head';
import Search from '../../styles/search.module.scss';
import DetailStyle from '../../styles/detail.module.scss';
import SearchFilters from '../../components/SearchFilters';
import Link from 'next/link';
import Image from 'next/image';
import DetailMap from '../../components/DetailMap';
import DetailBoxValue from '../../components/DetailBoxValue';
import DetailRelated from '../../components/DetailRelated';
import DetailRelatedText from '../../components/DetailRelatedText';
import DetailNearestZone from '../../components/DetailNearestZone';
import DetailGallery from '../../components/DetailGallery';

import { FaHeart, FaBath, FaBed, FaCube } from 'react-icons/fa';
import slugify from 'slugify';

const DetailPage = (props) => {
    const data = props.propData[0];
    const referrer = props.referrer;
    var propertyTypeBreadcrumb = '/casas-y-apartamentos';
    const related = props.propertiesRelated;
    const related_text = props.propertiesRelatedText;

    var typeProp = 'Propiedad';
    if(data.property.subType!=='') {
        switch(data.property.subType) {
            case 'SingleFamilyResidence': typeProp = 'Casa'; break;
            case 'Condominium': typeProp = 'Condominio'; break;
            case 'Dockominium': typeProp = 'Condominio muelle'; break;
            case 'Efficiency': typeProp = 'Apartamento Eficiencia'; break; 
            case 'Mobile Home': typeProp = 'Casa móvil'; break;
            case 'Multi Family': typeProp = 'Multifamiliar'; break;
            case 'Residential': typeProp = 'Residencial'; break;
            case 'Stock Cooperative': typeProp = 'Cooperativa de Acciones'; break;
            default: typeProp = data.property.subType; break;
        }
    }

    var classCondition = '';
    var labelCondition = '';
    var labelBreadcrumb = '';
    var linkBreadcrumb = '';

    if(data.property.type == 'RES') {
        classCondition = 'sale';
        labelCondition = 'En venta';
        labelBreadcrumb = 'Para comprar';
        linkBreadcrumb = 'comprar';
    } else {
        classCondition = 'rental';
        labelCondition = 'En renta';
        labelBreadcrumb = 'Para rentar';
        linkBreadcrumb = 'rentar';
    }

    var cityRewriteConv = data.address.city.replaceAll(' ','-');
    cityRewriteConv = cityRewriteConv.replaceAll('.','');
    cityRewriteConv = cityRewriteConv.toLowerCase();
    var cityRewrite = 'ciudad/' + cityRewriteConv;
    
    var countyRewriteCond = data.geo.county.replaceAll(' County','');
    countyRewriteCond = countyRewriteCond.replaceAll(' ','-');
    countyRewriteCond = countyRewriteCond.toLowerCase();
    var countyRewrite = 'condado/' + countyRewriteCond;
    
    var zcRewrite = 'codigo-postal/' + data.address.postalCode;
    var bdStringBC = (data.property.bedrooms > 1) ? 'habitaciones' : 'habitación';
    var btStringBC = (data.property.bathsFull > 1) ? 'baños' : 'baño';

    var pfs_fields_url = [];
    var params = referrer.match(/casas\-y\-apartamentos\/(comprar|rentar|vendido)\/([a-zA-Z0-9\,\-?\_?\/]+)\/?$/);
    if(params) {
        var group = params[2].split('/');
        group.forEach(item => {
            var grpItem = item.split('-');
            var filter = grpItem.slice(-1)[0];

            var tmpGrpValue = [];
            grpItem.map((value, index) => {
                if(value !== filter) {
                    tmpGrpValue[index] = value;
                }
            });

            pfs_fields_url[filter] = tmpGrpValue.join('-');
        })
    }

    var priceMin = 0;
    var priceMax = 0;
    var priceMinFormatted = '';
    var priceMaxFormatted = '';
    if(pfs_fields_url['pr']) {
        if(pfs_fields_url['pr'].match(/p/)) {
            priceMin = pfs_fields_url['pr'].replace('p','');
            priceMin = parseInt(priceMin);
            priceMax = 0;
            priceMinFormatted = new Intl.NumberFormat('es-US', {style: 'currency',currency: 'USD',minimumFractionDigits: 0}).format(priceMin);
            priceMaxFormatted = new Intl.NumberFormat('es-US', {style: 'currency',currency: 'USD',minimumFractionDigits: 0}).format(priceMax);
        }

        if(pfs_fields_url['pr'].match(/\-/)) {
            var grpPrice = pfs_fields_url['pr'].split('-');
            priceMin = parseInt(grpPrice[0]);
            priceMax = parseInt(grpPrice[1]);
            priceMinFormatted = new Intl.NumberFormat('es-US', {style: 'currency',currency: 'USD',minimumFractionDigits: 0}).format(priceMin);
            priceMaxFormatted = new Intl.NumberFormat('es-US', {style: 'currency',currency: 'USD',minimumFractionDigits: 0}).format(priceMax);
        }
    }

    let photos = data.photosOrigin;

    let hoaFee = '';
    if(data.association) {
        if(data.association.fee !== '' || data.association.fee !== null) {
            hoaFee+= new Intl.NumberFormat('es-US', { 
                style: 'currency', 
                currency: 'USD',
                minimumFractionDigits: 0
            }).format(data.association.fee);
            hoaFee+= ' USD';

            switch(data.association.frequency) {
                case 'Monthly': hoaFee+= ' mensuales'; break;
                case 'Annually': hoaFee+= ' anuales'; break;
                case 'One Time': hoaFee+= ' una vez'; break;
            }
        } else {
            hoaFee+= '---';
        }
    }

    return (
        <>
            <Head>
                <title>{data.address.full} - PFS Realty</title>
            </Head>
            <HeaderSecondary />
            <div className={Search.filters}>
                { /*<SearchFilters />*/ }
            </div>
            <div className={[
                DetailStyle.detail,
                'container'
            ].join(' ')}>
                <div className={DetailStyle.breadcrumb}>
                    <ul>
                        <li><Link href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}`}>Casas y apartamentos</Link></li>
                        <li><Link href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/tipo-de-vivienda/${slugify(data.property.subTypeText).toLowerCase()}`}>{typeProp}</Link></li>
                        <li><Link href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${countyRewrite}`}>{data.geo.county}</Link></li>
                        <li><Link href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${cityRewrite}`}>{data.address.city}</Link></li>
                        <li><Link href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${zcRewrite}`}>{data.address.postalCode}</Link></li>
                        <li><Link href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${data.property.bedrooms}p-bd`}>{`${data.property.bedrooms} ${bdStringBC}`}</Link></li>
                        <li><Link href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${data.property.bathsFull}p-bt`}>{`${data.property.bathsFull} ${btStringBC}`}</Link></li>
                        {
                            priceMin!==0 && priceMax!==0 ?
                            (
                                <li>
                                <a href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${cityRewrite}/${priceMin}-${priceMax}-pr`}>
                                    Precio entre {`${priceMinFormatted}`} a {`${priceMaxFormatted}`}
                                </a>
                                </li>
                            ) : null
                        }
                        {
                            priceMin!==0 && priceMax==0 ? 
                            (
                                <li>
                                    <a href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${cityRewrite}/${priceMin}p-pr`}>
                                        Precio desde {`${priceMinFormatted}`}
                                    </a>
                                </li>
                            ) : null
                        }
                        {
                            priceMin==0 && priceMax!==0 ? 
                            (
                                <li>
                                    <a href={`${propertyTypeBreadcrumb}/${linkBreadcrumb}/${cityRewrite}/0-${priceMax}-pr`}>
                                        Precio hasta {`${priceMaxFormatted}`}
                                    </a>
                                </li>
                            ) : null
                        }
                        <li>{data.address.full}</li>
                    </ul>
                </div>
                <article className={DetailStyle.detail}>
                    <div className={DetailStyle.gallery}>
                        <DetailGallery photos={photos} />
                    </div>
                    <div className={DetailStyle.columns}>
                        <div className={DetailStyle.col1}>
                            <div className={DetailStyle.title_price}>
                                <div>
                                    <h1>{typeProp} {labelCondition.toLowerCase()} en {data.address.full}</h1>
                                    <h2>{data.address.full}</h2>
                                    <div>
                                        <FaBath /> &nbsp; {`${data.property.bathsFull}`}ba &nbsp;
                                    
                                        <FaBed /> &nbsp; {`${data.property.bedrooms}`}hb &nbsp;
                                    
                                        <FaCube /> &nbsp; {`${data.property.area}`}sqft
                                    </div>
                                </div>
                                <div>
                                    {
                                        new Intl.NumberFormat('es-US', { 
                                            style: 'currency', 
                                            currency: 'USD',
                                            minimumFractionDigits: 0
                                        }).format(data.listPrice)
                                    }
                                    <span>Precio</span>
                                </div>
                            </div>
                            <div className={DetailStyle.map}>
                                <DetailMap position={{
                                    lat : data.geo.lat,
                                    lng : data.geo.lng 
                                }} />
                            </div>
                            <div className={DetailStyle.description}>
                                <h6>Descripción</h6>
                                {
                                    data.description!=='' || data.description!==null ? data.description : null
                                }
                            </div>
                            <div className={DetailStyle.box}>
                                <div className={DetailStyle.box_title}>
                                    Detalles de propiedad
                                </div>
                                <div className={DetailStyle.box_content}>
                                    <div className={DetailStyle.block_1}>
                                        <DetailBoxValue label="Área" value={`${data.property.area}sqft`} />
                                        <DetailBoxValue label="Baños" value={`${data.property.bathrooms}`} />
                                        <DetailBoxValue label="Habitaciones" value={`${data.property.bedrooms}`} />
                                        <DetailBoxValue label="Techo" value={`${data.property.roof}`} />
                                        <DetailBoxValue label="Ventilación" value={`${data.property.cooling}`} />
                                        <DetailBoxValue label="Calefacción" value={`${data.property.heating}`} />
                                        <DetailBoxValue label="Chimeneas" value={`${data.property.fireplace}`} />
                                        <DetailBoxValue label="Estilo de piso" value={`${data.property.flooring}`} />
                                        <DetailBoxValue label="Lavandería" value={`${data.property.laundryFeatures}`} />
                                        <DetailBoxValue label="Piscina" value={`${data.property.pool}`} />
                                        <DetailBoxValue label="Tipo" value={`${data.property.type}`} />
                                        <DetailBoxValue label="Código MLS" value={`${data.mlsId}`} />
                                        <DetailBoxValue label="Año de construcción" value={`${data.property.yearBuilt}`} />
                                    </div>
                                    <div className={DetailStyle.block_2}>
                                        <DetailBoxValue label="Condado" value={`${data.geo.county}`} />
                                        <DetailBoxValue label="Subtipo" value={`${data.property.subType}`} />
                                        <DetailBoxValue label="Estilo" value={`${data.property.style}`} />
                                        <DetailBoxValue label="Estado de la publicación" value={`${data.property.statusText}`} />
                                        <DetailBoxValue label="Subdvisión" value={`${data.property.subdivision}`} />
                                        <DetailBoxValue label="Parqueo" value={`${data.property.parking.description}`} />
                                        <DetailBoxValue label="Costo HOA" value={hoaFee} />
                                    </div>
                                </div>
                            </div>
                            <div className={DetailStyle.related_properties}>
                                <h3>Otras propiedades relacionadas</h3>
                                <DetailRelated properties={related} />
                            </div>
                            {
                                /*
                                <div className={DetailStyle.nearest_zone}>
                                    <h3>Nuevos listados cerca de tu zona</h3>
                                    <DetailNearestZone />
                                </div>
                                */
                            }
                        </div>
                        <div className={DetailStyle.col2}>
                            <div className={DetailStyle.interested}>
                                <div>¿Estás interesado en esta vivienda?</div>
                                <a href="#" className={DetailStyle.require_tour}>
                                    Requerir un tour
                                    <span>tan pronto como hoy a las 00:00</span>
                                </a>
                                <a href="#" className={DetailStyle.request_inquiry}>
                                    Solicitar Asesoría
                                </a>
                            </div>
                            <div className={DetailStyle.related_text}>
                                <h5>Otras personas también buscaron</h5>
                                <DetailRelatedText properties={related_text} />
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    await dbConnect();

    // Property
    let slug = ctx.params.property.split('-');
    let idMls = slug.slice(-1)[0];

    const property = await Properties.find({
        mlsId : idMls
    }).lean();

    let propData = JSON.parse(JSON.stringify(property));
    let referrer = ctx.req.headers.referer

    // Related
    const propertiesRelated_query = await Properties.find({
        "address.city" : propData[0].address.city,
        "property.type" : propData[0].property.type,
        mlsId : { $ne : propData[0].mlsId }
    },{
        _id : 0,
        mlsId : 1,
        slug : 1,
        address : {
            full : 1,
            city : 1,
            state : 1,
            postalCode : 1
        },
        property : {
            subTypeText : 1,
            area : 1,
            bathsFull : 1,
            bedrooms : 1,
            type : 1
        },
        photosOrigin : 1,
        listPrice : 1
    }).limit(6).lean();
    const propertiesRelated = JSON.parse(JSON.stringify(propertiesRelated_query));
    
    // Related text
    const propertiesRelatedText_query = await Properties.find({
        "address.city" : propData[0].address.city,
        "property.type" : propData[0].property.type,
        mlsId : { $ne : propData[0].mlsId }
    },{
        mlsId : 1,
        slug : 1,
        address : {
            full : 1,
            city : 1,
            state : 1,
            postalCode : 1
        },
        property : {
            subTypeText : 1,
            area : 1,
            bathsFull : 1,
            bedrooms : 1,
            type : 1,
            yearBuilt : 1
        },
        listPrice : 1
    })
    .lean().limit(8);
    const propertiesRelatedText = JSON.parse(JSON.stringify(propertiesRelatedText_query));

    return { props: { propData, referrer, propertiesRelated, propertiesRelatedText } }

}

export default DetailPage;