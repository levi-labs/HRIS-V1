import { Office, PrismaClient } from "@prisma/client";
import { OfficeRequest } from "../types/office.types.js";

export const prisma = new PrismaClient();

export const getAllOffices = async () => {
    const offices = await prisma.office.findMany();
    return offices;
}

export const getOfficeById = async (id: number) => {
    const countOffice = await prisma.office.count({
        where : {
            id : id    
        }
    });

    if(countOffice === 0){
        throw new Error("Office not found");
    }

    const office = await prisma.office.findUnique({
        where : {
            id : id
        }
    });
    return office;
}

export const createOffice = async (data: OfficeRequest): Promise<Office> => {
    const office = await prisma.office.create({
        data : data
    });
    return office;
}

export const updateOffice = async (id: number, data: Partial<OfficeRequest>): Promise<Office> => {
    const office = await prisma.office.update({
        where : {
            id : id
        },
        data : data
    });
    return office;
}

export const deleteOffice = async (id: number): Promise<Office> => {
    const office = await prisma.office.delete({
        where : {
            id : id
        }
    });
    return office;
}
