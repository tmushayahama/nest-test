import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ConfigService } from './../config/config.service';


@Injectable()
export class GenesService {
    private readonly esclient: elasticsearch.Client;
    geneIndex = this.configService.get('PTHR_GENES_INDEX');
    constructor(
        private readonly configService: ConfigService
    ) {

        this.esclient = new elasticsearch.Client({
            host: this.configService.get('PTHR_ES_URL'),
        });
    }

    async getGenes(q: string, count?: boolean): Promise<any> {
        const body = {
            query: {
                "term": {
                    "panther_mf_meta.id.keyword": q
                }
            }
        };

        if (count) {
            return {
                count: await this.esclient.count({
                    index: this.geneIndex,
                    body,
                }).then(res => (res.count)
                ).catch(err => {
                    console.log(err);
                    throw new HttpException(err, 500);
                })
            }
        } else {
            return {
                results: await this.esclient.search({
                    index: this.geneIndex,
                    size: 20,
                    filterPath: 'took,hits.hits._score,**hits.hits._source**',
                    body,
                })
                    .then(res => res.hits.hits.map((hit) => {
                        return hit._source;
                    }))
                    .catch(err => {
                        console.log(err);
                        throw new HttpException(err, 500);
                    })
            }
        }
    }
}
