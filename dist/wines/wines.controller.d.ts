import { WinesService } from './wines.service';
import { CreateWineDTO } from './dtos/create-wine.dto';
export declare class WinesController {
    private winesService;
    constructor(winesService: WinesService);
    getAll(): Promise<import("./dtos/wine-summary.interface").WineSummary[]>;
    getById(id: string): Promise<import(".prisma/client").Wine>;
    getByCountry(country: string): Promise<import("./dtos/wine-summary.interface").WineSummary[]>;
    create(wineData: CreateWineDTO, files: Express.Multer.File[]): Promise<import(".prisma/client").Wine>;
}
