import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = contactId => ContactCollection.findOne({_id: contactId});

export const createContact = async (payload) => {
    const contact = await ContactCollection.create(payload);  
    return contact;  
};

export const deleteContact = async (contactId) => {
    const contact = await ContactCollection.findOneAndDelete({_id: contactId});
    return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
    const contact = await ContactCollection.findOneAndUpdate(
        {_id: contactId}, 
        payload,
        {
            new: true,
            ...options
        },
    );

    return contact;
};