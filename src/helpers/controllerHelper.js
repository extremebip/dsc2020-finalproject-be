const checkMissingBodyProperties = (body, requiredProperties) => {
    let missingProperties = [];
    requiredProperties.forEach(property => {
        if (!(property in body)) {
            missingProperties.push(property);
        }
    });
    return missingProperties;
};

module.exports = {
    checkMissingBodyProperties
};