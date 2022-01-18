import {
    Body, Controller, Get, Param, Post, UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDTO} from "./dto/create-user.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";

@ApiTags('Пользователи')
@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: 'Получение всех пользователей'})
    @ApiResponse({status: 200, type: [User]})
    @Get('users')
    @UseGuards(JwtAuthGuard)
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Получение пользователя по id'})
    @ApiResponse({status: 200, type: User})
    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @ApiOperation({summary: 'Информация обо мне'})
    @ApiResponse({status: 200, type: User})
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getAboutMe() {
        return this.usersService.getAboutMe();
    }

}