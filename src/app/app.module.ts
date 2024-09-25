import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { AppController } from './controllers/app.controller';
import { AppService } from './service/app.service';
import {ElasticModule} from "../elastic/elastic.module";

@Module({
  imports:[ElasticModule.register({node:"http://localhost:9200",auth:{username:"elastic",password:"1Mwy_vm1WBxz-ytzaWyS"}})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

