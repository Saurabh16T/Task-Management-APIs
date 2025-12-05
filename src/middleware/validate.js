const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const dataToValidate = req[property];
        const { error } = schema.validate(dataToValidate, { 
            abortEarly: false, 
            stripUnknown: true, 
            convert: true 
        });

        if (error) {
            const errorMessages = error.details?.map((err) => err.message) || [error.message];
            return res.status(400).json({
                statusCode: 400,
                message: errorMessages,
                data: {}
            });
        }

        next();
    };
};

module.exports = validate;
