export interface NewUserEntity {
    data: Data
    meta: any[]
    rels: any[]
}

export interface Data {
    id: number
    userName: string
    deleted: boolean
    status: boolean
    employee: Employee
    userRole: UserRole
}

export interface Employee {
    empNumber: number
    employeeId: string
    firstName: string
    middleName: string
    lastName: string
    terminationId: any
}

export interface UserRole {
    id: number
    name: string
    displayName: string
}
