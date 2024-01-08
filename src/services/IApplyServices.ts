import { AppDataSource } from "../data-source";
import { IApply } from "../entity/IApply";

const iApplyDataRepository=AppDataSource.getRepository(IApply)
export class IApplyServices{

    static async readIapplyData(iApplyId:string){
        return await iApplyDataRepository.findOne({where:{iApplyId:iApplyId} });
    }

    static async deleteAll(){
        await iApplyDataRepository.delete({})
        return 'All entries in I apply table successfuly deleted'
    }

    static async saveAllEntries(entries:IApply[],queryRunner){
        await queryRunner.manager.save(IApply, entries);
    }
}