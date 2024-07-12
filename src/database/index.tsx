import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite/next";


const expoDb = openDatabaseSync("JFSNEW.db");

const JFSDb = drizzle(expoDb);

export {
    JFSDb
}