# Prérequis
1. Postman :
https://www.getpostman.com/downloads/
1. Git
https://git-scm.com/downloads
1. VS Code :
https://code.visualstudio.com/download
2. NodeJS (v11.9.0)
https://nodejs.org/download/release/v11.9.0/

#Préparation
1. Récuperer les sources :
```bash
git clone -b Init --single-branch https://github.com/Benjitol/HOLGraphInit.git
```
2. Installer les packages 
```bash
npm install
```
3. lancer l'application
```bash
npm start
```

## Créer une application azure AD
1. Connectez-vous au portail Azure avec votre compte (professionnel)
1. Dans le volet de navigation de gauche, sélectionnez le service Azure Active Directory, puis sélectionnez Inscriptions d'applications > Nouvelle inscription.
1. Lorsque la page Inscrire une application s’affiche, saisissez les informations d’inscription de votre application :
	1. Nom : saisissez un nom d’application cohérent qui s’affichera pour les utilisateurs de l’application.
	1. Types de compte pris en charge : sélectionnez les comptes à prendre en charge par l’application. dans notre cas séléctionner la seconde option (Comptes dans un annuaire organisationnel)
	1. URI de redirection (facultatif) : sélectionnez le type d’application que vous créez, Web  pour nous puis entrez l’URI de redirection (ou URL de réponse) http://locahost:3000.
	1. Récuperer l'Application ID
## Mettre en place l'authentification MSAL
Afin d'abstraire les protocoles (implicite grant dans notre cas) nous utiliserons la biliothèque fournit par Microsoft (https://www.npmjs.com/package/msal)
1. Installer le package MSAL 
```bash
Npm install msal
```
2. Créer un fichier Config.ts 
3. Ajouter les 2 constantes suivantes :

```javascript
export const appId= '<APPID>';
export const scopes= ["User.Read"];
```

1. Dans le fichier App.tsx il faut importer puis utiliser la classe permettant d'instancier l'application
	1.Changer la definition de la class afin d'y introduire un état authentifié
	  ```javascript
	  class App extends react.Component<{},{isAuthenticated:boolean}>
	  ```
	1.Ajouter les lignes suivantes en haut du fichier
  ```javascript
  import { UserAgentApplication} from 'msal';
  import { appId, scopes } from './Config';
  ```
  1. Ajouter la configuration suivante dans le constructeur :
  ```javascript
  var msalConfig = {
        auth: {
          clientId: appId
        }
      };
      this.userAgentApplication = new UserAgentApplication(msalConfig);
      this.state = {
        isAuthenticated: false
      };
  ```
1. Nous allons maintenant modifier la barre de navigation afin d'y ajouter les informations et actions de login
```javascript
<NavBar isAuthenticated={this.state.isAuthenticated}
authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
user={{}} />
```
1. Compléter les methodes login et logout
```javascript
private async login() {
}
private logout() {
}
```
1. Une fois les login/logout fonctionnels vous pouvez connecter votre utilisateur. 
Recharger la page maintenant. 
Votre utilisateur n'est "plus connecté". 
--> Implémenter le chargement initial de l'authentification

11. Si besoin, récuperer les réponses dans un nouveau projet à l'aide de la commande git suivante : 
```bash
git clone -b Authent --single-branch https://github.com/Benjitol/HOLGraphInit.git
```

## Charger les données de l'utilisateur connecté (nom photo)
Maintenant que notre utilisateur est connecté, nous allons pouvoir récuperer ses informations de profils et sa photo
pour celà nous allons interoger l'API Graph fournit par Microsoft à l'aide des librairies "graph client".
1. Installer les packages nécessaires
```bash
npm install @microsoft/microsoft-graph-client
npm install @microsoft/microsoft-graph-types
```
1. Créer un dossier "services" puis un fichier "GraphServices.ts"
1. importer le graph client
```javascript
import { ResponseType, Client } from '@microsoft/microsoft-graph-client';
```
1. Créer la méthode afin d'instancier ce graph client et le connecter aux api
```javascript
function getAuthenticatedClient(accessToken: string) {
   // Initialize Graph client
    const client = Client.init({
        authProvider: (done: any) => {
            done(null, accessToken);
        }
    });
    return client;
}
```
1. Créer la methode afin de récuperer les [informations utilisateurs](https://docs.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=cs) (Email et Nom) 
```javascript
export async function getUserDetails(accessToken: string) {
    const client = getAuthenticatedClient(accessToken);
    const user = ??
    return user;
}
```
1. Créer la methode afin de récuperer la [Photo de l'utilisateur] (https://docs.microsoft.com/en-us/graph/api/profilephoto-get?view=graph-rest-1.0)

```javascript
export async function GetPhoto(path: string, accessToken: string) {
}
```
1. Changer la definition de la classe (App.tsx) afin d'y stocker les informations de l'utilisateur connecté
```javascript
class App extends react.Component<{}, { isAuthenticated: boolean, user:any }>
```
2. Modifier l'initialisation du state et de la nav bar avec les données utilisateurs (vide pour le moment)
```javascript
this.state = {
	isAuthenticated: (user !== null),
	user:{}
};
```
```javascript
<NavBar isAuthenticated={this.state.isAuthenticated}
		          authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
		          user={this.state.user} />
```
3. Importer la méthode de service
```javascript
import {getUserDetails} from './Services/GraphServices';
```
3. Créer la méthode de chargement des données de l'utilisateurs connecté
```javascript
async getUserProfile() {
    try {
      var accessToken = ??
      if (accessToken) {
	var user = await getUserDetails(accessToken);
	this.setState({
	  isAuthenticated: true,
	  user: {
	    displayName: user.displayName,
	    email: user.mail || user.userPrincipalName,
	    avatar: user.photo
	  },
	});
      }
    }
    catch (err) {
	this.setState({
	isAuthenticated: false,
	user: {},
      });
    }
  }
```
4 Appeler cette méthode lorsque l'utilsateur est connecté, la Navbar affichera les informations de l'utilisateur.

11. Si besoin, récuperer les réponses dans un nouveau projet à l'aide de la commande git suivante : 
```bash
git clone -b UserData --single-branch https://github.com/Benjitol/HOLGraphInit.git
```


