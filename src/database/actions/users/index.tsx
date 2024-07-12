import { synchronizeProps } from "@/app/synchronize";
import { JFSDb } from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

async function createUsers(data: synchronizeProps) {
  try {
    const response = await JFSDb.insert(users).values(data);

    return true;
  } catch (err) {
    console.log("error wen save user in db", err);
    return false;
  }
}

async function deleteAllUsers() {
  try {
    await JFSDb.delete(users).execute();
    console.log("Todos os dados da tabela foram apagados com sucesso.");
  } catch (error) {
    console.error("Erro ao apagar os dados da tabela:", error);
  }
}

async function listUsers() {
  try {
    const response = await JFSDb.select().from(users);

    return response;
  } catch (err) {}
}

export const getOneUser = async (id) => {
  try {
    const data = await JFSDb.select()
      .from(users)
      .orderBy(users.id)
      .where(eq(users.id, id));
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    console.log("erro ao buscar as areas", err);
  }
};

export { createUsers, listUsers, deleteAllUsers };
