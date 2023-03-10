
import dbConnect from '../../lib/dbConnect';
import Properties from '../../models/Properties';
import HeaderSecondary from '../../components/HeaderSecondary';
import SearchFilterDropdown from '../../components/SearchFilterDropdown';
import ResultItem from '../../components/ResultItem';
import ResultRelated from '../../components/ResultRelated';
import SearchStyle from '../../styles/search.module.scss';
import ResultMap from '../../components/ResultMap';
import Head from 'next/head';

const Page = (props) => {
    return (
        <>
            <Head>
                <title>Resultados de la búsqueda | PFS Realty</title>
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
                        <h1>Resultados de búsqueda</h1>
                        <div className={SearchStyle.breadcrumb}>
                            <a href="/">Inicio</a>
                            <a href="/casas-y-apartamentos/">Casas y apartamentos</a>
                        </div>
                    </div>
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
                    <div className={SearchStyle.items}>
                        {
                            props.properties.map((item, index) => (
                                <ResultItem item={item} key={index} />
                            ))
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

    const cond = [
        {
            "name" : "Comprar",
            "value" : "buy"
        },
        {
            "name" : "Rentar",
            "value" : "rent"
        },
        {
            "name" : "Vendido",
            "value" : "sold"
        }
    ];

    const st = [
        {
            "name" : "Casas",
            "value" : "townhouse"
        },
        {
            "name" : "Apartamentos",
            "value" : "apartament"
        },
        {
            "name" : "Townhouse",
            "value" : "townhouse"
        },
        {
            "name" : "Otros",
            "value" : "other"
        }
    ];

    const pr_rent = [ 
        800,900,1000,1100,1200,1300,1400,1500,1600,1700,1800,1900,2000,2200,2400,2500,2600,2800,3000,3200,3400,3500,3600,3800,4000,4200,4400,4500,4600,4800,5000,7500,10000,15000
    ];

    const pr_sale = [
        100000,200000,250000,300000,350000,400000,450000,500000,550000,600000,650000,700000,750000,800000,850000,900000,950000,1000000,1100000,1200000,1250000,1400000,1500000,1600000,1700000,1750000,1800000,1900000,2000000,2250000,2500000,2750000,3000000,3500000,4000000,5000000,10000000,20000000,30000000,40000000,50000000
    ];

    var queryParams = {};
    if(ctx.params) {
        if(ctx.params.params.match(/\//)) {
            let grp = ctx.params.params.split('/');
            grp.forEach(param => {
                var paramVal = param.split('-');
                switch(paramVal[1]) {
                    case 'ci': queryParams['address.city'] = paramVal[0]; break;
                }
            });
        } else {
            var paramVal = ctx.params.params.split('-');
            switch(paramVal[1]) {
                case 'ci': queryParams['address.city'] = paramVal[0]; break;
                case 'co': queryParams['geo.county'] = paramVal[0]; break;
                case 'zc': queryParams['address.postalCode'] = paramVal[0]; break;
            }
        }
    }

    // Properties
    const properties = [];
    const countProperties = await Properties.find(queryParams).count();
    const propertiesData = await Properties.find(queryParams).limit(30).lean();

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

    var defaultValueCond = '';
    var defaultValueSt = '';
    var defaultValueBd = '';
    var defaultValueBt = '';
    var defaultValueYr = '';
    var defaultValueCi = '';
    var defaultValueCo = '';
    var defaultValueZc = '';
    var defaultValueSf = '';
    var defaultValuePr = '';

    var stValue = '';
    var bdValue = '';
    var btValue = '';
    var yrValue = '';
    var ciValue = '';
    var coValue = '';
    var zcValue = '';
    var yrValue = '';
    var prValue = '';
    var sfValue = '';
    var bdValue = '';
    var btValue = '';

    return { props: { 
        properties,
        propertiesRelated,
        countProperties,
        pr_rent,
        pr_sale,
        cond,
        defaultValueCond,
        stValue,
        defaultValueSt,
        bdValue,
        defaultValueBd,
        btValue,
        defaultValueBt,
        yrValue,
        defaultValueYr,
        ciValue,
        defaultValueCi,
        coValue,
        defaultValueCo,
        zcValue,
        defaultValueZc,
        sfValue,
        defaultValueSf,
        prValue,
        defaultValuePr,
        properties
    } };
}

export default Page;