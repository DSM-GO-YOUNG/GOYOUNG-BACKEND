import { Injectable } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { RegisterCompanyDTO, CreateCompanyDTO } from './dto/company.dto';
import { Company } from './schema/company.schema';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {}

    public async registerCompany(createCompanyDto: CreateCompanyDTO, user: User): Promise<Company> {
        const registerCompanyDto: RegisterCompanyDTO = { ...createCompanyDto, user_id: user._id };
        
        return await this.companyRepository.registerCompany(registerCompanyDto);
    }
}
