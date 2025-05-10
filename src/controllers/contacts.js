import { createContact, deleteContact, getContactById, getContacts, updateContact } from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res, next) => {
    const data = await getContacts();
    
    res.json({
        status: 200,
        message: 'Server start succesfully',
        data,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const {contactId} = req.params;
    const data = await getContactById(contactId);
            
    if(!data) {
        throw createHttpError(404, "Contact not found");
    }
    
    res.json({
        status: 200,
        message: "Successfully found contact with id {contactId}!",
        data,
    });
};

export const createContactController = async(req, res) => {
    const data = await createContact(req.body);
     
    res.status(201).json({
        status: 201,
		message: "Successfully created a contact!",
		data: data,
    });
};

export const deleteContactController = async (req, res, next) => {
    const {contactId} = req.params;

    const data = await deleteContact(contactId);

    if(!data) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
    const {contactId} = req.params;

    const data = await updateContact(contactId, req.body);

    if(!data) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data,
    });
};