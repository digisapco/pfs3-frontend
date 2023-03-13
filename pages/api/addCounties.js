import dbConnect from '../../lib/dbConnect';
import Counties from '../../models/Counties';
import slugify from 'slugify';

const insertCounty = async(item) => {
    const county = new Counties({
        'name' : item.name,
        'slug' : slugify(item.name).toLowerCase()
    });
    county.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });
}

export default async(req,res)=>{

    var counties = [
        { "name" : "Alachua County" },
        { "name" : "Bay County" },
        { "name" : "Brevard County" },
        { "name" : "Broward County" },
        { "name" : "Charlotte County" },
        { "name" : "Citrus County" },
        { "name" : "Collier County" },
        { "name" : "Duval County" },
        { "name" : "Flagler County" },
        { "name" : "Glades County" },
        { "name" : "Hardie County" },
        { "name" : "Hendry County" },
        { "name" : "Hernando County" },
        { "name" : "Highlands County" },
        { "name" : "Hillsborough County" },
        { "name" : "Indian River County" },
        { "name" : "Jackson County" },
        { "name" : "Lake County" },
        { "name" : "Lee County" },
        { "name" : "Leon County" },
        { "name" : "Levy County" },
        { "name" : "Manatee County" },
        { "name" : "Marion County" },
        { "name" : "Martin County" },
        { "name" : "Miami-Dade County" },
        { "name" : "Monroe County" },
        { "name" : "Okeechobee County" },
        { "name" : "Orange County" },
        { "name" : "Osceola County" },
        { "name" : "Other Florida County" },
        { "name" : "OUTSIDE of Florida" },
        { "name" : "Palm Beach County" },
        { "name" : "Pasco County" },
        { "name" : "Pinellas County" },
        { "name" : "Polk County" },
        { "name" : "Putnam County" },
        { "name" : "Sarasota County" },
        { "name" : "Seminole County" },
        { "name" : "St Johns County" },
        { "name" : "St Lucie County" },
        { "name" : "Sumter County" },
        { "name" : "Volusia County" }
    ];

    await dbConnect();
    try{
        counties.forEach(item => {
            insertCounty(item);
        });

        res.status(200).send('Ok');
    } catch(err){
        res.status(500).json({
            error : "something went wrong, try again later",
            mesage : err
        });
    }
}
