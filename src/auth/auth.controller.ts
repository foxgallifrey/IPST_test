import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDTO} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Регистрация/авторизация')
@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiOperation({summary: 'Регистрация'})
    @ApiResponse({status: 200, type: 'token'})
    @Post('/signup')
    signup(@Body() userDto: CreateUserDTO) {
        return this.authService.signup(userDto);
    }

    @ApiOperation({summary: 'Авторизация'})
    @ApiResponse({status: 200, type: 'token'})
    @Post('/sigin')
    sigin(@Body() userDto: CreateUserDTO) {
        return this.authService.sigin(userDto);
    }



}
