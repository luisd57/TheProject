import { IMedicament } from "../interfaces/Medicament.interface";
import Medicament from "../schemas/Medicament.schema"

export const getMedicaments = async (searchTerm: string): Promise<IMedicament[]> => {
    try {
        //searchTerm = searchTerm.trim().replace(/\n/g, '');
        const regex = new RegExp(searchTerm, 'i');
        return await Medicament.find({ substance: regex });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error while getting medicaments: ' + error.message);
        } else {
            throw new Error('An unknown error occurred while getting medicaments');
        }
    }
};