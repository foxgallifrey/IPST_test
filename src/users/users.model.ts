import {Column, DataType, Model, Table} from "sequelize-typescript";
import {Exclude} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

interface UserCreationAttr {
    login: string;
    password: string
}

@Table ({tableName: 'users'})
export class User extends Model<User, UserCreationAttr>{

    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'testlogin', description: 'Логин'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @ApiProperty({example: 'testpassword', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

}
