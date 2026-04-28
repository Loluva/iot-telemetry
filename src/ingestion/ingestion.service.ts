import { ReadingRepository } from "../domain/reading.repository";
import { Reading } from "../domain/reading.types";
import { validateReadingPayload } from "./reading.validator";

export class IngestionService{
    constructor(private repo:ReadingRepository){}
    async create(data:unknown):Promise<Reading|null>{
       const isValid=validateReadingPayload(data)
        if(!isValid) {
                console.warn("[INGESTION] Invalid payload discarded:", data);
                return null
            }
        try {
            const result=await this.repo.create(isValid)
            console.log(`[INGESTION] Reading saved, device: ${result.device_id}, vairbale: ${result.variable}`)
            return result
        } catch (error) {
            console.error("[INGESTION] failed to persist reading: ",error)
            return null
        }
   
    }
}