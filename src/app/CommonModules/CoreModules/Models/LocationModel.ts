import { SuperModel } from '../../SuperModules/Models/SuperModel';
import { LocationTypeModel } from './LocationTypeModel'

export class LocationModel extends SuperModel {    
    public ISO2Code: string = '';
    public ParentID: string = '';
    public LocationType: LocationTypeModel | null | undefined;
}
