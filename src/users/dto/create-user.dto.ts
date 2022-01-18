import {ApiProperty} from "@nestjs/swagger";
export class CreateUserDTO {

    @ApiProperty({example: 'testlogin', description: 'Логин'})
    readonly login: string;

    @ApiProperty({example: 'testpassword', description: 'Пароль'})
    readonly password: string;
}