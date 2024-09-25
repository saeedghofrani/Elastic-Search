import {DynamicModule, Module} from '@nestjs/common';
import { elasticConstant} from "./elastic-constant";
import {ElasticSearchService} from "./services/elastic-search.service";
import {Client, ClientOptions} from "@elastic/elasticsearch";

@Module({})
export class ElasticModule {
    static register(clientOptions:ClientOptions):DynamicModule{
        return {
            module:ElasticModule,
            providers:[{
                provide:elasticConstant,
                useFactory:()=>{
                    const client=new Client(clientOptions)
                    return client
                }
            }

                ,
                ElasticSearchService],
            global:true,
            exports:[ElasticSearchService,{
                provide:elasticConstant,
                useFactory:()=>{
                    const client=new Client(clientOptions)
                    return client
                }
            }]
        }
    }
}
