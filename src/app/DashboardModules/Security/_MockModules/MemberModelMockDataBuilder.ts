import MemberModel from '../Models/MemberModel'
import SuperModelMockDataBuilder from '../../../CommonModules/SuperModules/_MockModules/SuperModelMockDataBuilder';

export default class MemberModelMockDataBuilder extends SuperModelMockDataBuilder {
    BuildMock(): MemberModel[] {
        var listOfMembers = [
            'Homer Jay Simpson',
            'Marge Simpson',
            'Aristotle Amadopolis',
            'Kent Brockman',
            'Selma Bouvier',
            'Patty Bouvier',
            'Bumblebee Man',
            'Charles Montgomery Burns',
            'Carl Carlson',
            'Comic Book Guy',
            'Disco Stu',
            'Fat Tony',
            'Professor John Frink',
            'Frankie the Squealer',
            'Dr. Julius Hibbert',
            'Krusty the Clown',
            'Otto Mann',
            'Sideshow Bob',
            'Radioactive Man',
            'Apu Nahasapeemapetilon',
            'Principal Seymour Skinner',
            'Waylon Smithers',
            'Moe Szyslak',
            'Kirk Van Houten',
            'Luann Van Houten',
            'Chief Clancy Wiggum',
            'Groundskeeper Willie',
            'Artie Ziff',
            'Agnes Skinner',
            'Mona J. Simpsonu'
        ]

        //debugger;
        var members: MemberModel[] = new Array<MemberModel>();
        for (var a = 0; a < listOfMembers.length; a++) {
            var member: MemberModel = new MemberModel();
            member.ID = a.toString();
            member.Username = "TestMember" + a + "@piKin.co";
            member.DisplayName = listOfMembers[a];
            members.push(member);
        }
        return members;
    }
}

export var MembersMock = new MemberModelMockDataBuilder().BuildMock();