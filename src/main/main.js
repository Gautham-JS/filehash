const express = require("express");
const cors = require('cors');
const fs = require("fs");
const multiparty = require('multiparty');
const w3st = require("../operations/w3storage");
const { logger } = require("../utils/logger");

const app = express();
const PORT = 11311;
const srcbase = "/tmp/";
const dest = "/home/gautham/Documents/codes/ipfsnode/spooldir/";

const rootdir = process.env.ROOTDIR;


app.use(express.json());
app.use(cors({
    methods: 'GET,POST,PATCH,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
    origin: 'http://127.0.0.1:5500'
}));
app.options('*', cors());





function rootHandler(req, res){
    logger.info("Received root level request");
    res.status(200).send("Data store listening...");
}

function homePresentation(req, res){
    logger.info("Received home presentation request");
    res.sendFile('/presentation/html/main.html', { root:  rootdir});
}

function fileTransferPresentation(req, res) {
    logger.info("Received transfer presentation request");
    res.sendFile('/presentation/html/filetransfer.html', { root:  rootdir});
}

function fileUploadPresentation(req, res) {
    logger.info("Received pool presentation request");
    res.sendFile('/presentation/html/filepool.html', { root:  rootdir});
}

function fileAccessPresentation(req, res) {
    logger.info("Received access presentation request");
    res.sendFile('/presentation/html/fileaccess.html', { root:  rootdir});
}


function getFile(req, res) {
    logger.info("Received IPFS Upload request...");
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        const filepath = moveToSpooldir(files);
        logger.info("Adding... " + filepath);
        w3st.addFileToIPFS(filepath).then((value) => {
            res.status(200).json({
                cid: value
            });
        });
    });
}


function listFiles(req, res) {
    logger.info("Starting list files operation...");
    w3st.listUploads().then((value) => {
        logger.info("Finished list operation");
        res.status(200).json({
            links:value[1],
            uploads:value[0]
        });
    });
}

function getPage(req, res) {
    logger.info("Getting page info..");

}

function moveToSpooldir(files) {
    const opath = files.IPFSdocument[0].path;
    const npath = dest + files.IPFSdocument[0].originalFilename;
    logger.info("creating " + npath);
    fs.rename(opath, npath, function (err) {
        if (err) throw err
        logger.info('Successfully renamed - AKA moved!');
    });
    return npath;
}

app.get("/home", homePresentation);
app.get("/filetx", fileTransferPresentation);
app.get("/upload", fileUploadPresentation);
app.get("/access", fileAccessPresentation);

app.post("/ipfs/upload", getFile);
app.get("/ipfs/list", listFiles);

app.get("/styles/:file", function (req, res, next) {
    logger.info("Getting file " + req.params.file);
    let fname = req.params.file;
    res.sendFile(`/presentation/css/${fname}`, { root:  rootdir});
});
app.get("/src/:file", function (req, res, next) {
    logger.info("Getting file " + req.params.file);
    let fname = req.params.file;
    res.sendFile(`/presentation/src/${fname}`, { root:  rootdir});
});

app.get("/res/fonts/:family/:file", function (req, res, next) {
    logger.info("Getting file " + req.params.file);
    let fname = req.params.file;
    let family = req.params.family;
    res.sendFile(`/presentation/resources/Fonts/${family}/${fname}`, { root:  rootdir});
});

app.listen(PORT, function () {
    logger.info("DSTORE Server running on port : " + PORT + "...");
});