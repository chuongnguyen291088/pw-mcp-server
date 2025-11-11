export interface NewEmployeeEntity {
    data: Data
    meta: any[]
    rels: any[]
}

export interface Data {
    empNumber: number
    lastName: string
    firstName: string
    middleName: string
    employeeId: string
    terminationId: any
}
