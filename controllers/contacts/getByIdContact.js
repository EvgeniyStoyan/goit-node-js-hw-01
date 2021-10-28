const readData = require("./readData");

const getContactById = async (contactId) => {
  const contacts = await readData();
  const [result] = contacts.filter(
    (contact) => String(contact.id) === contactId
  );
  return result;
};

module.exports = getContactById;
