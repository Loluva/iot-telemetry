import { SqlReadingRepository } from "../storage/reading.repository";
import { IngestionService } from "./ingestion.service";

const ingestionService=new IngestionService(new SqlReadingRepository())

setInterval(async() => {
  
  const payloads: unknown[] = [

  {
    device_id: Math.floor(Math.random()*3+1),
    variable: "temperature",
    value: Number((Math.random()*5+20).toFixed(2)),
    measured_at: String(new Date())
  },
  {
    device_id: Math.floor(Math.random()*3+1),
    variable: "humidity",
    value:  Number((Math.random()*5+40).toFixed(2)),
    measured_at: String(new Date())
  },
  {
    device_id: Math.floor(Math.random()*3+1),
    variable: "pressure",
    value:  Number((Math.random()*13+1000).toFixed(2)),
    measured_at: String(new Date())
  },

  {
    device_id: "dev_01", 
    variable: "voltage",
    value: 220,
    measured_at: String(new Date())
  },
  {
    device_id: 2,
    variable: "co2",
    value: 400,
    measured_at: "fecha invalida"
  },

  null
  ];
    const sendReading=async function(){
        const payloadSelected=payloads[Math.floor(Math.random()*payloads.length)]

        const result=await ingestionService.create(payloadSelected)
        console.log(`[MQTT SIMULATOR] Response: ${JSON.stringify(result)}`)
    }
    await sendReading()
}, 10000);

