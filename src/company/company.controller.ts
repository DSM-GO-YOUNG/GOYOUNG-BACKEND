import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
