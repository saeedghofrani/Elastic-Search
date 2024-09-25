import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from '../service/app.service';
import { EsCreateUser } from '../dto/es-create-user.dto';
import {MaxNumber} from "../decorators/max.validate.decorator";

@ApiTags("Elastic Search")
@Controller("es")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("create/index/:name")
 async getHello(@Param("name") indexName:string):Promise<any> {
    return this.appService.createIndex(indexName);
  }

  @Post("create/user/:index")
  async createUser(@Param("index") indexName:string,@Body() esCreateUserDto:EsCreateUser)
  {
    return this.appService.createUser(indexName,esCreateUserDto)
  }

  @Get("search/between/:minAge/:maxAge")
  async searchBetweenAges(@Param("minAge") minAge:number,@Param("maxAge") maxAge:number)
  {
    return this.appService.searchBetweenAges(minAge,maxAge)
  }

  @Get("find/by/age/:age")
  async match(@Param("age") age:number)
  {
    return this.appService.findByAge(age)
  }

  @Get("delete/users/by/age/:age")
  async deleteByAge(@Param("age") age:number)
  {
    return this.appService.deleteByAge(age)
  }

  @Get("fake")
  async insertFakeData()
  {
    return this.appService.insertFakeData()
  }

    @Get("get/all/:max")
    async getAllData(@Param("max") max:number)
    {
        return this.appService.getAllData(max)
    }
}
