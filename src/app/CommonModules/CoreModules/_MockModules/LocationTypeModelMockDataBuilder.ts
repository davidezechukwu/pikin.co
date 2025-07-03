import { LocationTypeModel } from '../Models/LocationTypeModel';
import { SuperModelMockDataBuilder } from '../../SuperModules/_MockModules/SuperModelMockDataBuilder';

export class LocationTypeModelMockDataBuilder extends SuperModelMockDataBuilder {
    BuildMock(): LocationTypeModel[] {
        
        let other = new LocationTypeModel();
        other.ID = this.GetNextID();
        other.Name = "Other";
        other.DisplayName = "Other";

        let villageOrCityOrTown = new LocationTypeModel();
        villageOrCityOrTown.ID = this.GetNextID();
        villageOrCityOrTown.Name = "VillageOrCityOrTown";
        villageOrCityOrTown.DisplayName = "Village/City/Town";

        let stateOrRegionOrCountyOrProvince = new LocationTypeModel();
        stateOrRegionOrCountyOrProvince.ID = this.GetNextID();
        stateOrRegionOrCountyOrProvince.Name = "StateOrRegionOrCountyOrProvince";
        stateOrRegionOrCountyOrProvince.DisplayName = "State/Region/County/Province";

        let country = new LocationTypeModel();
        country.ID = this.GetNextID();
        country.Name = "Country";
        country.DisplayName = "Country";

        let globalRegion = new LocationTypeModel();
        globalRegion.ID = this.GetNextID();
        globalRegion.Name = "GlobalRegion";
        globalRegion.DisplayName = "Global Region";

        return [
            other,
            villageOrCityOrTown,
            stateOrRegionOrCountyOrProvince,
            country,
            globalRegion
        ];
    }
}

export var LocationTypesMock = new LocationTypeModelMockDataBuilder().BuildMock();

 