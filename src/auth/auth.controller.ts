import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDTO} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";


@Controller()
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('/signup')
    signup(@Body() userDto: CreateUserDTO) {
        return this.authService.signup(userDto);
    }

    @Post('/sigin')
    sigin(@Body() userDto: CreateUserDTO) {
        return this.authService.sigin(userDto);
    }



}
