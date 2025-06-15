import { Injectable } from '@nestjs/common';
import { db, Wine } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WinesService {
  getAll(): Wine[] {
    return db.wines;
  }

  getById(id: Wine['id']): Wine | undefined {
    return db.wines.find((w) => w.id === id);
  }

  create(wineData: Omit<Wine, 'id'>): Wine {
    const newWine = { ...wineData, id: uuidv4()};
    db.wines.push(newWine);
    return newWine;
  }
}
