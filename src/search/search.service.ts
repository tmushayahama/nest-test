import { HttpException, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ConfigService } from './../config/config.service';
import * as elasticsearch from 'elasticsearch';


@Injectable()
export class SearchService {
  private readonly esclient: elasticsearch.Client;
  constructor(
    private readonly esService: ElasticsearchService,
    private readonly configService: ConfigService) { }

  async bulkInsert(cards: any[]) {
    const bulk = [];
    cards.forEach(ability => {
      bulk.push({
        index: { _index: 'tcards' },
      });
      bulk.push(ability);
    });
    return await this.esclient.bulk({
      body: bulk,
      index: 'tcards',
    })
      .then(res => ({ status: 'success', data: res }))
      .catch(err => { throw new HttpException(err, 500); });
  }

  async searchIndex(prefix: string, criteria?: any) {

    const boolQuery = this.phraseQuery(prefix);
    this.addCategoryFiler(boolQuery.bool, criteria);

    const body = {
      size: 50,
      from: 0,
      query: boolQuery,
    };

    //console.log(JSON.stringify(boolQuery, null, 2));

    return await this.esclient.search({
      index: 'tcards',
      filterPath: 'took,hits.hits._score,**hits.hits._source**',
      body,
    })
      .then(res => res.hits.hits.map((hit) => {
        return hit._source;
      }))
      .catch(err => { throw new HttpException(err, 500); });
  }

  phraseQuery(phrase) {
    return {
      bool: {
        should: [
          {
            multi_match: {
              query: phrase,
              type: 'phrase',
              fields: [
                'title',
                'category',
              ],
              boost: 10,
            },
          }, {
            multi_match: {
              query: phrase,
              type: 'most_fields',
              fields: [
                'title',
                'category',
              ],
              fuzziness: 'AUTO',
            },
          },
        ],
      },
    };
  }

  addCategoryFiler(boolQuery, criteria) {
    if (criteria && criteria.categories) {
      boolQuery.filter = [
        {
          terms: {
            category: criteria.categories,
          },
        },
      ];
    }
  }

  async search(search: string) {
    let results = [];
    const { body } = await this.esService.search({
      index: this.configService.get('PTHR_GENES_INDEX'),
      body: {
        size: 12,
        query: {
          match: {
            'title.complete': {
              query: search,
            },
          },
        },
      },
    });
    const hits = body.hits.hits;
    hits.map(item => {
      results.push(item._source);
    });

    return { results, total: body.hits.total.value };
  }

}