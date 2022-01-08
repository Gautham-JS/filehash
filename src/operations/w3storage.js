const { Web3Storage, getFilesFromPath } = require('web3.storage');
const { create } = require("ipfs-http-client");
const { logger } = require("../utils/logger");

const token = process.env.WEB3STORAGE_TOKEN;

function makeStorageClient() {
  const storage = new Web3Storage({ token });
  return storage;
}


async function addFileToIPFS(path) {
    const files = [];
    const pathFiles = await getFilesFromPath(path);
    files.push(...pathFiles);
    const cid = await storeWithProgress(files);
    logger.info('Content added with CID :', cid);
    return cid;
}

async function listUploads() {
  const client = makeStorageClient();
  let uplist = [];
  let links = [];
  for await (const upload of client.list()) {
    logger.info(`${upload.name} - cid: ${upload.cid} - size: ${upload.dagSize}`);
    let link = await getLinks(upload.cid);
    links.push(link);
    uplist.push(upload);
  }
  logger.info(`found total ${uplist.length} uploads`);
  return [uplist, links];
}

async function getLinks(ipfsPath) {
  const url = 'https://dweb.link/api/v0'
  const ipfs = create({ url });

  const links = []
  for await (const link of ipfs.ls(ipfsPath)) {
    links.push(link)
  }
  console.log(links)
  return links;
}

async function storeWithProgress(files) {  
    // show the root cid as soon as it's ready
    const onRootCidReady = cid => {
      logger.info('uploading files with cid:', cid);
    }
  
    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
    let uploaded = 0
  
    const onStoredChunk = size => {
      uploaded += size
      const pct = totalSize / uploaded
      logger.info(`Uploading... ${pct.toFixed(2)}% complete`)
    }
  
    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return makeStorageClient().put(files, { onRootCidReady, onStoredChunk })
}

module.exports = {
    addFileToIPFS,
    listUploads
}