const parseType = (contactType) => {
    const isString = typeof contactType === 'string';
    if(!isString) return;

    const isType = (contactType) => ['work', 'home', 'personal'].includes(contactType);

    if (isType(contactType)) return contactType;
};

const parseIsFavourite = (isFavourite) => {
    const isBoolean = typeof isFavourite === 'boolean';
    if(!isBoolean) return isFavourite;
};


export const parseFilterParams = (query) => {
    const {contactType, isFavourite} = query;

    const parsedContactType = parseType(contactType);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
        contactType: parsedContactType,
        isFavourite: parsedIsFavourite,
    };
};