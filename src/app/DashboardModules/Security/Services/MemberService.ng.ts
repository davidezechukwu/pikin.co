import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import MemberModel from '../Models/MemberModel';
import FundingModel from '../../../DashboardModules/Funding/Models/FundingModel'
import FormsAuthenticationRegisterModel from '../Models/FormsAuthenticationRegisterModel';
import FormsAuthenticationResetPasswordModel from '../Models/FormsAuthenticationResetPasswordModel';
import { MembersMock } from '../_MockModules/MemberModelMockDataBuilder';
import { SessionService } from '../../../CommonModules/CoreModules/Services/SessionService.ng';
import { FundingService } from '../../../DashboardModules/Funding/Services/FundingService.ng';
import { SuperService } from '../../../CommonModules/SuperModules/Services/SuperService.ng';

@Injectable()
export class MemberService extends SuperService {
    protected Members: MemberModel[] = MembersMock;
    constructor(
        protected Injector: Injector,
        public FundingService: FundingService
    ) {
        super(Injector);
    }

    CreateMember(formsAuthenticationRegisterModel: FormsAuthenticationRegisterModel): Promise<MemberModel> {
        var me = this;
        return new Promise<MemberModel>((resolve, reject) => {
            let newMember: MemberModel = new MemberModel();
            newMember.Username = formsAuthenticationRegisterModel.Username;
            newMember.Name = formsAuthenticationRegisterModel.Username;
            newMember.DisplayName = formsAuthenticationRegisterModel.Username;
            newMember.ID = (me.Members.length + 1).toString();            
            let createdMemberObjectsPromise: [Promise<FundingModel>] = [this.FundingService.CreateFunding(newMember)];
            Promise.all(createdMemberObjectsPromise).then((results: any[]) => {
                newMember.Funding = results[0];
                me.Members.push(newMember);
                resolve(newMember);
            }).catch(reason => reject(reason));            
        });
    };

    ReadMemberByUsername(member: MemberModel): Promise<MemberModel> {
        var me = this;
        return new Promise<MemberModel>((resolve, reject) => {
            var _member = me.Members.find(m => (m.Username.toLocaleLowerCase() == member.Username.toLocaleLowerCase()));
            if (!_member) {
                reject("Member was not found");
            } else {
                let readMemberObjectsPromise: [Promise<FundingModel>] = [me.FundingService.GetFunding(_member)];
                Promise.all(readMemberObjectsPromise).then((results: any[]) => {
                    _member.Funding = results[0];
                    resolve(_member)
                }).catch(reason => reject(reason));
            }
        });
    }

    ReadMember(member: MemberModel): Promise<MemberModel> {
        var me = this;
        return new Promise<MemberModel>((resolve, reject) => {
            var _member = me.Members.find(m => (m.ID !== undefined && member.ID !== undefined && (m.ID.toLocaleLowerCase() == member.ID.toLocaleLowerCase())));
            if (!_member) {
                reject("Member was not found");
            } else {
                let readMemberObjectsPromise: [Promise<FundingModel>] = [me.FundingService.GetFunding(_member)];
                Promise.all(readMemberObjectsPromise).then((results: any[]) => {
                    _member.Funding = results[0];
                    resolve(_member)
                }).catch(reason => reject(reason));
            }
        });
    }

    ReadMembers(fromPage: number, toPage: number): Promise<MemberModel[]> {
        return Promise.resolve(this.Members);
    }

    UpdateMember(member: MemberModel): Promise<MemberModel> {
        return new Promise<MemberModel>((resolve, reject) => {
            //this.FundingService.UpdateFunding(member).then(function (member) {
            //    resolve(member);
            //});
        });
    }
}
