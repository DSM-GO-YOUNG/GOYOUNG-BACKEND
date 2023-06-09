import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "./schema/company.schema";
import { Model, ObjectId } from "mongoose";
import { RegisterCompanyDTO, updateCompanyDTO } from "./dto/company.dto";

@Injectable()
export class CompanyRepository {
    constructor(
        @InjectModel(Company.name)
        private companyModel: Model<Company>
    ) {}

    async registerCompany(registerCompanyDto: RegisterCompanyDTO): Promise<Company> {
        const newCompany = new this.companyModel(registerCompanyDto);
        return await newCompany.save();
    }

    async getCompanyById(company_id: ObjectId): Promise<Company> {
        return await this.companyModel.findById(company_id);
    }

    async getAllCompany(): Promise<Company[]> {
        return await this.companyModel.find();
    }

    async searchCompany(search_word: string): Promise<Company[]> {
        return await this.companyModel.find({ name: { $regex: `.*${search_word}.*`, $options: 'i' } });
    }

    async getMyCompany(user_id: ObjectId): Promise<Company> {
        return await this.companyModel.findOne({ user_id });
    }

    async updateCompany(updateCompanyDto: updateCompanyDTO, company_id: ObjectId): Promise<Company> {
        await this.companyModel.findByIdAndUpdate(company_id, updateCompanyDto);
        return this.companyModel.findById(company_id);
    }
}