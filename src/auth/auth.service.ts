import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDTO} from "../users/dto/create-user.dto";
import {User} from "../users/users.model";
import {InjectModel} from "@nestjs/sequelize";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService,
                private jwtSecret: JwtService) {}

    async signup(userDto: CreateUserDTO) {
        const checkUser = await this.usersService.getUserByLogin(userDto.login);

        if (checkUser){
            throw new HttpException('Пользователь с таким логином уже зарегистрирован', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.usersService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = {login: user.login, id: user.id};
        return {
            token: this.jwtSecret.sign(payload)
        };

    }

    async sigin(userDto: CreateUserDTO) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    private async validateUser(userDto: CreateUserDTO){
        const user = await this.usersService.getUserByLogin(userDto.login);
        const checkPassword = await bcrypt.comppare(userDto.password, user.password);

        if (user && checkPassword){
            return user;
        } else {
            throw new UnauthorizedException({message: 'Не правильный логин или пароль'});
        }
    }





}
