import dbConnect from '../../lib/dbConnect';
import Subtypes from '../../models/Subtypes';
import slugify from 'slugify';

const insertSubtype = async(item) => {
    const subtype = new Subtypes(item);
    subtype.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });
}

export default async(req,res)=>{

    var subtypes = [
        {
            st_value : "Apartment",
            st_label : "Apartamentos",
            exclude_search : 0,
            is_another : 0
        },
        {
            st_value : "Condominium",
            st_label : "Condominios",
            exclude_search : 1,
            is_another : 0
        },
        {
            st_value : "Dockominium",
            st_label : "Dockominium",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Duplex",
            st_label : "Duplex",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Efficiency",
            st_label : "Efficiency",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Hotel-Motel",
            st_label : "Hotel/Motel",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Mobile-Home",
            st_label : "Mobile Home",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Multi-Family",
            st_label : "Multi Family",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Residential",
            st_label : "Residential",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Single-Family-Residence",
            st_label : "Casas",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Stock-Cooperative",
            st_label : "Stock Cooperative",
            exclude_search : 1,
            is_another : 1
        },
        {
            st_value : "Townhouse",
            st_label : "Townhouse",
            exclude_search : 0,
            is_another : 0
        },
        {
            st_value : "Villa",
            st_label : "Villa",
            exclude_search : 1,
            is_another : 1
        },
    ];

    await dbConnect();
    try{
        subtypes.forEach(item => {
            insertSubtype(item);
        });

        res.status(200).send('Ok');
    } catch(err){
        res.status(500).json({
            error : "something went wrong, try again later",
            mesage : err
        });
    }
}
