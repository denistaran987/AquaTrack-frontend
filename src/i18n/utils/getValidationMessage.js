export const getLocalizedMessage = (t, key, field, values = {}) => {
    const localizedField = t(`values.${field}`);
    return t(`commonUserValidation.${key}`, { field: localizedField, ...values });
};