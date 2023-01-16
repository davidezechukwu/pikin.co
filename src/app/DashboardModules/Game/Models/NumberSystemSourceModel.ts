import SuperModel from '../../../CommonModules/SuperModules/Models/SuperModel';
import NumberSystemModel from './NumberSystemModel';
import SourceModel from './SourceModel';

export default class NumberSystemSourceModel extends SuperModel {
    constructor(
        public NumberSystemID: number | string,
        public SourceID: number | string
    ) {
        super();
    }

    //Navigation Properties
    public NumberSystem: NumberSystemModel;
    public Source: SourceModel;
}
