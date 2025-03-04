import { Employee, PrismaClient } from "@prisma/client";
import { IEmployee } from "../types/employee.types.js";


const prisma = new PrismaClient();

//make class 
export class EmployeeService {
    static async getAllEmployees() : Promise<Employee[]> {
        const employees = await prisma.employee.findMany(
            {
                include : {
                    job_position : true,
                    user : true
                }
            }
        );
        return employees;
    }
    static async getEmployeeById(id: number) : Promise<Employee|null> {
        const employee = await prisma.employee.findUnique({
            where : {
                id : id
            },
            include : {
                job_position : true,
                user : true
            }
        });
        return employee;
    }

    static async createEmployee(data: IEmployee): Promise<Employee> {
        const employee = await prisma.employee.create({
            data : data
        });
        return employee;

    }

    static async updateEmployee(id: number, data: Partial<IEmployee>): Promise<Employee> {
        const employee = await prisma.employee.update({
            where : {
                id : id
            },
            data : data
        });
        return employee;
    }

    static async deleteEmployee(id: number) : Promise<Employee> {
        const employee = await prisma.employee.delete({
            where : {
                id : id
            }
        });
        return employee;
    }
}

