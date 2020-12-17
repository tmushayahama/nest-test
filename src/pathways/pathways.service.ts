import { HttpException, Injectable } from '@nestjs/common';
import * as elasticsearch from 'elasticsearch';
import { ConfigService } from './../config/config.service';


@Injectable()
export class PathwaysService {
    private readonly esclient: elasticsearch.Client;
    pathwayIndex = this.configService.get('PTHR_PATHWAYS_INDEX');

    constructor(
        private readonly configService: ConfigService
    ) {

        this.esclient = new elasticsearch.Client({
            host: this.configService.get('PTHR_ES_URL'),
        });
    }

    async getPathways(q: string, count?: boolean): Promise<any> {
        const body = {
            query: {
                'multi_match': {
                    'fields': [
                        'pathway_name',
                        'pathway_acc',
                        'species',
                        'panther_mf_meta.label'
                    ],
                    'query': q,
                }
            }
        };

        if (count) {
            return {
                count: await this.esclient.count({
                    index: this.pathwayIndex,
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
                    index: this.pathwayIndex,
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
