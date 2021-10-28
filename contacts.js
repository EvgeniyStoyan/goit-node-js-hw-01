const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const readData = async () => {
  const result = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(result);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === contactId
  );
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await readData();
  const deleteContact = contacts.filter(
    (contact) => String(contact.id) !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(deleteContact, null, 2));
  const [result] = contacts.filter(
    (contact) => String(contact.id) === contactId
  );
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await readData();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
