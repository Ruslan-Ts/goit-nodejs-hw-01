const { listContacts } = require("./contacts");
const { getContactById } = require("./contacts");
const { removeContact } = require("./contacts");
const { addContact } = require("./contacts");

const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
	try {
		switch (action) {
			case "list":
				const contactList = await listContacts();
				return console.log(contactList);
			case "get":
				const oneContact = await getContactById(id);
				return console.log(oneContact);
			case "add":
				const newContact = await addContact({ name, email, phone });
				return console.log(newContact);
			case "remove":
				const deleteContact = await removeContact(id);
				return console.log(deleteContact);
			default:
				console.warn("\x1B[31m Unknown action type!");
		}
	} catch (error) {
		console.log(error.message);
		throw error;
	}
};

program
	.option("-a, --action <type>")
	.option("-i, --id <type>")
	.option("-n, --name <type>")
	.option("-e, --email <type>")
	.option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options);
