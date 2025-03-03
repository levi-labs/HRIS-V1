import { PrismaClient } from "@prisma/client";  

const prisma = new PrismaClient();

export const getAllUsers = async () => {
    const users = await prisma.user.findMany(
        {
            select : {
                id : true,
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

export const createUser = async (data: any) => {
    const user = await prisma.user.create({
        data : data
    });
    return user;
};

export const updateUser = async (id: number, data: any) => {
    const user = await prisma.user.update({
        where : {
            id : id
        },
        data : data
    });
    return user;
};

export const deleteUser = async (id: number) => {
    const user = await prisma.user.delete({
        where : {
            id : id
        }
    });
    return user;
};