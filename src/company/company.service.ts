import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from './company.repository';
import { RegisterCompanyDTO, ReqCompanyDTO, updateCompanyDTO } from './dto/company.dto';
import { Company } from './schema/company.schema';
import { User } from 'src/user/schema/user.schema';
import { ObjectId } from 'mongoose';
import { createImageURL } from 'src/shared/multerOptions';

@Injectable()
export class CompanyService {
    constructor(
        private readonly companyRepository: CompanyRepository
    ) {}

    public async registerCompany(createCompanyDto: ReqCompanyDTO, image: string, user: User): Promise<Company> {
        if(user.host == false) throw new ForbiddenException('Not Host');
        
        const imageURL = createImageURL(image);
        const registerCompanyDto: RegisterCompanyDTO = { ...createCompanyDto, image: imageURL, user_id: user._id };
        
        return await this.companyRepository.registerCompany(registerCompanyDto);
    }

    public async getAllCompany(): Promise<Company[]> {
        return await this.companyRepository.getAllCompany();
    }

    public async searchCompany(search_word: string): Promise<Company[]> {
        return await this.companyRepository.searchCompany(search_word);
    }

    async getOneCompany(company_id: ObjectId): Promise<Company> {
        const company =  await this.companyRepository.getCompanyById(company_id);
        if(!company) throw new NotFoundException('Not Found This Company');
        return company;
    }

    async getMyCompany(user: User): Promise<Company> {
        const company = await this.companyRepository.getMyCompany(user._id);
        if(!company) throw new NotFoundException('Not Found Your Company');
        return company;
    }

    public async updateCompany(reqCompanyDto: ReqCompanyDTO, image: string, company_id: ObjectId, user: User): Promise<Company> {
        const imageURL = createImageURL(image);
        const updateCompanyDto: updateCompanyDTO = { ...reqCompanyDto, image: imageURL };
        
        const company = await this.companyRepository.updateCompany(updateCompanyDto, company_id);

        if(!company) throw new NotFoundException('Not Found Company');
        else if(String(company.user_id) === String(user._id)) return await this.companyRepository.updateCompany(updateCompanyDto, company_id);
        else throw new ForbiddenException;
    }
}
