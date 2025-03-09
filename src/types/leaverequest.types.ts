

export interface IleaveRequestData{
    employeeId: string;
    startDate: string;
    endDate: string;
    reason: string;
}

export interface IleaveRequestResponse{
    message:string;
    status:string;
    employeeId: string;
}

export interface IleaveRequestApproveResponse{
    message:string;
    status:string;
    employeeId: number;
    approvedBy: number | null;
}