const fs = require('fs');
const YAML = require('yamljs');


const read = async (file_name) => {

    return new Promise((resolve, reject) => {
        fs.readFile('_licenses/' + file_name, (err, data) => {
            if (err) reject(err);
            else {
                var data = data.toString();
                resolve(data);
            }
        })
    })
};


const parse = async (data) => {
    return new Promise((resolve, reject) => {
        var license = new Object;
        var head = data.split('---')[1].toString();
        var text = data.split('---')[2].toString();
        var json;
        try {

            json = YAML.parse(head);

            delete json['featured'];
            delete json['hidden'];
            delete json['using'];
            delete json['redirect_from']
        } catch{
            reject("Could not parse");
        }
        json['license'] = text.split("\n");

        const id = json['spdx-id'];

        license[id] = json;
        toWrite = {};
        toWrite['id'] = id;
        toWrite['data'] = license;

        resolve(JSON.stringify(toWrite));
    });
}

const write = async (obj) => {
    return new Promise((resolve, reject) => {
        var data;
        var name;
        try {
            name = JSON.parse(obj)['id'];
            data = JSON.stringify(JSON.parse(obj)['data']);

        } catch (error) {
            reject(error);
        }
        fs.writeFileSync('output/' + name + '.json', data);
        resolve();
    });
};





module.exports.convert = main = () => {
    fs.readdir('_licenses', (err, files) => {
        if (err) throw new Error("some Error Ocuured");
        files.forEach((file, index) => {
            read(file).then((data) => {
                parse(data).then((obj) => {
                    write(obj);
                }).catch((err) => {
                    console.log(err);
                }).finally(() => {
                });
            });
        });

    })
};

main();