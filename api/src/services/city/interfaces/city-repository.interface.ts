import { CreateCityDto } from '../dto/create-city.dto';
import { Filter } from '../value-object/filter';

export interface ICityRepository {
  findByName(name: string): Promise<any>;
  insert(createCityDto: CreateCityDto): Promise<any>;
  findByQuery(query: Filter): Promise<{ cities: any[]; total: number }>;
  findById(id: string): Promise<any>;
  update(id: string, updateCityDto: CreateCityDto): Promise<any>;
  deleteById(id: string, name: string): Promise<any>;
}
