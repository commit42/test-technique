# Test technique Node

## Compte Rendu Test technique Node

Pour la documentation et tester l'API directement, la page d'accueil est une interface Swagger (layout de base).

### TODO

- Mise en place d'un système d'authentification (utilisateur + jeton) ?
- ...

## Sujet Test technique Node

### Requis

Ce test est prévu pour fonctionner avec `docker` et `docker-compose` et nous vous recommandons son utilisation (tous nos projets tournent sous docker en dev), néanmoins vous pouvez faire en sorte de le faire tourner directement sur votre poste via un autre système.

### Installation

Avec docker rien de plus simple :

`docker-compose up -d`

L'API sera donc accessible sur [http://0.0.0.0:9000/](http://0.0.0.0:9000/) et devrait vous afficher `{"message":"Hello World"}`

Libre à vous de changer le port via le fichier docker-compose.yml si celui-ci n'est pas disponible.

### Environnement

Le projet est configuré pour tourner avec node 12, néanmoins si vous décidiez de ne pas utiliser docker cela devrait fonctionner sans problème sur des versions inférieures ou supérieures.

Une config eslint est présente, vous pouvez lancer la commande `npm run lint` pour vérifier que tout est conforme.

### Sujet

Le but du test est de créer une API node via Express (qui est déjà installé et configuré très sommairement) qui servirait de middleware afin de récupérer les informations d'un pays provenant de plusieurs sources de données (une api et un fichier).

- API :

La première source est l'API [http://restcountries.eu/](http://restcountries.eu/) qui permet de retourner les informations d'un pays en fonction de son nom, son code...

- Fichier :

Il s'agit d'un fichier CSV contenant des informations supplémentaires par pays, comme le nom du président et le nom de l'hymne nationnal.

Par exemple, un appel à [http://0.0.0.0:9000/country/FRA](http://0.0.0.0:9000/country/FRA) devrait nous retourner ce résultat :

```json
{
    "name": "France",
    "code": "FRA",
    "region": "Europe",
    "capital": "Paris",
    "president": "Emmanuel Macron",
    "anthem": "La Marseillaise"
}
```

### Resources

- [https://expressjs.com/fr/](https://expressjs.com/fr/)
- [https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb](https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb)
- [https://www.grafikart.fr/tutoriels/nodejs-intro-792](https://www.grafikart.fr/tutoriels/nodejs-intro-792)
