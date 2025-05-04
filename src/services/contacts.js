import { SORT_ORDER } from "../constants/index.js";
import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from "../utils/calculatePagenationData.js";

export const getContacts = async ({
    page = 1, 
    perPage= 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
    filter = {},
}) => {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = ContactCollection.find();

    if (filter.contactType) {
        contactsQuery.where('contactType').regex(new RegExp(filter.contactType, 'i'));
    }
    if (filter.isFavourite) {
        contactsQuery.where('isFavourite').equals(filter.isFavourite);
    }

    // const contactsCount = await ContactCollection.find().merge(contactsQuery).countDocuments();

    // const contacts = await contactsQuery.skip(skip).limit(limit).sort({[sortBy]: sortOrder}).exec();

    const [contactsCount, contacts] = await Promise.all([
        ContactCollection.find({}).merge(contactsQuery).countDocuments(),
        contactsQuery
            .skip(skip)
            .limit(limit)
            .sort({[sortBy]: sortOrder})
            .exec(),
    ]);

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
        data: contacts, ...paginationData,
    };
};

export const getContactById = async (contactId) => {
    const data = await ContactCollection.findOne({_id: contactId});
    return data;
};

export const createContact = async (payload, userId) => {
    const contact = await ContactCollection.create(payload);  
    return contact;  
};

export const deleteContact = async (contactId, userId) => {
    const contact = await ContactCollection.findOneAndDelete({_id: contactId, userId});
    return contact;
};

export const updateContact = async (contactId, payload, userId, options = {}) => {
    const contact = await ContactCollection.findOneAndUpdate(
        {_id: contactId, userId}, 
        payload,
        {
            new: true,
            ...options
        },
    );

    return contact;
};