import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

  export const putDb = async (content) => {
    const jateDb = await openDB("jate", 1);
  
    const tx = jateDb.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
  
    const result = await store.put({ content });
    console.log("Data saved to the database", result);
  
    await tx.done;
  };

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB("jate", 1);

  const tx = jateDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");

  const result = await store.getAll();
  console.log("Data retrieved from the database", result);

  await tx.done;
  return result;
};

initdb();
