const { Command } = require("commander");
const chalk = require("chalk");

const listContacts = require("./controllers/contacts/ListContacts");
const addContact = require("./controllers/contacts/addContact.js");
const getContactById = require("./controllers/contacts/getByIdContact");
const removeContact = require("./controllers/contacts/removeContact");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.green("Contact found"));
          console.log(contactById);
        } else {
          console.log(chalk.yellow("Contact not found"));
        }
        break;

      case "add":
        const contact = await addContact(name, email, phone);
        console.log(chalk.green("Add new contact"));
        console.log(contact);

        break;

      case "remove":
        const contactDeleted = await removeContact(id);
        if (contactDeleted) {
          console.log(chalk.green("Contact deleted"));
          console.log(contactDeleted);
        } else {
          console.log(chalk.red("Contact not found"));
        }
        break;

      default:
        console.warn(chalk.red("Unknown action type!"));
    }
  } catch (error) {
    console.log(chalk.red(error.message));
  }
})(argv);
