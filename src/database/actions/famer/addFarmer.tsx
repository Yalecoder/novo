import { db, JFSDb } from "@/database";
import { farmers } from "@/database/schema";
import { farmerArea } from "@/database/schema";
import { v4 as uuidv4 } from "uuid";

export const addFarmers = async (
  id: number,
  name: string,
  reference: string
) => {
  const response = await db.insert(farmers).values({
    id: "id",
    name: "text",
    reference: "text",
    birthDate: "text",
    cellphone: "text",
    pgr: "text",
    high_risk_farmer: "text",
    photo: "text",
  });

  return response;
};

export const addFarmerArea = async (
  farmerId: string,
  area: string[],
  area1: string[],
  cultureType: string,
  observation: string
) => {
  const serializeArray = (array: string[]): string => JSON.stringify(array);

  const generateUUID = (): string => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const response = await JFSDb.insert(farmerArea).values({
    id: generateUUID(),
    farmerId: farmerId,
    cultureType: cultureType,
    coordinates: serializeArray(area),
    coordinates1: serializeArray(area1),
    observation: observation,
  });

  return {
    message: "area armazenada com sucesso",
    data: response,
  };
};
