import { JFSDb } from "@/database/index";
import {
  biometric,
  cotton,
  family,
  farmerArea,
  farmers,
  otherCultures,
  subscription,
} from "@/database/schema";
import { asc, desc, eq } from "drizzle-orm";

interface FarmarProps {
  birthDate: string;
  cellphone: string;
  high_risk_farmer: boolean;
  name: string;
  pgr: boolean;
  reference: string;
  id: string;
  photo: string;
  market: string;
}

export const getData = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(farmers)
      .where(eq(farmers.market, id))
      .orderBy(desc(farmers.id));
    return data;
  } catch (err) {
    console.log("erro ao buscar produtores", err);
  }
};

export const getFarmerAreaData = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(farmerArea)
      .orderBy(farmerArea.id)
      .where(eq(farmerArea.farmerId, id));
    return data;
  } catch (err) {
    console.log("erro ao buscar as areas", err);
  }
};

export const getOneFarmer = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(farmers)
      .orderBy(farmers.id)
      .where(eq(farmers.id, id));
    return data;
  } catch (err) {
    console.log("erro ao buscar as areas", err);
  }
};

export const getOneFarmerFamily = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(family)
      .orderBy(family.id)
      .where(eq(family.farmerId, id));
    return data;
  } catch (err) {
    console.log("erro ao buscar as areas", err);
  }
};

export const getOneFarmerCotton = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(cotton)
      .orderBy(cotton.id)
      .where(eq(cotton.farmerId, id));
    return data;
  } catch (err) {
    console.log("erro ao buscar as areas", err);
  }
};

export const getOneFarmerOtherCultures = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(otherCultures)
      .orderBy(otherCultures.id)
      .where(eq(otherCultures.farmerId, id));
    return data.length > 0 ? data?.[0] : {};
  } catch (err) {
    console.log("erro ao buscar as outras culturas", err);
  }
};

export const getOneFarmerBiometric = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(biometric)
      .orderBy(biometric.id)
      .where(eq(biometric.farmerId, id));
    return data.length > 0 ? data?.[0] : {};
  } catch (err) {
    console.log("erro ao buscar dados biometricos culturas", err);
  }
};

export const getSubscriptionFarmer = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(subscription)
      .orderBy(subscription.id)
      .where(eq(subscription.farmerId, id));
    return data.length > 0 ? data?.[0] : {};
  } catch (err) {
    console.log("erro ao buscar dados da subscription", err);
  }
};

export const createOrUpdateFarmerFamily = async (data) => {
  const {
    farmerId,
    improvedHouse,
    knowRead,
    hasRadio,
    hasBicycle,
    hasMotorcycle,
    houseHold,
    gender,
    maritalStatus,
    religion,
    ethnicity,
  } = data;

  const generateUUID = () => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  try {
    // Verificar se já existe um registro com o farmerId fornecido
    const existingRecord = await JFSDb.select()
      .from(family) // Substitua pelo nome da sua tabela, se necessário
      .where(eq(family.farmerId, farmerId));

    if (existingRecord.length > 0) {
      // Atualizar registro existente
      const updatedData = await JFSDb.update(family)
        .set({
          improvedHouse,
          knowRead,
          hasRadio,
          hasBicycle,
          hasMotorcycle,
          houseHold,
          gender,
          maritalStatus,
          religion,
          ethnicity,
        })
        .where(eq(family.farmerId, farmerId));

      return updatedData;
    } else {
      // Criar novo registro
      const newData = await JFSDb.insert(family).values({
        id: generateUUID(),
        improvedHouse,
        knowRead,
        hasRadio,
        hasBicycle,
        hasMotorcycle,
        houseHold,
        gender,
        maritalStatus,
        religion,
        ethnicity,
        farmerId,
      });

      return newData;
    }
  } catch (err) {
    console.log("error create or update farmer family", err);
  }
};

