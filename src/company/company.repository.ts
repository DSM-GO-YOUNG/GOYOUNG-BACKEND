import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "./schema/company.schema";
import { Model, ObjectId } from "mongoose";
import { RegisterCompanyDTO } from "./dto/company.dto";

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

    async findCompanyById(company_id: ObjectId): Promise<Company> {
        return await this.companyModel.findById(company_id);
    }

    async findAllCompany(): Promise<Company[]> {
        return await this.companyModel.find();
    }
}