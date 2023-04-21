import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDTO } from './dto/company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';

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
    async findAllCompany() {
        return await this.companyService.findAllCompany();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/search')
    async searchCompany(
        @Query('word') search_word: string
    ) {
        return await this.companyService.searchCompany(search_word);
    }
}
