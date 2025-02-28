import { PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    const users = await prisma.user.findMany(
        {
            select : {
                id : true,
                name : true,
                username : true,
                email : true,
                role : {
                    select : {
                        name : true
                    }
                }
            }
        }
    );
    return users;  
};

export const getUserById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where : {
            id : id
        },
        select : {
            id : true,
            name : true,
            username : true,
            email : true,
            role : {
                select : {
                    name : true
                }
            }
        }
    });
    return user;
};