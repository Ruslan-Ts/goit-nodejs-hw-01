const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db", "contacts.json");

const updateContact = (contacts) =>
	fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
	const buffer = await fs.readFile(contactsPath);
	return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
	const contacts = await listContacts();
	const result = contacts.find((contact) => contact.id === contactId);
	return result || null;
};

const removeContact = async (contactId) => {
	const contacts = await listContacts();
	const index = contacts.findIndex((contact) => contact.id === contactId);
	if (index === -1) {
		return null;
	}
	const [result] = contacts.splice(index, 1);
	await updateContact(contacts);
	return result;
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await listContacts();
	const newContact = {
		id: nanoid(),
		name,
		email,
		phone,
	};
	contacts.push(newContact);
	await updateContact(contacts);
	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
