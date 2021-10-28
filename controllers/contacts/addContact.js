const fs = require("fs/promises");
const readData = require("./readData");
const contactsPath = require("./contactsPath");
const { v4: uuidv4 } = require("uuid");

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = addContact;