export const createOrUpdateFarmerBiometric = async (farmerId, biometri) => {
  const generateUUID = () => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  try {
    // Verificar se já existe um registro com o farmerId fornecido
    const existingRecord = await JFSDb.select()
      .from(biometric) // Substitua pelo nome da sua tabela, se necessário
      .where(eq(biometric.farmerId, farmerId));

    if (existingRecord.length > 0) {
      // Atualizar registro existente
      const updatedData = await JFSDb.update(biometric)
        .set({
          biometric: biometri,
        })
        .where(eq(biometric.farmerId, farmerId));

      return updatedData;
    } else {
      // Criar novo registro
      const newData = await JFSDb.insert(biometric).values({
        id: generateUUID(),
        farmerId: farmerId,
        biometric: biometri,
      });

      return newData;
    }
  } catch (err) {
    console.log("error create or update farmer biometric", err);
  }
};

export const createOrUpdateFarmerOtherCultures = async (farmerId, cultures) => {
  const serializeArray = (array: string[]): string => JSON.stringify(array);

  console.log(farmerId, cultures);

  const generateUUID = () => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  try {
    // Verificar se já existe um registro com o farmerId fornecido
    const existingRecord = await JFSDb.select()
      .from(otherCultures) // Substitua pelo nome da sua tabela, se necessário
      .where(eq(otherCultures.farmerId, farmerId));

    if (existingRecord.length > 0) {
      // Atualizar registro existente
      const updatedData = await JFSDb.update(otherCultures)
        .set({
          otherCultures: serializeArray(cultures),
        })
        .where(eq(otherCultures.farmerId, farmerId));

      return updatedData;
    } else {
      // Criar novo registro
      const newData = await JFSDb.insert(otherCultures).values({
        id: generateUUID(),
        farmerId: farmerId,
        otherCultures: serializeArray(cultures),
      });

      return newData;
    }
  } catch (err) {
    console.log("error create or update farmer otherCultures", err);
  }
};

export const createOrUpdateFarmerCotton = async (data) => {
  const {
    farmerId,
    estimateHa,
    numberOfPermanentMen,
    numberOfSeasonalMen,
    numberOfPermanentWomen,
    numberOfSeasonalWomen,
    numberOfMinors,
  } = data;

  const generateUUID = () => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  try {
    // Verificar se já existe um registro com o farmerId fornecido
    const existingRecord = await JFSDb.select()
      .from(cotton) // Substitua pelo nome da sua tabela, se necessário
      .where(eq(cotton.farmerId, farmerId));

    console.log({ existingRecord });

    if (existingRecord.length > 0) {
      // Atualizar registro existente
      const updatedData = await JFSDb.update(cotton)
        .set({
          estimateHa,
          numberOfPermanentMen,
          numberOfSeasonalMen,
          numberOfPermanentWomen,
          numberOfSeasonalWomen,
          numberOfMinors,
        })
        .where(eq(cotton.farmerId, farmerId));

      return updatedData;
    } else {
      // Criar novo registro
      const newData = await JFSDb.insert(cotton).values({
        id: generateUUID(),
        estimateHa,
        numberOfPermanentMen,
        numberOfSeasonalMen,
        numberOfPermanentWomen,
        numberOfSeasonalWomen,
        numberOfMinors,
        farmerId,
      });

      return newData;
    }
  } catch (err) {
    console.log("error create or update farmer family", err);
  }
};

export const createFarmes = async ({
  birthDate,
  cellphone,
  high_risk_farmer,
  name,
  project,
  reference,
  id,
  photo,
  market,
}: FarmarProps) => {
  try {
    const data = await JFSDb.insert(farmers).values({
      birthDate: birthDate,
      cellphone: cellphone,
      high_risk_farmer: high_risk_farmer,
      name: name,
      project: project,
      reference: reference,
      id: id,
      photo,
      market,
    });

    return data;
  } catch (err) {
    console.log("error crate farmar", err);
  }
};

export const FamerSubscription = async (farmerId) => {
  const generateUUID = () => {
    const template = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    return template.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  try {
    const data = await JFSDb.insert(subscription).values({
      id: generateUUID(),
      farmerId: farmerId,
    });

    return data;
  } catch (err) {
    console.log("error crate farmar", err);
  }
};
