import {ConflictException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {elasticConstant} from "../elastic-constant";
import {Client} from "@elastic/elasticsearch";
import {EsCreateUser} from "../../app/dto/es-create-user.dto";

@Injectable()
export class ElasticSearchService {
    constructor(@Inject(elasticConstant) private elasticSearchService:Client)
    {}

    async createIndex(indexName:string)
    {
        const checkIndex=await this.elasticSearchService.indices.exists({index:indexName})

        if (!checkIndex) {
            const createIndex=await this.elasticSearchService.indices.create({index:indexName})
            return createIndex
        }

        if (checkIndex) {
            throw new ConflictException("Index Already exist")
        }
    }

    async createUser(indexName:string,esCreateUserDto:EsCreateUser)
    {
        const checkIndexExist=await this.elasticSearchService.indices.exists({index:indexName})
        if(checkIndexExist)
        {
            const createUser=new EsCreateUser()
            createUser.name=esCreateUserDto.name
            createUser.age=esCreateUserDto.age
            const saveCreatedUser=await this.elasticSearchService.index({index:indexName,body:createUser})
            return saveCreatedUser
        }

        if (!checkIndexExist)
            throw new NotFoundException("Index Not Exist")
    }

    async searchBetweenAges(minAge:number,maxAge:number)
    {
        const search=await this.elasticSearchService.search({index:"posts",from:0,size:1000,query:{
                range:{
                    age:{
                        gte:minAge,
                        lte:maxAge
                    }}}
        })
        return search.hits.hits
    }

    //Query With Two Field
    async findByAge(age:number)
    {
        const findMatch=await this.elasticSearchService.search({index:"posts",query:{
                bool:{
                    must:[
                        {
                            match:{
                                age
                            },

                        },
                        {
                            match:{
                                _id:"PgG2cYIBdmYUT3ZzwrlN"
                        }}
                    ]
                }
            }})
        return findMatch.hits.hits
    }

    async deleteByAge(age:number)
    {
        const deleteUsersWithIds=await this.elasticSearchService.deleteByQuery({index:"posts",query:{
                bool:{
                    must:[
                        {
                        match:{
                            age
                        }
                    },
                        {
                            match:{
                                _id:"PgG2cYIBdmYUT3ZzwrlN"
                            }
                        }
                    ]

                }
            }})

        return deleteUsersWithIds
    }

    async insertFakeData()
    {
        for (let i = 0; i < 5000; i++) {
            const checkDuplicate=await this.elasticSearchService.search({index:"posts",query:{
                    match:{
                        name:`mamad_${i}`
                    }
                }})
            if (checkDuplicate.hits.hits.length !> 0)
            {
                const user:EsCreateUser=
                    {
                        name:`mamad_${i}`,
                        age:i
                    }
                const insertFakeData=await this.elasticSearchService.index({index:"posts",body:user})
                console.log(insertFakeData._seq_no);
            }
        }

    }

    async getAllData(max:number)
    {
        const getAllDataWIthMax=await this.elasticSearchService.search({index:"posts",size:max,query:{
                match_all:{}
            }})
        return
    }
}