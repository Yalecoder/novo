import { JFSDb } from "..";
import { auxiliaryTable } from "../schema";

async function createAuxiliarTable(projects, markets, otherCultures) {
  const generateUUID = () => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  try {
    const serializeArray = (array: string[]): string => JSON.stringify(array);

    const response = await JFSDb.insert(auxiliaryTable).values({
      id: generateUUID(),
      otherCultures: serializeArray(otherCultures),
      markets: serializeArray(markets),
      projects: serializeArray(projects),
    });

    return response;
  } catch (err) {
    console.log("error wen save auxiliary table in db", err);
    return false;
  }
}

const getAuxiliarTable = async () => {
  try {
    const data = await JFSDb.select().from(auxiliaryTable);

    return data.length > 0 ? data?.[0] : {};
  } catch (err) {
    console.log("erro ao buscar as areas", err);
  }
};

async function deleteAuxiliarTable() {
  try {
    await JFSDb.delete(auxiliaryTable).execute();
    console.log(
      "Todos os dados da tabela auxiliar foram apagados com sucesso."
    );
  } catch (error) {
    console.error("Erro ao apagar os dados da tabela:", error);
  }
}

export { createAuxiliarTable, getAuxiliarTable, deleteAuxiliarTable };
