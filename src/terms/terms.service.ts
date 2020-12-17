import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ConfigService } from './../config/config.service';


@Injectable()
export class TermsService {
    private readonly esclient: elasticsearch.Client;
    constructor(
        private readonly configService: ConfigService
    ) {

        this.esclient = new elasticsearch.Client({
            host: this.configService.get('PTHR_ES_URL'),
        });
    }

    async getTerms(q: string): Promise<any> {
        const body = {
            "size": 20,
            "_source": [
                "label",
                "id"
            ],
            "query": {
                "match": {
                    "label": {
                        "query": q,
                        "operator": "and",
                        "fuzziness": 2,
                        "max_expansions": 10
                    }
                }
            }
        };


        return {
            results: await this.esclient.search({
                index: this.configService.get('PTHR_TERMS_INDEX'),
                size: 20,
                filterPath: 'took,hits.hits._score,**hits.hits._source**',
                body,
            })
                .then(res => res?.hits?.hits.map((hit) => {
                    return hit._source;
                }))
                .catch(err => {
                    console.log(err);
                    throw new HttpException(err, 500);
                })
        }
    }

}
