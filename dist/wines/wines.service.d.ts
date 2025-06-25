import { PrismaService } from 'src/shared/services/prisma.service';
import { Wine } from '@prisma/client';
import { WineSummary } from './dtos/wine-summary.interface';
export declare class WinesService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAll(): Promise<WineSummary[]>;
    getByCountry(country: string): Promise<WineSummary[]>;
    getById(id: Wine['id']): Promise<Wine | null>;
    create(wineData: Omit<Wine, 'id' | 'createdAt' | 'updatedAt'>): Promise<Wine>;
}
