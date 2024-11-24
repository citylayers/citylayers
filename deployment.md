# Deployment


## Neo4j

* [Install](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-neo4j-on-ubuntu-20-04) neo4j
* Import the [dump file](https://drive.google.com/file/d/1lXmp3yo3vVhVCQm8onAll1hxIhcdCzw9/view?usp=sharing)
_Contact [Lovro](mailto:lovro.koncar-gamulin@tuwien.ac.at) to get the access_
* [Setup the database](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-neo4j-on-ubuntu-20-04)

## Node

* Clone the [repo](https://github.com/citylayers/citylayers)
* Install npm packages 
```sh
npm i
```
* set variables in the ```.env``` file (uri, userid and password for newly created neo4j)
* start the server
```sh
npm run start
```

