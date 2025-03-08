export interface IAttendance {
    employeeId: number;
    date: string;
    checkIn: string;
    checkOut?: string | null;
    status: string;
    latitude: number;
    longitude: number;
}

export interface IAttendanceCheckIn {
    employeeId: number;
    date:string;
    checkIn: string;
    checkOut?: string | null;
    status: string;
    latitude: string;
    longitude: string;
}

export interface IAttendanceCheckInResponse {
    message: string;
    attendanceID: number;
    checkInTime: string;
    status: string;
}

export interface IAttendanceResponse {
    id: number;
    employeeId: number;
    date: string; // Format ISO untuk kompatibilitas
    checkIn: string;
    checkOut: string | null;
    status: string;
    geolocation: {
        id: number;
        checkInLongitude: number;
        checkInLatitude: number;
        checkOutLongitude?: number | null;
        checkOutLatitude?: number | null;
    };
}


