
export class Banner {
    constructor(
        private id?: string,
        private name?: string,
        private image?: string,
        private customerId?: string | number,
        private endAt?: string,
        private startAt?: string,
        private status?: boolean,

    ) { }

    public getId = () => this.id
    public getName = () => this.name
    public getImage = () => this.image
    public getCustomerId = () => this.customerId
    public getEndAt = () => this.endAt
    public getStartAt = () => this.startAt
    public getStatus = () => this.status

    static toBannerModel(banner: any) {
        return new Banner(banner.banner_id, banner.name, banner.image, banner.customer_id, banner.endAt, banner.startAt, banner.status);
    }
}

export interface BannerInputDTO {
    name: string;
    image: string;
    customerId: string;
    endAt: string;
    startAt: string,
    status: string
}

export interface BannerChangeInputDTO {
    id: string;
    name: string;
    image: string;
    status: string
}