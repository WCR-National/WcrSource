export class Category {
    CategoryID: string;
    CategoryName: string;
    CategoryPrice: string;
}


export class CityStateZip {
    Zip: string;
    City: string;
    State: string;
}

export class PurchaseEntry {
    index: string;
    CategoryID: string;
    CategoryName: string;
    ZipCode: string;
    City: string;
    State: string;
    ChargeAmount: string;
    location: string;
}