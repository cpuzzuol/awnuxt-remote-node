db.createCollection('user', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstName", "lastName", "email", "username", "password"],
            properties: {
                firstName: {
                    bsonType: "string",
                    description: "First name is required"
                },
                lastName: {
                    bsonType: "string",
                    description: "Last name is required"
                },
                email: {
                    bsonType: "string",
                    description: "Email is required"
                },
                username: {
                    bsonType: "string",
                    description: "Username is required"
                },
                password: {
                    bsonType: "string",
                    description: "Password is required"
                }
            }
        }
    }
})