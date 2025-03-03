import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const getAllJobPositions = async () => {
    const jobPositions = await prisma.jobPosition.findMany();
    return jobPositions;
}

export const getJobPositionById = async (id: number) => {
    const jobPosition = await prisma.jobPosition.findUnique({
        where : {
            id : id
        }
    });
    return jobPosition;
}

export const createJobPosition = async (data: any) => {
    const jobPosition = await prisma.jobPosition.create({
        data : data
    });
    return jobPosition;
}

export const updateJobPosition = async (id: number, data: any) => {
    const countJobPosition = await prisma.jobPosition.count({
        where : {
            id : id    
        }
    });

    if(countJobPosition === 0){
        throw new Error("Job Position not found");
    }

    const jobPosition = await prisma.jobPosition.update({
        where : {
            id : id
        },
        data : data
    });
    return jobPosition;
}

export const deleteJobPosition = async (id: number) => {
    const countJobPosition = await prisma.jobPosition.count({
        where : {
            id : id    
        }
    });

    if(countJobPosition === 0){
        throw new Error("Job Position not found");
    }
    const jobPosition = await prisma.jobPosition.delete({
        where : {
            id : id
        }
    });
    return jobPosition;
}