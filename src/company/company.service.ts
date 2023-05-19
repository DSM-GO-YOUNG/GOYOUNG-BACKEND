import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { RegisterCompanyDTO, CreateCompanyDTO } from './dto/company.dto';
import { Company } from './schema/company.schema';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';
import { createImageURL } from 'src/shared/multerOptions';

@Injectable()
export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {}

    public async registerCompany(createCompanyDto: CreateCompanyDTO, image: string, user: User): Promise<Company> {
        if(user.host == false) throw new ForbiddenException('Not Host');
        
        const imageURL = createImageURL(image);
        const registerCompanyDto: RegisterCompanyDTO = { ...createCompanyDto, image: imageURL, user_id: user._id };
        
        return await this.companyRepository.registerCompany(registerCompanyDto);
    }

    public async findAllCompany(): Promise<Company[]> {
        return await this.companyRepository.getAllCompany();
    }

    public async searchCompany(search_word: string): Promise<Company[]> {
        return await this.companyRepository.searchCompany(search_word);
    }

    async findOneCompany(company_id: ObjectId): Promise<Company> {
        const company =  await this.companyRepository.getCompanyById(company_id);
        if(!company) throw new NotFoundException('Not Found This Company');
        return company;
    }
}
