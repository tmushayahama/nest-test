import { Injectable } from '@nestjs/common';


@Injectable()
export class TermsService {
    constructor(
    ) { }

    async getTerms(q: string): Promise<any> {
        return await q
    }

}
