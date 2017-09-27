var mocha = require('mocha')
var assert = require("assert");
var describe = mocha.describe;
var it = mocha.it;

//tests using nedb
var nss = require('../index.js').init(
        {
            dataBase: "nedb",
            neDbDataPath: "",
            neDbInMemoryOnly: true
        });

//tests using mongogdb
// var nss = require('../index.js').init(
//         {
//             dataBase: "mongodb", 
//             mongoDatabase: "mongodb://127.0.0.1:27017/nodeSugestiveSearchTest"
//         });

describe('Test -', () => {
    it('load json file test.json', () => {
        return nss.loadJson("test/test.json")
            .then(data => {
                assert(
                    data != null &&
                    data.words == 18 &&
                    data.items == 6,
                    "Could not load json file."
                );
            });
    });

    it('load json string', () => {
        return nss.loadJsonString(`[{"nm":"WHISKY RED LABEL","id":"1","kw": "fancy"},
                                    {"nm":"WHISKY BLACK LABEL","id":"2"},
                                    {"nm":"BLACK FOREST BEECHWOOD HAM L/S","id":"3"},
                                    {"nm":"PESTO PARMESAN HAM","id":"4"},
                                    {"nm":"DELI SWEET SLICE SMOKED HAM","id":"5"},
                                    {"nm":"LABELY BUTTER","id":"7"},
                                    {"nm":"WINE D'VINE","id":"8"},
                                    {"nm":"WINE RED OLD LABEL","id":"9"},
                                    {"nm":"BLOOD-RED WINE","id":"10"},
                                    {"nm":"COFFE MEU CAFÉ BRASILEIRO","id":"11"},
                                    {"nm":"X-14 ULTRA CLEANER","id":"12"}]`, 
                                    "id", "nm", "kw")
            .then(data => {
                assert(
                    data != null &&
                    data.words == 30 &&
                    data.items == 11,
                    "Could not load json string."
                );
            });
    });

    it('query for: whisky red label', () => {
        return nss.query("whisky red label")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 3 &&
                    data.words[0] == "WHISKY" &&
                    data.words[1] == "RED" &&
                    data.words[2] == "LABEL" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "1",
                    "Error on query for: whisky red label"
                );
            });
    });


    it('query for: "whisky label"', () => {
        return nss.query("\"whisky label\"")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.itemsId.length == 0 &&
                    "Error on query for: \"whisky label\""
                );
            });
    });
    
    it('query for: "red label"', () => {
        return nss.query("\"red label\"")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.words[0] == "RED" &&
                    data.words[1] == "LABEL" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "1",
                    "Error on query for: \"red label\""
                );
            });
    });

    it('query for: "label red"', () => {
        return nss.query("\"label red\"")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.words[0] == "LABEL" &&
                    data.words[1] == "RED" &&
                    data.itemsId.length == 0,
                    "Error on query for: \"label red\""
                );
            });
    });    

    it('query for: D\'VINE', () => {
        return nss.query("D'VINE")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 1 &&
                    data.words[0] == "D'VINE" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "8",
                    "Error on query for: D'VINE"
                );
            });
    });        

    it('query for: Red-Blood', () => {
        return nss.query("Red-Blood")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.words[0] == "RED" &&
                    data.words[1] == "BLOOD" &&
                    data.itemsId.length == 0,
                    "Error on query for: Red-Blood"
                );
            });
    });         

    it('query for: Blood-Red', () => {
        return nss.query("Blood-Red")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.words[0] == "BLOOD" &&
                    data.words[1] == "RED" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "10",
                    "Error on query for: Blood-Red"
                );
            });
    });   


    it('query for: Meu Cafe', () => {
        return nss.query("Meu Cafe")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.words[0] == "MEU" &&
                    data.words[1] == "CAFÉ" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "11",
                    "Error on query for: Meu Cafe"
                );
            });
    });   

    it('query for: Mêú Cãfé', () => {
        return nss.query("Mêú Cãfé")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.words[0] == "MEU" &&
                    data.words[1] == "CAFÉ" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "11",
                    "Error on query for: Mêú Cãfé"
                );
            });
    });       

    it('query for: wisk read labl', () => {
        return nss.query("wisk read labl")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 3 &&
                    data.words[0] == "WHISKY" &&
                    data.words[1] == "RED" &&
                    data.words[2] == "LABEL" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "1",
                    "Error on query for: wisk read labl"
                );
            });
    });

    it('query for: X-14', () => {
        return nss.query("X-14")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 2 &&
                    data.words[0] == "X" &&
                    data.words[1] == "14" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "12",
                    "Error on query for: X-14"
                );
            });
    });  

    it('query for: HAM L/S', () => {
        return nss.query("HAM L/S")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 3 &&
                    data.words[0] == "HAM" &&
                    data.words[1] == "L" &&
                    data.words[2] == "S" &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "3",
                    "Error on query for: HAM L/S"
                );
            });
    });  

    it('insert item: 9 - VODKA ABSOLUTE', () => {
        return nss.insertItem({ "itemName": "VODKA ABSOLUTE", "itemId": "9" })
            .then(data => {
                assert(
                    data != null &&
                    data.timeElapsed >= 0,
                    "Error on inserting item: 9 - VODKA ABSOLUTE"
                );
            });
    });

    it('query for: absolut', () => {
        return nss.query("absolut")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 1 &&
                    data.itemsId.length == 1 &&
                    data.itemsId[0] == "9",
                    "Error on query for: absolut"
                );
            });
    });

    it('get words suggestions for: lab', () => {
        return nss.getSuggestedWords("lab")
            .then(data => {
                assert(
                    data != null &&
                    data.suggestions.length == 2 &&
                    data.suggestions[0] == "LABEL" &&
                    data.suggestions[1] == "LABELY",
                    "Error on get words suggestions for: lab"
                );
            });
    });
    

    it('get words suggestions for: fanc', () => {
        return nss.getSuggestedWords("fanc")
            .then(data => {
                assert(
                    data != null &&
                    data.suggestions.length == 1 &&
                    data.suggestions[0] == "fancy",
                    "Error on get words suggestions for: fanc"
                );
            });
    });

    it('get items suggestions for: L/S', () => {
        return nss.getSuggestedItems("L/S")
            .then(data => {
                assert(
                    data != null &&
                    data.items.length == 1 &&
                    data.items[0].itemName == "BLACK FOREST BEECHWOOD HAM L/S",
                    "Error on get items suggestions for: L/S"
                );
            });
    });


    it('get items suggestions for: FANC', () => {
        return nss.getSuggestedItems("FANC")
            .then(data => {
                assert(
                    data != null &&
                    data.items.length == 1 &&
                    data.items[0].itemName == "WHISKY RED LABEL",
                    "Error on get items suggestions for: FANC"
                );
            });
    });

    it('get items suggestions for: whisky', () => {
        return nss.getSuggestedItems("whisky")
            .then(data => {
                assert(
                    data != null &&
                    data.items.length == 2 &&
                    data.items[0].itemName == "WHISKY RED LABEL" &&
                    data.items[1].itemName == "WHISKY BLACK LABEL",
                    "Error on get items suggestions for: whisky"
                );
            });
    });

    it('remove item 9', () => {
        return nss.removeItem("9")
            .then(data => {
                assert(
                    data != null &&
                    data.timeElapsed >= 0,
                    "Error on removing item 9"
                );
            });
    });

    it('query for: absolut', () => {
        return nss.query("absolut")
            .then(data => {
                assert(
                    data != null &&
                    data.words.length == 1 &&
                    data.words[0] == null &&
                    data.itemsId.length == 0,
                    "Error on query for: absolut"
                );
            });
    });
});