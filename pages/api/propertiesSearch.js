import dbConnect from '../../lib/dbConnect';
import Properties from '../../models/Properties';
import Cities from '../../models/Cities';
import Counties from '../../models/Counties';
import Zipcodes from '../../models/Zipcodes';

export default async (req,res)=>{

  await dbConnect();
  const { q } = req.query;
  const regex = new RegExp(`${q}`,'i');

  try{

    const cities = await Cities.find({
      name : { $regex : regex }
    },{
      name : 1,
      category : 'city',
      slug : 1,
      _id : 0,
    });

    const counties = await Counties.find({
      name : { $regex : regex }
    },{
      name : 1,
      category : 'county',
      slug : 1,
      _id : 0,
    });

    const zipcodes = await Zipcodes.find({ 
      code: { $regex : regex } 
    },{
      code : 1,
      category : 'zipcode',
      _id : 0
    });

    const properties = await Properties.find({
      "address.full" : { $regex: regex }
    },{
      slug : 1,
      property: { type : 1 },
      mls: { status: 1 },
      address: { city : 1, full: 1},
      _id : 0,
      category : 'property'
    });

    let data = [
      ...cities,
      ...counties,
      ...zipcodes,
      ...properties
    ];

    res.status(200).json(data);
  } catch(err){
    res.status(500).json({
      error:"something went wrong, try again later",
      mesage:err
    });
  }
}
