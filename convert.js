const YAML = require('yamljs');
const fs = require('fs');
const util = require('util');



const get_string_array = (txt) => {

    var array = txt.split('\n');
    return array;
}


const parse = async (file_name, index) => {
        console.log(file_name.toString());
        fs.readFile('_licenses/' + file_name, (err, content) => {
            if(err) reject(err);

            var slices = content.toString().trim().split('---', 3);
            var license = {};
            const body = YAML.parse(slices[1]);

            try {
                delete body.using;
                delete body.hidden;
                delete body.featured;
                delete body.redirect_from;
            } catch (_) {

            }
         

            body.text = get_string_array(slices[2]);
            var out_file = file_name.toString().split('.')[0].trim();
            out_file = out_file.toLocaleUpperCase() + '.json';
            const root = body['spdx-id'];
            license[root] = body;

            fs.writeFile('output/'+out_file,JSON.stringify(license));
        });
}


util.promisify(parse)


var global_json = [];


fs.readdir('./_licenses',(err,files)=>
{
Promise.all(parse).then((d)=>{
    //
}).catch((err)=>{
    //
});
});




