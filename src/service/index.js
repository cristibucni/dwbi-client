import FirstDBService from './FirstDBService';
import SecondDBService from './SecondDBService';
import GlobalDBService from './GlobalDBService';

export const SERVICE_MAPPING = {
  firstdb: FirstDBService,
  seconddb: SecondDBService,
  globaldb: GlobalDBService,
};
