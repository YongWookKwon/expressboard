// <files.js> //
//==dependencies==//
const express = require('express');
const router = express.Router();
const File = require('../models/File');


//==routing==//
router.get('/:severFileName/:originalFileName', (req, res) => {
    File.findOne({serverFileName:req.params.severFileName, originalFileName:req.params.originalFileName}, (err, file) => {
        if(err) return res.json(err);

        let stream = file.getFileStream();
        if(stream) {
            res.writeHead(200, {
                'Content-Type' : 'application/octet-stream; charset=utf-8',
                'Content-Disposition' : 'attachment; filename=' + encodeURI(file.originalFileName)
            });
            stream.pipe(res);  //파일스트림과 res연결
        } else {
            res.statusCode = 404;
            res.end();
        }
    });
});

module.exports = router;