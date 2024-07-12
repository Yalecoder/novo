import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const farmers = sqliteTable("farmers", {
  id: text("id").primaryKey(),
  name: text("name"),
  reference: text("reference"),
  birthDate: text("birthDate"),
  cellphone: text("cellphone"),
  market: text("market"),
  project: text("project"),
  high_risk_farmer: integer("high_risk_farmer", { mode: "boolean" }),
  photo: text("photo"),
});

export const family = sqliteTable("family", {
  id: text("id").primaryKey(),
  farmerId: text("farmerId"),
  improvedHouse: integer("ImprovedHouse", { mode: "boolean" }),
  knowRead: integer("knowRead", { mode: "boolean" }),
  hasRadio: integer("hasRadio", { mode: "boolean" }),
  hasBicycle: integer("hasBicycle", { mode: "boolean" }),
  hasMotorcycle: integer("hasMotorcycle", { mode: "boolean" }),
  houseHold: text("houseHold"), //Agregado Familiar
  gender: text("gender"),
  maritalStatus: text("maritalStatus"),
  religion: text("religion"),
  ethnicity: text("ethnicity"), //Etnia
});

export const cotton = sqliteTable("cotton", {
  id: text("id").primaryKey(),
  farmerId: text("farmerId"),
  estimateHa: text("estimateHa"),
  numberOfPermanentMen: text("numberOfPermanentMen"),
  numberOfSeasonalMen: text("numberOfSeasonalMen"),
  numberOfPermanentWomen: text("numberOfPermanentWomen"),
  numberOfSeasonalWomen: text("numberOfSeasonalWomen"),
  numberOfMinors: text("numberOfMinors"),
});

export const farmerArea = sqliteTable("farmersArea", {
  id: text("id").primaryKey(),
  farmerId: text("farmerId"),
  cultureType: text("cultureType"),
  observation: text("observation"),
  coordinates: text("coordinates"),
  coordinates1: text("coordinates1"),
});

export const auxiliaryTable = sqliteTable("auxiliaryTable", {
  id: text("id").primaryKey(),
  farmerId: text("farmerId"),
  markets: text("markets"),
  projects: text("projects"),
  otherCultures: text("otherCultures"),
});

export const otherCultures = sqliteTable("otherCultures", {
  id: text("id").primaryKey(),
  farmerId: text("farmerId"),
  otherCultures: text("otherCultures"),
});

export const biometric = sqliteTable("biometric", {
  id: text("id").primaryKey(),
  farmerId: text("farmerId"),
  biometric: text("biometric"),
});

export const subscription = sqliteTable("subscription", {
  id: text("id").primaryKey(),
  farmerId: text("farmerId"),
});

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name"),
  password: text("password"),
  type: text("type"),
});
