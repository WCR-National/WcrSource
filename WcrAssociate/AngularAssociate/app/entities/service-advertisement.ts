export class ServiceAdvertisementObject {
    AssociateId: string;
    ZipCode: string;
    FirstName: string;
    LicenseState: string;
    LicenseId: string;

    City: string;
    State: string;
    PhotoFileName: string;
    ConsumerId: string;
    ServiceAdvertisementObject(data : any)
    {
        this.AssociateId = data.AssociateId;
        this.ZipCode = data.ZipCode;
        this.FirstName = data.FirstName;
        this.LicenseState = data.LicenseState;
        this.LicenseId = data.LicenseId;

        this.City = data.City;
        this.State = data.State;
        this.PhotoFileName = data.PhotoFileName;
        this.ConsumerId = data.ConsumerId;
    }
}