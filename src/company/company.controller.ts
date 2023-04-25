import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDTO } from './dto/company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    async registerCompany(
        @Body() registerCompanyDto: RegisterCompanyDTO,
        @Req() req: Request,
    ) {
        await this.companyService.registerCompany(registerCompanyDto, req.user as User);
        return { statusCode: 201, message: 'Success Register Company'}
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getAllCompany() {
        return await this.companyService.findAllCompany();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:company_id')
    async getOneCompany(
        @Param('company_id') company_id: ObjectId
    ) {
        return await this.companyService.findOneCompany(company_id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/search')
    async searchCompany(
        @Query('word') search_word: string
    ) {
        return await this.companyService.searchCompany(search_word);
    }
}
