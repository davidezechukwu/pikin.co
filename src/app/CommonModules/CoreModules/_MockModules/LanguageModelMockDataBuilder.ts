﻿import { LanguageModel } from '../Models/LanguageModel';
import { SuperModelMockDataBuilder } from '../../SuperModules/_MockModules/SuperModelMockDataBuilder';

export class LanguageModelMockDataBuilder extends SuperModelMockDataBuilder {    
    BuildLanguagesMock(): LanguageModel[] {
        var rawData = [
            { "code": "ab", "name": "Abkhaz", "nativeName": "аҧсуа", "isrtl" : false},
            { "code": "aa", "name": "Afar", "nativeName": "Afaraf", "isrtl" : false},
            { "code": "af", "name": "Afrikaans", "nativeName": "Afrikaans", "isrtl" : false},
            { "code": "ak", "name": "Akan", "nativeName": "Akan", "isrtl" : false},
            { "code": "sq", "name": "Albanian", "nativeName": "Shqip", "isrtl" : false},
            { "code": "am", "name": "Amharic", "nativeName": "አማርኛ", "isrtl" : false},
            { "code": "ar", "name": "Arabic", "nativeName": "العربية", "isrtl" : true},
            { "code": "an", "name": "Aragonese", "nativeName": "Aragonés", "isrtl" : false},
            { "code": "hy", "name": "Armenian", "nativeName": "Հայերեն", "isrtl" : false},
            { "code": "as", "name": "Assamese", "nativeName": "অসমীয়া", "isrtl" : false},
            { "code": "av", "name": "Avaric", "nativeName": "авар мацӀ, магӀарул мацӀ", "isrtl" : false},
            { "code": "ae", "name": "Avestan", "nativeName": "avesta", "isrtl" : false},  
            { "code": "az", "name": "Azerbaijani", "nativeName": "azərbaycan dili", "isrtl" : false},
            { "code": "bm", "name": "Bambara", "nativeName": "bamanankan", "isrtl" : false},
            { "code": "ba", "name": "Bashkir", "nativeName": "башҡорт теле", "isrtl" : false},
            { "code": "eu", "name": "Basque", "nativeName": "euskara, euskera", "isrtl" : false},
            { "code": "be", "name": "Belarusian", "nativeName": "Беларуская", "isrtl" : false},
            { "code": "bn", "name": "Bengali", "nativeName": "বাংলা", "isrtl" : false},
            { "code": "bh", "name": "Bihari", "nativeName": "भोजपुरी", "isrtl" : false},
            { "code": "bi", "name": "Bislama", "nativeName": "Bislama", "isrtl" : false},
            { "code": "bs", "name": "Bosnian", "nativeName": "bosanski jezik", "isrtl" : false},
            { "code": "br", "name": "Breton", "nativeName": "brezhoneg", "isrtl" : false},
            { "code": "bg", "name": "Bulgarian", "nativeName": "български език", "isrtl" : false},
            { "code": "my", "name": "Burmese", "nativeName": "ဗမာစာ", "isrtl" : false},
            { "code": "ca", "name": "Catalan; Valencian", "nativeName": "Català", "isrtl" : false},
            { "code": "ch", "name": "Chamorro", "nativeName": "Chamoru", "isrtl" : false},
            { "code": "ce", "name": "Chechen", "nativeName": "нохчийн мотт", "isrtl" : false},
            { "code": "ny", "name": "Chichewa; Chewa; Nyanja", "nativeName": "chiCheŵa, chinyanja", "isrtl" : false},
            { "code": "zh", "name": "Chinese", "nativeName": "中文 (Zhōngwén), 汉语, 漢語", "isrtl" : false},
            { "code": "cv", "name": "Chuvash", "nativeName": "чӑваш чӗлхи", "isrtl" : false},
            { "code": "kw", "name": "Cornish", "nativeName": "Kernewek", "isrtl" : false},
            { "code": "co", "name": "Corsican", "nativeName": "corsu, lingua corsa", "isrtl" : false},
            { "code": "cr", "name": "Cree", "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ", "isrtl" : false},
            { "code": "hr", "name": "Croatian", "nativeName": "hrvatski", "isrtl" : false},
            { "code": "cs", "name": "Czech", "nativeName": "česky, čeština", "isrtl" : false},
            { "code": "da", "name": "Danish", "nativeName": "dansk", "isrtl" : false},
            { "code": "dv", "name": "Divehi; Dhivehi; Maldivian;", "nativeName": "ދިވެހި", "isrtl" : true},
            { "code": "nl", "name": "Dutch", "nativeName": "Nederlands, Vlaams", "isrtl" : false},
            { "code": "en", "name": "English", "nativeName": "English", "isrtl" : false},
            { "code": "eo", "name": "Esperanto", "nativeName": "Esperanto", "isrtl" : false},
            { "code": "et", "name": "Estonian", "nativeName": "eesti, eesti keel", "isrtl" : false},
            { "code": "ee", "name": "Ewe", "nativeName": "Eʋegbe", "isrtl" : false},
            { "code": "fo", "name": "Faroese", "nativeName": "føroyskt", "isrtl" : false},
            { "code": "fj", "name": "Fijian", "nativeName": "vosa Vakaviti", "isrtl" : false},
            { "code": "fi", "name": "Finnish", "nativeName": "suomi, suomen kieli", "isrtl" : false},
            { "code": "fr", "name": "French", "nativeName": "français, langue française", "isrtl" : false},
            { "code": "ff", "name": "Fula; Fulah; Pulaar; Pular", "nativeName": "Fulfulde, Pulaar, Pular", "isrtl" : false},
            { "code": "gl", "name": "Galician", "nativeName": "Galego", "isrtl" : false},
            { "code": "ka", "name": "Georgian", "nativeName": "ქართული", "isrtl" : false},
            { "code": "de", "name": "German", "nativeName": "Deutsch", "isrtl" : false},
            { "code": "el", "name": "Greek, Modern", "nativeName": "Ελληνικά", "isrtl" : false},
            { "code": "gn", "name": "Guaraní", "nativeName": "Avañeẽ", "isrtl" : false},
            { "code": "gu", "name": "Gujarati", "nativeName": "ગુજરાતી", "isrtl" : false},
            { "code": "ht", "name": "Haitian; Haitian Creole", "nativeName": "Kreyòl ayisyen", "isrtl" : false},
            { "code": "ha", "name": "Hausa", "nativeName": "Hausa, هَوُسَ", "isrtl" : false},
            { "code": "he", "name": "Hebrew (modern)", "nativeName": "עברית", "isrtl" : true},
            { "code": "hz", "name": "Herero", "nativeName": "Otjiherero", "isrtl" : false},
            { "code": "hi", "name": "Hindi", "nativeName": "हिन्दी, हिंदी", "isrtl" : false},
            { "code": "ho", "name": "Hiri Motu", "nativeName": "Hiri Motu", "isrtl" : false},
            { "code": "hu", "name": "Hungarian", "nativeName": "Magyar", "isrtl" : false},
            { "code": "ia", "name": "Interlingua", "nativeName": "Interlingua", "isrtl" : false},
            { "code": "id", "name": "Indonesian", "nativeName": "Bahasa Indonesia", "isrtl" : false},            
            { "code": "ga", "name": "Irish", "nativeName": "Gaeilge", "isrtl" : false},
            { "code": "ig", "name": "Igbo", "nativeName": "Igbo", "isrtl" : false},
            { "code": "ik", "name": "Inupiaq", "nativeName": "Iñupiaq, Iñupiatun", "isrtl" : false},
            { "code": "io", "name": "Ido", "nativeName": "Ido", "isrtl" : false},
            { "code": "is", "name": "Icelandic", "nativeName": "Íslenska", "isrtl" : false},
            { "code": "it", "name": "Italian", "nativeName": "Italiano", "isrtl" : false},
            { "code": "iu", "name": "Inuktitut", "nativeName": "ᐃᓄᒃᑎᑐᑦ", "isrtl" : false},
            { "code": "ja", "name": "Japanese", "nativeName": "日本語 (にほんご／にっぽんご)", "isrtl" : false},
            { "code": "jv", "name": "Javanese", "nativeName": "basa Jawa", "isrtl" : false},
            { "code": "kl", "name": "Kalaallisut, Greenlandic", "nativeName": "kalaallisut, kalaallit oqaasii", "isrtl" : false},
            { "code": "kn", "name": "Kannada", "nativeName": "ಕನ್ನಡ", "isrtl" : false},
            { "code": "kr", "name": "Kanuri", "nativeName": "Kanuri", "isrtl" : false},
            { "code": "ks", "name": "Kashmiri", "nativeName": "कश्मीरी, كشميري‎", "isrtl" : false},
            { "code": "kk", "name": "Kazakh", "nativeName": "Қазақ тілі", "isrtl" : false},
            { "code": "km", "name": "Khmer", "nativeName": "ភាសាខ្មែរ", "isrtl" : false},
            { "code": "ki", "name": "Kikuyu, Gikuyu", "nativeName": "Gĩkũyũ", "isrtl" : false},
            { "code": "rw", "name": "Kinyarwanda", "nativeName": "Ikinyarwanda", "isrtl" : false},
            { "code": "ky", "name": "Kirghiz, Kyrgyz", "nativeName": "кыргыз тили", "isrtl" : false},
            { "code": "kv", "name": "Komi", "nativeName": "коми кыв", "isrtl" : false},
            { "code": "kg", "name": "Kongo", "nativeName": "KiKongo", "isrtl" : false},
            { "code": "ko", "name": "Korean", "nativeName": "한국어 (韓國語), 조선말 (朝鮮語)", "isrtl" : false},
            { "code": "ku", "name": "Kurdish", "nativeName": "Kurdî, كوردی‎", "isrtl" : false},
            { "code": "kj", "name": "Kwanyama, Kuanyama", "nativeName": "Kuanyama", "isrtl" : false},
            { "code": "la", "name": "Latin", "nativeName": "latine, lingua latina", "isrtl" : false},
            { "code": "lb", "name": "Luxembourgish, Letzeburgesch", "nativeName": "Lëtzebuergesch", "isrtl" : false},
            { "code": "lg", "name": "Luganda", "nativeName": "Luganda", "isrtl" : false},
            { "code": "li", "name": "Limburgish, Limburgan, Limburger", "nativeName": "Limburgs", "isrtl" : false},
            { "code": "ln", "name": "Lingala", "nativeName": "Lingála", "isrtl" : false},
            { "code": "lo", "name": "Lao", "nativeName": "ພາສາລາວ", "isrtl" : false},
            { "code": "lt", "name": "Lithuanian", "nativeName": "lietuvių kalba", "isrtl" : false},            
            { "code": "lv", "name": "Latvian", "nativeName": "latviešu valoda", "isrtl" : false},
            { "code": "gv", "name": "Manx", "nativeName": "Gaelg, Gailck", "isrtl" : false},
            { "code": "mk", "name": "Macedonian", "nativeName": "македонски јазик", "isrtl" : false},
            { "code": "mg", "name": "Malagasy", "nativeName": "Malagasy fiteny", "isrtl" : false},
            { "code": "ms", "name": "Malay", "nativeName": "bahasa Melayu, بهاس ملايو‎", "isrtl" : false},
            { "code": "ml", "name": "Malayalam", "nativeName": "മലയാളം", "isrtl" : false},
            { "code": "mt", "name": "Maltese", "nativeName": "Malti", "isrtl" : false},
            { "code": "mi", "name": "Māori", "nativeName": "te reo Māori", "isrtl" : false},
            { "code": "mr", "name": "Marathi (Marāṭhī)", "nativeName": "मराठी", "isrtl" : false},
            { "code": "mh", "name": "Marshallese", "nativeName": "Kajin M̧ajeļ", "isrtl" : false},
            { "code": "mn", "name": "Mongolian", "nativeName": "монгол", "isrtl" : false},
            { "code": "na", "name": "Nauru", "nativeName": "Ekakairũ Naoero", "isrtl" : false},
            { "code": "nv", "name": "Navajo, Navaho", "nativeName": "Diné bizaad, Dinékʼehǰí", "isrtl" : false},
            { "code": "nb", "name": "Norwegian Bokmål", "nativeName": "Norsk bokmål", "isrtl" : false},
            { "code": "nd", "name": "North Ndebele", "nativeName": "isiNdebele", "isrtl" : false},
            { "code": "ne", "name": "Nepali", "nativeName": "नेपाली", "isrtl" : false},
            { "code": "ng", "name": "Ndonga", "nativeName": "Owambo", "isrtl" : false},
            { "code": "nn", "name": "Norwegian Nynorsk", "nativeName": "Norsk nynorsk", "isrtl" : false},
            { "code": "no", "name": "Norwegian", "nativeName": "Norsk", "isrtl" : false},
            { "code": "ii", "name": "Nuosu", "nativeName": "ꆈꌠ꒿ Nuosuhxop", "isrtl" : false},
            { "code": "nr", "name": "South Ndebele", "nativeName": "isiNdebele", "isrtl" : false},
            { "code": "oc", "name": "Occitan", "nativeName": "Occitan", "isrtl" : false},
            { "code": "oj", "name": "Ojibwe, Ojibwa", "nativeName": "ᐊᓂᔑᓈᐯᒧᐎᓐ", "isrtl" : false},
            { "code": "cu", "name": "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic", "nativeName": "ѩзыкъ словѣньскъ", "isrtl" : false},
            { "code": "om", "name": "Oromo", "nativeName": "Afaan Oromoo", "isrtl" : false},
            { "code": "or", "name": "Oriya", "nativeName": "ଓଡ଼ିଆ", "isrtl" : false},
            { "code": "os", "name": "Ossetian, Ossetic", "nativeName": "ирон æвзаг", "isrtl" : false},
            { "code": "pa", "name": "Panjabi, Punjabi", "nativeName": "ਪੰਜਾਬੀ, پنجابی‎", "isrtl" : false},
            { "code": "pi", "name": "Pāli", "nativeName": "पाऴि", "isrtl" : false},
            { "code": "fa", "name": "Persian", "nativeName": "فارسی", "isrtl" : true},
            { "code": "pl", "name": "Polish", "nativeName": "polski", "isrtl" : false},
            { "code": "ps", "name": "Pashto, Pushto", "nativeName": "پښتو", "isrtl" : false},
            { "code": "pt", "name": "Portuguese", "nativeName": "Português", "isrtl" : false},
            { "code": "qu", "name": "Quechua", "nativeName": "Runa Simi, Kichwa", "isrtl" : false},
            { "code": "rm", "name": "Romansh", "nativeName": "rumantsch grischun", "isrtl" : false},
            { "code": "rn", "name": "Kirundi", "nativeName": "kiRundi", "isrtl" : false},
            { "code": "ro", "name": "Romanian, Moldavian, Moldovan", "nativeName": "română", "isrtl" : false},
            { "code": "ru", "name": "Russian", "nativeName": "русский язык", "isrtl" : false},
            { "code": "sa", "name": "Sanskrit (Saṁskṛta)", "nativeName": "संस्कृतम्", "isrtl" : false},
            { "code": "sc", "name": "Sardinian", "nativeName": "sardu", "isrtl" : false},
            { "code": "sd", "name": "Sindhi", "nativeName": "सिन्धी, سنڌي، سندھی‎", "isrtl" : false},
            { "code": "se", "name": "Northern Sami", "nativeName": "Davvisámegiella", "isrtl" : false},
            { "code": "sm", "name": "Samoan", "nativeName": "gagana faa Samoa", "isrtl" : false},
            { "code": "sg", "name": "Sango", "nativeName": "yângâ tî sängö", "isrtl" : false},
            { "code": "sr", "name": "Serbian", "nativeName": "српски језик", "isrtl" : false},
            { "code": "gd", "name": "Scottish Gaelic; Gaelic", "nativeName": "Gàidhlig", "isrtl" : false},
            { "code": "sn", "name": "Shona", "nativeName": "chiShona", "isrtl" : false},
            { "code": "si", "name": "Sinhala, Sinhalese", "nativeName": "සිංහල", "isrtl" : false},
            { "code": "sk", "name": "Slovak", "nativeName": "slovenčina", "isrtl" : false},
            { "code": "sl", "name": "Slovene", "nativeName": "slovenščina", "isrtl" : false},
            { "code": "so", "name": "Somali", "nativeName": "Soomaaliga, af Soomaali", "isrtl" : false},
            { "code": "st", "name": "Southern Sotho", "nativeName": "Sesotho", "isrtl" : false},
            { "code": "es", "name": "Spanish; Castilian", "nativeName": "español, castellano", "isrtl" : false},
            { "code": "su", "name": "Sundanese", "nativeName": "Basa Sunda", "isrtl" : false},
            { "code": "sw", "name": "Swahili", "nativeName": "Kiswahili", "isrtl" : false},
            { "code": "ss", "name": "Swati", "nativeName": "SiSwati", "isrtl" : false},
            { "code": "sv", "name": "Swedish", "nativeName": "svenska", "isrtl" : false},
            { "code": "ta", "name": "Tamil", "nativeName": "தமிழ்", "isrtl" : false},
            { "code": "te", "name": "Telugu", "nativeName": "తెలుగు", "isrtl" : false},
            { "code": "tg", "name": "Tajik", "nativeName": "тоҷикӣ, toğikī, تاجیکی‎", "isrtl" : false},
            { "code": "th", "name": "Thai", "nativeName": "ไทย", "isrtl" : false},
            { "code": "ti", "name": "Tigrinya", "nativeName": "ትግርኛ", "isrtl" : false},
            { "code": "bo", "name": "Tibetan Standard, Tibetan, Central", "nativeName": "བོད་ཡིག", "isrtl" : false},
            { "code": "tk", "name": "Turkmen", "nativeName": "Türkmen, Түркмен", "isrtl" : false},            
            { "code": "tn", "name": "Tswana", "nativeName": "Setswana", "isrtl" : false},
            { "code": "to", "name": "Tonga (Tonga Islands)", "nativeName": "faka Tonga", "isrtl" : false},
            { "code": "tr", "name": "Turkish", "nativeName": "Türkçe", "isrtl" : false},
            { "code": "ts", "name": "Tsonga", "nativeName": "Xitsonga", "isrtl" : false},
            { "code": "tt", "name": "Tatar", "nativeName": "татарча, tatarça, تاتارچا‎", "isrtl" : false},
            { "code": "tw", "name": "Twi", "nativeName": "Twi", "isrtl" : false},
            { "code": "ty", "name": "Tahitian", "nativeName": "Reo Tahiti", "isrtl" : false},
            { "code": "ug", "name": "Uighur, Uyghur", "nativeName": "Uyƣurqə, ئۇيغۇرچە‎", "isrtl" : false},
            { "code": "uk", "name": "Ukrainian", "nativeName": "українська", "isrtl" : false},
            { "code": "ur", "name": "Urdu", "nativeName": "اردو", "isrtl" : true},
            { "code": "uz", "name": "Uzbek", "nativeName": "zbek, Ўзбек, أۇزبېك‎", "isrtl" : false},
            { "code": "ve", "name": "Venda", "nativeName": "Tshivenḓa", "isrtl" : false},
            { "code": "vi", "name": "Vietnamese", "nativeName": "Tiếng Việt", "isrtl" : false},
            { "code": "vo", "name": "Volapük", "nativeName": "Volapük", "isrtl" : false},
            { "code": "wa", "name": "Walloon", "nativeName": "Walon", "isrtl" : false},
            { "code": "cy", "name": "Welsh", "nativeName": "Cymraeg", "isrtl" : false},
            { "code": "wo", "name": "Wolof", "nativeName": "Wollof", "isrtl" : false},
            { "code": "fy", "name": "Western Frisian", "nativeName": "Frysk", "isrtl" : false},
            { "code": "xh", "name": "Xhosa", "nativeName": "isiXhosa", "isrtl" : false},
            { "code": "yi", "name": "Yiddish", "nativeName": "ייִדיש", "isrtl" : false},
            { "code": "yo", "name": "Yoruba", "nativeName": "Yorùbá", "isrtl" : false},
            { "code": "za", "name": "Zhuang, Chuang", "nativeName": "Saɯ cueŋƅ, Saw cuengh", "isrtl" : false }
        ];
        
        let languagesMock: LanguageModel[] = [];
        rawData.forEach(( data : any) => {
            let language = new LanguageModel();
            language.ID = this.GetNextID();
            language.Name = data.name;
            language.DisplayName = data.nativeName;
            language.ISO639_1Code = data.code;            
            language.IsRTL = data.isrtl;
            languagesMock.push(language);
        });
        languagesMock = languagesMock.sort(( a, b) => { return a.DisplayName > b.DisplayName ? 1 : -1;  });
        return languagesMock;
    }
}

export var LanguagesMock = new LanguageModelMockDataBuilder().BuildLanguagesMock();

