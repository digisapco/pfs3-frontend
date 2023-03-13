import { useRouter } from "next/router";
import dbConnect from '../../lib/dbConnect';
import Properties from '../../models/Properties';
import Conds from '../../models/Conds';
import Subtypes from '../../models/Subtypes';

import HeaderSecondary from '../../components/HeaderSecondary';
import SearchFilterDropdown from '../../components/SearchFilterDropdown';
import ResultItem from '../../components/ResultItem';
import ResultRelated from '../../components/ResultRelated';
import SearchStyle from '../../styles/search.module.scss';
import ResultMap from '../../components/ResultMap';
import Head from 'next/head';

const Page = (props) => {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>{props.title} - PFS Realty</title>
            </Head>
            <HeaderSecondary fields={props.fields} />
            <div className={SearchStyle.filters}>
                <div className={[
                    SearchStyle.filter_controls,
                        (!props.show_keep) ? SearchStyle.filter_center_box : ''
                    ].join(' ')
                }>
                    <SearchFilterDropdown name="cond" defaultValue={props.defaultValueCond} />
                    <div className={[
                        SearchStyle.filter_control,
                        SearchStyle.show_filters
                    ].join(' ')}>
                        <div>Filtros</div>
                        <div></div>
                    </div>
                    <SearchFilterDropdown name="st" defaultValue={props.defaultValueSt} />
                    <SearchFilterDropdown name="pr" defaultValue={props.defaultValuePr} />
                    <SearchFilterDropdown name="bd" defaultValue={props.defaultValueBd} />

                    <div className={
                        [
                            SearchStyle.filter_control,
                            SearchStyle.filter_horizontal
                        ].join(' ')
                    }>
                        <div>Más opciones</div>
                        <div>
                            <ul className={SearchStyle.bdt}>
                                <li>
                                    <input type="radio" name="bd" />
                                </li>
                            </ul>
                        </div>
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
            </div>
            <div className={SearchStyle.columns}>
                <div className={SearchStyle.results}>
                    <div className={SearchStyle.title_breadcrumb}>
                        <h1>{props.title}</h1>
                        <div className={SearchStyle.breadcrumb}>
                            <a href="/">Inicio</a>
                            {
                                props.breadcrumb.map(
                                    (bcItem) => (<a href={bcItem.url}>{bcItem.label}</a>)
                                )
                            }
                        </div>
                    </div>
                    {
                        (props.properties.length > 0) ? (
                            <div className={SearchStyle.count_sort}>
                                <div className={SearchStyle.count}>
                                    {props.properties.length.toLocaleString()} de {props.countProperties.toLocaleString()} propiedades
                                </div>
                                <div className={SearchStyle.sort}>
                                    <a className={SearchStyle.show_map}>
                                        Ver mapa
                                    </a>
                                    <select name="sort">
                                        <option value="rc">Más reciente</option>
                                        <option value="oe">Más antigua</option>
                                        <option value="pr-gt">Mayor precio</option>
                                        <option value="pr-lt">Menor precio</option>
                                        <option value="bt-lt">Menor cant. baños</option>
                                        <option value="bt-gt">Mayor cant. baños</option>
                                        <option value="bd-lt">Menor cant. habitaciones</option>
                                        <option value="bd-gt">Mayor cant. habitaciones</option>
                                        <option value="sqft-lt">Menor área</option>
                                        <option value="sqft-gt">Mayor área</option>
                                    </select>
                                </div>
                            </div>
                        ) : null
                    }
                    <div className={SearchStyle.items}>
                        {
                            (props.properties.length > 0) ? (
                                <>
                                    {
                                        props.properties.map((item, index) => (
                                            <ResultItem item={item} key={index} />
                                        ))
                                    }
                                    <ul className="pagination">
                                        {props.pagination.pages.map((_page) => (
                                        <li key={_page} className={`page-item ${_page === parseInt(props.pagination.page) ? "active" : ""}`}>
                                            <a
                                                className="page-link"
                                                href={`${props.url}/${_page}-pg`}
                                            >
                                            {_page}
                                            </a>
                                        </li>
                                        ))}
                                    </ul>
                                </>

                            ) : (
                                <div>
                                    No se encontraron propiedades con el criterio especificado.
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className={SearchStyle.map}>
                    <ResultMap properties={props.properties} />
                    <ResultRelated properties={props.propertiesRelated} />
                </div>
            </div>
        </>
    )
}

/*
const getNearestItemRelated = async(type, value) => {
    const res = await Properties.find({
        "$type" : { $ne : value }
    }).limit(1).lean();
    return res[0].type;
}
*/

export async function getServerSideProps(ctx) {
    await dbConnect();
    const { query } = ctx;
    const { params } = ctx.query;

    const cond = await Conds.find({}, {
        name    : 1,
        value   : 1
    });

    const st = await Subtypes.find({}, {
        st_label : 1,
        st_value : 1
    });

    const pr_rent = [ 
        800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2200,2400,2500,2600,2800,3000,3200,3400,3500,3600,3800,4000,4200,4400,4500,4600,4800,5000,7500,10000,15000
    ];

    const pr_sale = [
        100000,200000,250000,300000,350000,400000,450000,500000,550000,600000,650000,700000,750000,800000,850000,900000,950000,1000000,1100000,1200000,1250000,1400000,1500000,1600000,1700000,1750000,1800000,1900000,2000000,2250000,2500000,2750000,3000000,3500000,4000000,5000000,10000000,20000000,30000000,40000000,50000000
    ];

    var queryParams = {};

    var defaultValueCond = '';
    var defaultValueCi = '';
    var defaultValueCo = '';
    var defaultValueZc = '';
    var defaultValueSt = '';
    var defaultValueBd = '';
    var defaultValueBt = '';
    var defaultValueSf = '';
    var defaultValuePr = '';
    var defaultValueYr = '';

    if(params) {
        var grpParams = params;
        if(typeof grpParams == 'string') {
            grpParams = [grpParams];
        }
        var page = 1;
        var sort = '';
        var title = 'Casas y apartamentos';
        var breadcrumb = [];
        var url = '';
        grpParams.map((qi, index) => {
            if(qi == 'comprar') {
                queryParams['property.type'] = 'RES';
                queryParams['mls.status'] = 'Active';
                defaultValueCond = 'buy';
                var urlReg = '/casas-y-apartamentos/comprar';
                title+= ' en venta';
                breadcrumb.push({
                    "label" : "Casas y apartamentos",
                    "url" : urlReg
                });
                url+= urlReg;
            } else if(qi == 'rentar') {
                queryParams['property.type'] = 'RNT';
                queryParams['mls.status'] = 'Active';
                defaultValueCond = 'rent';
                var urlReg = '/casas-y-apartamentos/comprar';
                title+= ' en renta';
                breadcrumb.push({
                    "label" : "Casas y apartamentos",
                    "url" : urlReg
                });
                url+= urlReg;
            } else if(qi == 'vendido') {
                queryParams['property.type'] = 'RNT';
                queryParams['mls.status'] = 'Pending';
                defaultValueCond = 'sold';
                var urlReg = '/casas-y-apartamentos/vendido';
                title+= ' vendidos';
                breadcrumb.push({
                    "label" : "Casas y apartamentos",
                    "url" : urlReg
                });
                url+= urlReg;
            } else if(qi == 'ciudad') {
                var cityRef = params[index + 1].replace(/\b\w/g, l => l.toUpperCase()).replaceAll('-', ' ');
                queryParams['address.city'] = cityRef;
                defaultValueCi = params[index + 1];
                title+= ' en ' + cityRef;

                var linkIn = '/casas-y-apartamentos';
                switch(defaultValueCond) {
                    case 'buy': linkIn+= '/comprar'; break;
                    case 'rent': linkIn+= '/rentar'; break;
                    case 'sold': linkIn+= '/vendido'; break;
                }
                var urlReg = '/ciudad/' + params[index + 1];
                linkIn+= urlReg;

                breadcrumb.push({
                    "label" : cityRef,
                    "url" : linkIn
                });
                url+= urlReg;
            } else if(qi == 'condado') {
                var countyRef = params[index + 1].replace(/\b\w/g, l => l.toUpperCase()).replaceAll('-', ' ');
                queryParams['geo.county'] = countyRef;
                defaultValueCo = params[index + 1];
                title+= ' en el condado ' + cityRef.replace('County','');

                var linkIn = '/casas-y-apartamentos';
                switch(defaultValueCond) {
                    case 'buy': linkIn+= '/comprar'; break;
                    case 'rent': linkIn+= '/rentar'; break;
                    case 'sold': linkIn+= '/vendido'; break;
                }
                var urlReg = '/condado/' + params[index + 1];
                linkIn+= urlReg;

                breadcrumb.push({
                    "label" : countyRef,
                    "url" : linkIn
                });
                url+= urlReg;
            } else if(qi == 'codigo-postal') {
                queryParams['address.postalCode'] = params[2];
                defaultValueZc = params[2];
                title+= ' con el código postal ' + params[2];

                var linkIn = '/casas-y-apartamentos';
                switch(defaultValueCond) {
                    case 'buy': linkIn+= '/comprar'; break;
                    case 'rent': linkIn+= '/rentar'; break;
                    case 'sold': linkIn+= '/vendido'; break;
                }
                var urlReg = '/codigo-postal/' + params[index + 1];
                linkIn+= urlReg;

                breadcrumb.push({
                    "label" : params[2],
                    "url" : linkIn
                });
                url+= urlReg;
            } else if(qi == 'tipo-de-vivienda') {
                var subTypeRef = params[2].replace(/\b\w/g, l => l.toUpperCase()).replaceAll('-', ' ');
                queryParams['property.subTypeText'] = subTypeRef;
                defaultValueSt = params[2];
                title+= ' de tipo ' + subTypeRef;

                var linkIn = '/casas-y-apartamentos';
                switch(defaultValueCond) {
                    case 'buy': linkIn+= '/comprar'; break;
                    case 'rent': linkIn+= '/rentar'; break;
                    case 'sold': linkIn+= '/vendido'; break;
                }
                var urlReg = '/tipo-de-vivienda/' + params[index + 1];
                linkIn+= urlReg;

                breadcrumb.push({
                    "label" : subTypeRef,
                    "url" : linkIn
                });
                url+= urlReg;
            } else {
                var paramVal = qi.split('-');
                var field = paramVal.slice(-1)[0];

                var linkIn = '/casas-y-apartamentos';
                switch(defaultValueCond) {
                    case 'buy': linkIn+= '/comprar'; break;
                    case 'rent': linkIn+= '/rentar'; break;
                    case 'sold': linkIn+= '/vendido'; break;
                }

                switch(field) {
                    case 'pg': page = paramVal[0]; break;
                    case 'sr': sort = paramVal[0]; url+= '/'+paramVal[0]+'-sr'; break;
                    case 'st': 
                        queryParams['property.subType'] = paramVal[0]; 
                        defaultValueSt = paramVal[0];
                        title+= ' de tipo ' + paramVal[0].replace('-',' ');
                        var urlReg = '/' + paramVal[0] + '-st';
                        linkIn+= urlReg;
                        breadcrumb.push({
                            "label" : paramVal[0].replace('-',' '),
                            "url" : linkIn
                        });
                        url+= urlReg;
                    break;
                    case 'bd': 
                        queryParams['property.bedrooms'] = { $gte: parseInt(paramVal[0].replace('p','')) };
                        defaultValueBd = paramVal[0].replace('p','');
                        title+= ' con '+defaultValueBd+' o más habitaciones';
                        var urlReg = '/' + defaultValueBd + 'p-bd';
                        linkIn+= urlReg;
                        breadcrumb.push({
                            "label" : defaultValueBd + '+ hab',
                            "url" : linkIn
                        });
                        url+= urlReg;
                    break;
                    case 'bt':
                        queryParams['property.bathsFull'] = { $gte: parseInt(paramVal[0].replace('p','')) };
                        defaultValueBt = paramVal[0].replace('p','');
                        title+= ' con '+defaultValueBt+' o más baños';
                        var urlReg = '/' + defaultValueBt + 'p-bt';
                        linkIn+= urlReg;
                        breadcrumb.push({
                            "label" : defaultValueBt + '+ ba',
                            "url" : linkIn
                        });
                        url+= urlReg;
                    break;
                    case 'sf':
                        if(paramVal[0].match(/p/)) {
                            queryParams['property.area'] = { $gte : parseInt(paramVal[0].replace('p','')) }
                            defaultValueSf = paramVal[0].replace('p','');
                            title+= ' con un área desde '+defaultValueSf+' pies cuadrados';
                            var urlReg = '/' + defaultValueSf + 'p-sf';
                            linkIn+= urlReg;
                            breadcrumb.push({
                                "label" : defaultValueSf + '+ sqft',
                                "url" : linkIn
                            });
                            url+= urlReg;
                        }

                        if(!isNaN(paramVal[1])) {
                            queryParams['property.area'] = { $gte : parseInt(paramVal[0]), $lt : parseInt(paramVal[1]) }
                            defaultValueSf = paramVal[0] + '-' + paramVal[1];
                            if(paramVal[0]=='0') {
                                title+= ' con un área hasta de '+paramVal[1]+' pies cuadrados';
                                var urlReg = '/0-' + paramVal[1] + '-sf';
                                linkIn+= urlReg;
                                breadcrumb.push({
                                    "label" : '+' + paramVal[1] + ' sqft',
                                    "url" : linkIn
                                });
                                url+= urlReg;
                            } else {
                                title+= ' con un área entre los '+paramVal[0]+' y '+paramVal[1]+' pies cuadrados';
                                var urlReg = '/' + paramVal[0] + '-' + paramVal[1] + '-sf';
                                linkIn+= urlReg;
                                breadcrumb.push({
                                    "label" : paramVal[0]+' - '+paramVal[1] + '+ sqft',
                                    "url" : linkIn
                                });
                                url+= urlReg;
                            }
                        }
                    break;
                    case 'pr':
                        if(paramVal[0].match(/p/)) {
                            queryParams.listPrice = { $gte : parseInt(paramVal[0].replace('p','')) }
                            defaultValuePr = paramVal[0].replace('p','');
                            var formattedPrice = new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(defaultValuePr);
                            title+= ' con precio desde '+formattedPrice+' dólares';
                            var urlReg = '/' + defaultValuePr + 'p-pr';
                            linkIn+= urlReg;
                            breadcrumb.push({
                                "label" : formattedPrice + '+',
                                "url" : linkIn
                            });
                            url+= urlReg;
                        }

                        if(!isNaN(paramVal[1])) {
                            queryParams.listPrice = { $gte : parseInt(paramVal[0]), $lt : parseInt(paramVal[1]) }
                            defaultValuePr = paramVal[0] +'-'+ paramVal[1];
                            var formattedPriceMin = new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(paramVal[0]);
                            var formattedPriceMax = new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0}).format(paramVal[1]);

                            if(paramVal[0]=='0') {
                                title+= ' con precio hasta de '+formattedPriceMax+' dólares';
                                var urlReg = '/0-' + paramVal[1] + '-pr';
                                linkIn+= urlReg
                                breadcrumb.push({
                                    "label" : '+' + formattedPriceMax,
                                    "url" : linkIn
                                });
                                url+= urlReg;
                            } else {
                                title+= ' con un precio entre los '+formattedPriceMin+' y '+formattedPriceMax+' dólares';
                                var urlReg = '/' + paramVal[0] + '-' + paramVal[1] + '-pr';
                                linkIn+= urlReg;
                                breadcrumb.push({
                                    "label" : formattedPriceMin + ' - ' + formattedPriceMax,
                                    "url" : linkIn
                                });
                                url+= urlReg;
                            }
                        }
                    break;
                    case 'yr':
                        if(paramVal[0].match(/p/)) {
                            queryParams['property.yearBuilt'] = { $gte : parseInt(paramVal[0].replace('p','')) }
                            defaultValueYr = paramVal[0].replace('p','');
                            title+= ' desde el año '+defaultValueBd;
                            var urlReg = '/' + defaultValueYr + 'p-yr';
                            linkIn+= urlReg;
                            breadcrumb.push({
                                "label" : defaultValueYr + '+',
                                "url" : linkIn
                            });
                            url+= urlReg;
                        }

                        if(!isNaN(paramVal[1])) {
                            queryParams['property.yearBuilt'] = { $gte : parseInt(paramVal[0]), $lt : parseInt(paramVal[1]) }
                            defaultValueYr = paramVal[0] +'-'+ paramVal[1];

                            if(paramVal[0]=='0') {
                                title+= ' hasta el año '+paramVal[1];
                                var urlReg = '/0-' + paramVal[1] + '-yr';
                                linkIn+= urlReg;
                                breadcrumb.push({
                                    "label" : '+' + paramVal[1],
                                    "url" : linkIn
                                });
                                url+= urlReg;
                            } else {
                                title+= ' entre eñ año '+paramVal[0]+' y '+paramVal[1];
                                var urlReg = '/' + paramVal[0] + '-' + paramVal[1] + '-yr';
                                linkIn+= urlReg;
                                breadcrumb.push({
                                    "label" : paramVal[0] + ' - ' + paramVal[1],
                                    "url" : linkIn
                                });
                                url+= urlReg;
                            }
                        }
                    break;
                }
            }
        })
    }

    // Pagination
    var perPage = 30, page = Math.max(0, page);

    // Properties
    const properties = [];
    const countProperties = await Properties.find({$and : [queryParams]}).count();
    const totalPages = Math.ceil(countProperties / perPage);
    const propertiesData = await Properties.find({$and : [queryParams]}).skip((page-1) * perPage).limit(perPage).lean();
    const range = (start, end) => {
        return Array(end - start + 1)
                .fill()
                .map((_, i) => start + i);
    };

    propertiesData.forEach(item => {
        properties.push( JSON.parse(JSON.stringify(item)) );
    });

    // Related
    const propertiesRelated = [];
    var queryRelatedParams = {};
    /*
    queryRelatedParams.city = (typeof ctx.params.ci !== undefined) ? { $not: getNearestItemRelated("address.city", ctx.req.params.ci) } : 'Miami';
    queryRelatedParams["address.postalCode"] = (ctx.req.params.zc) ? { $not: getNearestItemRelated("address.postalCode", ctx.req.params.zc) } : 'Miami';
    queryRelatedParams["geo.county"] = (ctx.req.params.co) ? { $not: getNearestItemRelated("geo.county", ctx.req.params.co) } : 'Miami';
    */
    
    const countPropertiesRelated = await Properties.find(queryRelatedParams).count();
    const propertiesRelatedData = await Properties.find(queryRelatedParams).limit(30).lean();

    propertiesRelatedData.forEach(itemRelated => {
        propertiesRelated.push( JSON.parse(JSON.stringify(itemRelated)) );
    });

    return { props: { 
        properties,
        propertiesRelated,
        countProperties,
        title,
        breadcrumb : JSON.parse(JSON.stringify(breadcrumb)),
        url,
        fields: {
            defaultValueCond,
            defaultValueCi,
            defaultValueCo,
            defaultValueZc,
            defaultValueSt,
            defaultValueBd,
            defaultValueBt,
            defaultValueSf,
            defaultValuePr,
            defaultValueYr
        },
        pagination : {
            page,
            totalPages,
            perPage,
            pages : range(1, totalPages),

        }
    } };
}

export default Page;