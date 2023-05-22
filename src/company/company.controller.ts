import { Body, Controller, Get, Param, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CompanyService } from './company.service';
import { RegisterCompanyDTO } from './dto/company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('company')
export class CompanyController {
    constructor(
        private readonly companyService: CompanyService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    @UseInterceptors(FileInterceptor('image'))
    async registerCompany(
        @Body() registerCompanyDto: RegisterCompanyDTO,
        @Req() req: Request,
        @UploadedFile() image: Express.Multer.File,
    ) {
        await this.companyService.registerCompany(registerCompanyDto, image.originalname, req.user as User);
        return { statusCode: 201, message: 'Success Register Company'}
    }
    
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    async getAllCompany() {
        return await this.companyService.getAllCompany();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/my')
    async getMyCompany(
        @Req() req: Request
    ) {
        return await this.companyService.getMyCompany(req.user as User);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/search')
    async searchCompany(
        @Query('word') search_word: string
    ) {
        return await this.companyService.searchCompany(search_word);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:company_id')
    async getOneCompany(
        @Param('company_id') company_id: ObjectId
    ) {
        return await this.companyService.getOneCompany(company_id);
    }
}
