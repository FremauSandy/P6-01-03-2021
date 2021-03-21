# P6 So-Pekocko

Voici le MVP du projet 6, du parcours Développeur Web d'OC.

So-Pekocko est une application permettant à des utilisateurs d'ajouter des sauces et d'interagir avec les autres en likant 👍 ou dislikant 👎 leurs sauces.

Prérequis:

Au préalable, vous devrez avoir installé localement sur votre ordinateur :

    Node,
    npm,
    Angular CLI 0.13.0
    Telecharger la partie frontend depuis le repo :https://github.com/OpenClassrooms-Student-Center/dwj-projet6

Côté Frontend :

    Aller sur votre terminal
    Accéder au dossier frontend dwj-projet6 avec : cd dwj-projet6
    Lancer le serveur côté frontend : ng serve
    Il est important de garder ce terminal ouvert durant toute votre session sur le site

Côté Backend :

    Ouvrir un second terminal
    Accéder au backend : cd backend
    Installer NPM : npm install
    Pour utiliser le serveur, chargez le package nodemon : npm install -g nodemon
    Lancer le serveur côté backend : nodemon server
    Garder ce terminal ouvert durant toute votre session sur le site

Pour finir :

Vous pouvez désormais accéder à l'adresse suivante : http://localhost:4200/login

Connexion :

Une fois sur l'appli, l'utilisateur devra s'inscrire en donnant une adresse mail et un mot de passe ayant au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole pour un total de 8 caractères minimum.

Le projet à été réalisé avec :

    Node.js
    Angular
    MongoDB Atlas

Liste des dépendances NPM

Il faut les installer afin de s'assurer du bon fonctionnement de l'application :

Bcrypt
Body-parser
Crypto-js
Dotenv  
Express
Express-bouncer
Express-mongo-sanitize
Express-session
Helmet
Jsonwebtoken
Mongoose
Mongoose-unique-validator
Multer
Password-validator
Path
Xxs-clean
