import { Injectable, Injector } from '@angular/core';
import * as _ from 'lodash';
import { SuperService } from '../../../CommonModules/SuperModules/Services/SuperService.ng';
import MemberModel from '../../../DashboardModules/Security/Models/MemberModel';
import { MemberService } from '../../../DashboardModules/Security/Services/MemberService.ng';
import FormsAuthenticationLoginModel from '../Models/FormsAuthenticationLoginModel';
import FormsAuthenticationRegisterModel from '../Models/FormsAuthenticationRegisterModel';
import FormsAuthenticationResetPasswordModel from '../Models/FormsAuthenticationResetPasswordModel';



@Injectable()
export class AuthenticationService extends SuperService {
    protected _IsAuthenticated?: boolean;
    public get IsAuthenticated(): boolean {
        var me = this;
        var userName = this.GetCookie("username");            
        if (this._IsAuthenticated === undefined  && userName) {
            var member: MemberModel = new MemberModel();
            member.Username = userName;
            me.MemberService.ReadMemberByUsername(member).then(_member => {
                //debugger;
                this.OnAuthentication(true, _member);                
            }).catch(reason => {
                this.OnAuthentication(false, null);                
            });
        } 
        return this._IsAuthenticated;
    }
    public set IsAuthenticated(isAuthenticated:boolean) {
        this._IsAuthenticated = isAuthenticated;
    }
    public AuthenticatedMemberID: any;
    
    constructor(
        protected Injector: Injector,
        protected MemberService: MemberService
    ) { 
        super(Injector);
    };

    SetCookie(cookieName: string, cookieValue: string, cookiePath?: string, keepForDays?:number) {
        var expires = "";
        if (!cookiePath) {
            cookiePath = "/";
        }
        if (keepForDays) {
            var d = new Date();
            d.setTime(d.getTime() + (keepForDays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
        }
        document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=" + cookiePath;
    }

    GetCookie(cookieName) {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    } 

    GetAuthenticatedMember(): Promise<MemberModel> {
        var me = this;
        return new Promise<MemberModel>((resolve, reject) => {            
            if (!this.IsAuthenticated || !this.AuthenticatedMemberID) {
                resolve(null);
            }
            else {
                let member = new MemberModel();
                member.ID = me.AuthenticatedMemberID;
                me.MemberService.ReadMember(member).then(_member => resolve(_member)).catch(reason => reject(reason));
            }            
        });
    };  

    protected OnAuthentication(isAuthenticated: boolean, member: MemberModel): void {
        this.IsAuthenticated = isAuthenticated;
        if (this.IsAuthenticated) {
            this.AuthenticatedMemberID = member.ID;
            this.SetCookie("username", member.Username, "/");            
        } else {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; 
            this.AuthenticatedMemberID = null;
            this.SessionService.ClearSession();
            this.Router.navigate(['/home/']);
        }
        return this.AuthenticatedMemberID;
    }

    public FormAuthenticateSignOut(): void {        
        this.OnAuthentication(false, null);
    }    

    public FormsAuthenticationLogin(formsAuthenticationLogin: FormsAuthenticationLoginModel): Promise<FormsAuthenticationLoginModel> {
        var me = this;
        return new Promise<FormsAuthenticationLoginModel>((resolve, reject) => {
            var member: MemberModel = new MemberModel();
            member.Username = formsAuthenticationLogin.Username;
            //debugger;
            me.MemberService.ReadMemberByUsername(member).then(_member => {              
                //debugger;
                this.OnAuthentication(true, _member);
                resolve(formsAuthenticationLogin);
            }).catch(reason => {
                this.OnAuthentication(false, null);
                reject(this.LocalisationService.CaptionConstants.MemberWasNotFound);
            });
        });
    }

    public FormsAuthenticationRegister(formsAuthenticationRegisterModel: FormsAuthenticationRegisterModel): Promise<FormsAuthenticationRegisterModel> {
        var me = this;
        return new Promise<FormsAuthenticationRegisterModel>((resolve, reject) => {
            var member: MemberModel = new MemberModel();
            member.Username = formsAuthenticationRegisterModel.Username;                
            me.MemberService.ReadMemberByUsername(member).then(_member => {
                me.OnAuthentication(false, null);
                reject(this.LocalisationService.CaptionConstants.MemberAlreadyExists);
            }).catch(reason => {
                me.MemberService.CreateMember(formsAuthenticationRegisterModel).then(_member => {
                    this.OnAuthentication(true, _member);
                    resolve(formsAuthenticationRegisterModel);
                }).catch(reason => reject(reason));                
            }); 
        });
    };

    public FormsAuthenticationResetPassword(formsAuthenticationResetPasswordModel: FormsAuthenticationResetPasswordModel): Promise<FormsAuthenticationResetPasswordModel> {
        return new Promise<FormsAuthenticationResetPasswordModel>((resolve, reject) => {
            resolve(formsAuthenticationResetPasswordModel);
        });
    };    
}

