import { Injectable } from '@nestjs/common';


@Injectable()
export class GenesService {
    constructor(
    ) { }

    async getGenes(q: string): Promise<any> {
        return await q;
    }

}
