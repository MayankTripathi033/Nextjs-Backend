import dbConnect from "@/lib/db.connect";
import PipelineModel from "@/model/pipeline.model";

export async function POST(request:Request){
    await dbConnect()
try {
   const {
    firstName,
    lastName,
    createdBy,
    phone,
    email,
    totalExp,
    availability,
    preferredCity,
    preferredState,
    preferredShift,
    preferredHours,
    desiredPay,
    degree,
    speciality,
    notes,
   } = await request.json()
   const newPipeline = new PipelineModel({
    firstName,
    lastName,
    createdBy,
    phone,
    email,
    totalExp,
    availability,
    preferredCity,
    preferredState,
    preferredShift,
    preferredHours,
    desiredPay,
    degree,
    speciality,
    notes,
   });
   const pipelineCreated = await newPipeline.save()
   if(!pipelineCreated){
    return Response.json({
        success: false,
        message: 'Error Creating Pipeline'
    }, {
        status: 500
    })
   }
    return Response.json({
        success: true,
        message: 'Pipeline has been created Successfully',
        payload: newPipeline
    }, {
        status: 200
    })
} catch (error) {
    console.error("Error in :: Sign-In", error);
    return Response.json({
        success: false,
        message: 'Error Signing In',
        error: error
    }, {
        status: 500
    })
}}