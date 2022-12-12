# Filehash

Interface for communicating with Inter Planatary File System (IPFS) distributed filestore.


*Note (Work in progress!, super unstable ATM) : Inplemented as a handy interface to communicate with IPFS using a locally running NodeJS service accesible as a REST service, 
can be used for a file explorer add on integrating IPFS into native OS 
file explorers like Nautilius on linux platforms; this is still a work in progress for me* 

:)

## Prerequisites
Need a linux system with NodeJS on it.

Before we get started you will need an account at Web 3 Storage at : https://web3.storage/ 

Then you can create an Access Token at https://web3.storage/tokens/ ; This access token needs to be placed in resources/setup/env.sh.

Thats all.

## Starting up
Pull all the dependencies :

`npm install`

Finally run with :

`./run.sh -p 8080`

-p defines the port, default is 11211
