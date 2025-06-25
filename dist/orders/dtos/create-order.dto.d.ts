export declare class CreateOrderDTO {
    name: string;
    address: string;
    phone: string;
    email: string;
    items: CreateOrderItemDTO[];
}
export declare class CreateOrderItemDTO {
    wineId: string;
    quantity: number;
    infoFromClient?: string;
    packAsGift: boolean;
}
