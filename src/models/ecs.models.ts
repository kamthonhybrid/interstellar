import { Schema, model } from 'mongoose';

// Creating an interface
interface Tokens {
    name: string,
    user: string,
    token: string,
    exp: string
}

const ecsSchema = new Schema<Tokens>({
    name: {
        type: String,
        required: [true, "Name should not be empty!"]
    },

    user: {
        type: String,
        required: [true, "User should not be empty!"]
    },

    token: {
        type: String,
        required: [true, "Token should not be empty!"]
    },

    exp: {
        type: String,
        required: [true, "Expired should not be empty!"]
    }
    
}, { timestamps: true});


export const Token = model<Tokens>('Token', ecsSchema);