import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ConfigService } from './../config/config.service';


@Injectable()
export class CategoriesService {
    private readonly esclient: elasticsearch.Client;
    constructor(
        private readonly configService: ConfigService
    ) {

        this.esclient = new elasticsearch.Client({
            host: this.configService.get('PTHR_ES_URL'),
        });
    }

    async getCategories(q: string): Promise<any> {
        const body = {
            query: {
                'multi_match': {
                    'fields': [
                        'category_name',
                        'category_symbol',
                        'species',
                        'panther_mf_meta.label'
                    ],
                    'query': q,
                    'fuzziness': 1
                }
            }
        };


        return {
            results: await this.esclient.search({
                index: this.configService.get('PTHR_CATEGORIES_INDEX'),
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
