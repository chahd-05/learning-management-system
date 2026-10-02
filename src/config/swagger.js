import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LMS API",
            version: "1.0.0",
            description: "Learning Management System API"
        }
    },
    apis: ["./src/router/*.js"]
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec
