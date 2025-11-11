export interface ContactDetailsEntity {
    data: Data
    meta: any[]
    rels: any[]
}

export interface Data {
    street1: string
    street2: string
    city: string
    province: any
    zipCode: string
    countryCode: string
    homeTelephone: any
    workTelephone: any
    mobile: string
    workEmail: string
    otherEmail: string
}
