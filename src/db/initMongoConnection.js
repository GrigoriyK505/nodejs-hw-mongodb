import { getEnvVar } from "../utils/getEnvVar.js";
import mongoose from "mongoose";

export const initMongoConnection = async() => {
    try {
        const MONGODB_USER = getEnvVar('MONGODB_USER');
        const MONGODB_PASSWORD = getEnvVar('MONGODB_PASSWORD');
        const MONGODB_URL = getEnvVar('MONGODB_URL');
        const MONGODB_DB = getEnvVar('MONGODB_DB');
        await mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Mongo connection successfully established!");
    } catch (error) {
        console.log(error.message);
        throw error;
    }
};