import { parse } from "dotenv";
import prisma from "../config/prismaClient.js";
import { IleaveRequestApproveResponse, IleaveRequestData, IleaveRequestResponse } from "../types/leaverequest.types.js";


export const getAllLeaveRequests = async () => {
    const leaveRequests = await prisma.leaveRequest.findMany();
    return leaveRequests;
}

export const getLeaveRequestById = async (id: number) => {
    const leaveRequest = await prisma.leaveRequest.findUnique({
        where : {
            id : id
        }
    });
    return leaveRequest;
}

export const createLeaveRequest = async (userId: number,data: IleaveRequestData):Promise<IleaveRequestResponse> => {
   await prisma.leaveRequest.create({
        data : {
            employeeId : userId,
            startDate : new Date(data.startDate).toISOString(),
            endDate : new Date(data.endDate).toISOString(),
            reason : data.reason,
            status : "pending",
            approvedBy : null
        }
    });
    return {
        message : "Leave request created successfully",
        status : "success",
        employeeId : data.employeeId
    };
}

export const updateLeaveRequest = async (id: number, data: IleaveRequestData, userId: number):Promise<IleaveRequestResponse> => {
   await prisma.leaveRequest.update({
        where : {
            id : id
        },
        data : {
            employeeId : userId,
            startDate : new Date(data.startDate).toISOString(),
            endDate : new Date(data.endDate).toISOString(),
            reason : data.reason,
            status : "pending",
            approvedBy : null
        }
    });
    return {
        message : "Leave request updated successfully",
        status : "success",
        employeeId : data.employeeId
    };
}

export const deleteLeaveRequest = async (id: number) => {
    await prisma.leaveRequest.delete({
        where : {
            id : id
        }
    });
    return {
        message : "Leave request deleted successfully",
        status : "success",
        employeeId : id
    };
}

export const approveLeaveRequest = async (id: number,approvedBy: number):Promise<IleaveRequestApproveResponse> => {
    const leaveRequest = await prisma.leaveRequest.update({
        where : {
            id : id
        },
        data : {
            status : "approved",
            approvedBy : approvedBy
        }
    });
    return {
        message : "Leave request approved successfully",
        status : "success",
        employeeId : leaveRequest.employeeId,
        approvedBy : leaveRequest.approvedBy
    };
}
