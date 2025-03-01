import { PrismaClient } from "@prisma/client";
import { Department } from "../types/department.types.js";

const prisma = new PrismaClient();

export const getAllDepartments = async () => {
    const departments = await prisma.department.findMany();
    return departments;
}

export const getDepartmentById = async (id: number) => {
    const department = await prisma.department.findUnique({
        where : {
            id : id
        },
        select : {
            id : true,
            name : true,    
            phone : true,
            address : true
        }
    });
    return department;
}

export const createDepartment = async (data: Department) => {
    
    const department = await prisma.department.create({
        data : data
    });

    return department;
}
export const updateDepartment = async (id: number, data: Department) => {
    const countDepartment = await prisma.department.count({
        where : {
            id : id    
        }
    });

    if(countDepartment === 0){
        throw new Error("Department not found");
    }
    const department = await prisma.department.update({
        where : {
            id : id
        },
        data : data
    });
    return department;
}

export const deleteDepartment = async (id: number) => {
    const countDepartment = await prisma.department.count({
        where : {
            id : id    
        }
    });

    if(countDepartment === 0){
        throw new Error("Department not found");
    }
    const department = await prisma.department.delete({
        where : {
            id : id
        }
    });
    return department;
}