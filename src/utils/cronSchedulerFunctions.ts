import { CSVIApplyImporter } from "../services/importExternalFiles/csvImports";

export const cronIapplyReplacer=async () => {
    console.log('Running replaceIapplyTable() function...');
    try {
      await CSVIApplyImporter.replaceIapplyTable()
      console.log('IApply table replaced successfully!');
    } catch (error) {
      console.log(error.message);
    }
  }