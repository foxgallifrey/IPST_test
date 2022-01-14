import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDTO} from "./dto/create-user.dto";
import {Inject, Injectable} from "@nestjs/common";
import {User} from "./users.model";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {JwtService} from "@nestjs/jwt";


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                @Inject(REQUEST) private readonly request: Request,
                private jwtService: JwtService){}

    public public_attributes = ['id', 'login', 'createdAt', 'updatedAt'];


    async getAllUsers() {
        const users = await this.userRepository.findAll({attributes: this.public_attributes});
        return users;
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findByPk(id, {attributes: this.public_attributes});
        return user;
    }

    async getUserByLogin(login: string){
        const user = await this.userRepository.findOne({
            where: {login}, include: {all: true}
        });
        return user;
    }

    async createUser(dto: CreateUserDTO) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAboutMe() {
        const authHeader = this.request.headers.authorization;
        const bearer = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];
        const user = this.jwtService.verify(token);
        return {
            'login': user.login,
            'id': user.id,
            'createdAt': user.createdAt,
            'updatedAt': user.updatedAt
        };
    }
}
