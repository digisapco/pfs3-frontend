import dbConnect from '../../lib/dbConnect';
import Conds from '../../models/Conds';

const insertCond = async (item) => {
    const cond = new Conds(item);
    cond.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });
}

export default async(req,res)=>{

    var conds = [
        {
            name : "Comprar",
            slug : "comprar",
            value : "buy"
        },
        {
            name : "Rentar",
            slug : "rentar",
            value : "rent"
        },
        {
            name : "Vendido",
            slug : "vendido",
            value : "sold"
        },
    ];

    await dbConnect();
    try{
        conds.forEach(item => {
            insertCond(item);
        });

        res.status(200).send('Ok');
    } catch(err){
        res.status(500).json({
            error : "something went wrong, try again later",
            mesage : err
        });
    }

}