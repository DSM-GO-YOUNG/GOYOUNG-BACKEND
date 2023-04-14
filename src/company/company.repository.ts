import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "./schema/company.schema";
import { Model } from "mongoose";
import { RegisterCompanyDTO } from "./dto/company.dto";

@Injectable()
export class CompanyRepository {
    constructor(
        @InjectModel(Company.name)
        private companyModel: Model<Company>
    ) {}

    async registerCompany(registerCompanyDto: RegisterCompanyDTO): Promise<Company> {
        const newCompany = new this.companyModel(registerCompanyDto);
        return newCompany.save();
    }
}