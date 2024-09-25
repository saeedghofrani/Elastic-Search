import { ApiProperty } from "@nestjs/swagger"

export class EsCreateUser{
    @ApiProperty()
    name:string

    @ApiProperty()
    age:number
}