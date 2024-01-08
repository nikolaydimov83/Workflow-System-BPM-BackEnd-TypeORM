
import { IApplyServices } from "../IApplyServices";
import * as path from 'path'
import * as csv from 'csvtojson'

import  { baseDir }from '../../constants'
import { AppDataSource } from "../../data-source";

export  class CSVIApplyImporter{

  static async replaceIapplyTable(){


    const csvFilePath=path.join(baseDir,'services','importExternalFiles','csv','iApply.csv');
    
    let array=[]
    const queryRunner = AppDataSource.createQueryRunner()


    await queryRunner.connect()
    await queryRunner.startTransaction()
    try {
        array=await csv().fromFile(csvFilePath)
        const chunk=200
       
        const itterations=Math.floor(array.length/chunk)
        for (let i = 0; i < itterations*200; i+=200) {
            const subarray=array.splice(0,200);
            await updateIapplyDatabase(subarray,queryRunner)
        }
        await updateIapplyDatabase(array,queryRunner)
        await queryRunner.commitTransaction()
    } catch (error) {
      await queryRunner.rollbackTransaction()
      console.log('IApply table not updated! '+error.message);
        
    }finally{
      await queryRunner.release()
    }
    
    
    
    }

}

async function updateIapplyDatabase(newData,queryRunner) {
  try {
    await IApplyServices.saveAllEntries(newData,queryRunner)
  } catch (error) {
    console.log('IApply table not updated! '+error.message)
  }
  }
