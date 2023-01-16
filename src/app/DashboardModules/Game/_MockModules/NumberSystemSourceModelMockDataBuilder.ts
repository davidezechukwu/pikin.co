import NumberSystemModel from '../Models/NumberSystemModel';
import SourceModel from '../Models/SourceModel';
import NumberSystemSourceModel from '../Models/NumberSystemSourceModel';
import { SourcesMock } from '../_MockModules/SourceModelMockDataBuilder';
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';

export class NumberSystemSourceModelMockDataBuilder extends SuperModelMockDataBuilder{
    public BuildMockDataFor10NumberSystemID(numberSystemID: number | string): SourceModel[] {        
        NumberSystemSourcesMock = [];
        var sources: SourceModel[] = [];
        var numberSystemSource1 = new NumberSystemSourceModel(numberSystemID, SourcesMock[0].ID);       
        var numberSystemSource2 = new NumberSystemSourceModel(numberSystemID, SourcesMock[1].ID);
        var numberSystemSource3 = new NumberSystemSourceModel(numberSystemID, SourcesMock[2].ID);
        numberSystemSource1.ID = this.GetNextID();
        numberSystemSource2.ID = this.GetNextID();                
        numberSystemSource3.ID = this.GetNextID();
        NumberSystemSourcesMock.push(numberSystemSource1);
        NumberSystemSourcesMock.push(numberSystemSource2);
        NumberSystemSourcesMock.push(numberSystemSource3);

        sources.push(SourcesMock[0]);
        sources.push(SourcesMock[1]);
        sources.push(SourcesMock[2]);

        return sources;
    }   
}

export var NumberSystemSourcesMock: NumberSystemSourceModel[] = [];