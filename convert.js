const YAML = require('yamljs');
const fs = require('fs');



const get_string_array = (txt) => {

    var array = txt.split('\n');
    return array;
}

const parse = (file_name, index) => {

    var content = fs.readFileSync('_licenses/' + file_name).toString();
    var slices = content.trim().split('---', 3);
    var license = {};
    const body = YAML.parse(slices[1]);

    try {
        delete body.using;
        delete body.hidden;
        delete body.featured;
        delete body.redirect_from;
    } catch (_) {

    }
    try {
       
    } catch (_) {

    }

    body.text = get_string_array(slices[2]);
    var out_file = file_name.toString().split('.')[0].trim();
    out_file = out_file.toLocaleUpperCase() + '.json';
    const root = body['spdx-id'];
    license[root] = body;
    fs.writeFileSync('output/' + out_file, JSON.stringify(license));

}

var global_json = [];

const appen_jsons = (file_name,index)=>{

    var temp = fs.readFileSync('output/'+file_name).toString();
    global_json.push(temp);
}
const files = fs.readdirSync('_licenses');
files.forEach(parse);
const files_2 = fs.readdirSync('output');
files_2.forEach(appen_jsons);
fs.writeFileSync('global.json',global_json.toString());