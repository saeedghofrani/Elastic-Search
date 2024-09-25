
import {   ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { EsCreateUser } from '../dto/es-create-user.dto';
import {ElasticSearchService} from "../../elastic/services/elastic-search.service";
const esQueryBuilder=require("elastic-builder")

@Injectable()
export class AppService {
  constructor(private elasticSearchService:ElasticSearchService)
    {}
    
  async createIndex(indexName:string)
  {
    return await this.elasticSearchService.createIndex(indexName)
  }

  async createUser(indexName:string,esCreateUserDto:EsCreateUser)
  {
    return await this.elasticSearchService.createUser(indexName, esCreateUserDto)
  }

  async searchBetweenAges(minAge:number,maxAge:number)
  {
    return await this.elasticSearchService.searchBetweenAges(minAge, maxAge)
  }

  async findByAge(age:number)
  {
    return await this.elasticSearchService.findByAge(age)
  }

  async deleteByAge(age:number)
  {
    return await this.elasticSearchService.deleteByAge(age)
  }

  async insertFakeData()
  {
    return await this.elasticSearchService.insertFakeData()
  }

  async getAllData(max:number)
  {
    return await this.elasticSearchService.getAllData(max)
  }

  }
