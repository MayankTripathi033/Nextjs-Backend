import mongoose, {Schema, Document} from "mongoose";
import Email from "next-auth/providers/email";

export interface Pipeline extends Document{
    firstName: {
        type: string;
        required: [true, 'FirstName is Required']
    };
    lastName: {
        type: string;
    };
    createdBy: {
        type: string;
        required: [true, 'CreatedBy is Required']
    };
    phone: {
        type: number;
    };
    email: {
        type: string;
        required: [true, 'Email is Required']
    };
    totalExp: {
        type: string;
    };
    availability: {
        type: string;
    };
    preferredCity: {
        type: string;
    };
    preferredState: {
        type: string;
    };
    preferredShift: {
        type: number;
    };
    preferredHours: {
        type: number;
    };
    desiredPay: {
        type: number;
    };
    degree: {
        type: string;
    };
    speciality: {
        type: string;
    };
    notes: {
        type: string;
    };
}

const pipelineSchema: Schema<Pipeline> = new Schema({
    firstName: String,
    lastName: String,
    createdBy: String,
    phone: Number,
    email: String,
    totalExp: String,
    availability: String,
    preferredCity: String,
    preferredState: String,
    preferredShift: Number,
    preferredHours: Number,
    desiredPay: Number,
    degree: String,
    speciality: String,
    notes: String,
})

const PipelineModel = (mongoose.models.pipeline as mongoose.Model<Pipeline>) || mongoose.model<Pipeline>("pipeline", pipelineSchema)

export default PipelineModel