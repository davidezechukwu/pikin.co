import SuperModel from '../../SuperModules/Models/SuperModel';

export default class LanguageModel extends SuperModel {    
    public ISO639_1Code: string;
    public ISO639_2Code: string;   
    public IsRTL: boolean = false;
}
