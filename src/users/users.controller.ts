import {
    Body, Controller, Get, Param, Post, UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDTO} from "./dto/create-user.dto";
import {JwtAuthGuard} from "./jwt-auth.guard";

@Controller()
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get('users')
    @UseGuards(JwtAuthGuard)
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get('user/:id')
    @UseGuards(JwtAuthGuard)
    getUserById(@Param('id') id: string) {
        return this.usersService.getUserById(id);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getAboutMe() {
        return this.usersService.getAboutMe();
    }

}