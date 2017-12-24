
var translate = require('google-translate-api');
var fs = require('fs');
var readline = require('readline');
var lang = require('./lang_codes.json');
var array = []
var ar_array = [];
var textToTranslate = []

// read text to be translated
var rd = readline.createInterface({
    input: fs.createReadStream('lang_to_translate'),
});

rd.on('line', function (line) {
    textToTranslate.push(line)
}).on('close', function () {
    console.log('translation file has been read')

    var maps = []
    for(var i = 0; i < lang.codes.length;i++) {
        var promises = [];
        var code = lang.codes[i]
        var fileName = './lng/'+code+'.lng'
        var stream = getStream(fileName)
        
        printFiles (code, textToTranslate, stream)
    }
});

// translate each items to diff lang
async function printFiles (code, texts, stream) {
    for(var j = 0; j < texts.length;j++){     
        var text = texts[j].trim()
        var val = await translate(text, { to: code })
        createFile(stream, texts[j].trim().replace(/( |\.|'|-|,|\*|\?|:|\/|\(|\))/g, '') + '=' + val.text + "\n")
    }
}

function getStream(path) {
    return fs.createWriteStream(path)

}

function createFile(stream, text){
    console.log(text)
    stream.write(text)
}

function closeStream(stream) {
    stream.end()
}