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
git clone -b Authent --single-branch https://github.com/Benjitol/HOLGraphInit.git

## Charger les données de l'utilisateur connecté (nom photo)
Maintenant que notre utilisateur est connecté, nous allons pouvoir récuperer ses informations de profils et sa photo
1. Changer la definition de la classe afin stocker les information de l'utilisateur connecté
```javascript
class App extends react.Component<{}, { isAuthenticated: boolean, user:any }>
```

		a. if (this.state.isAuthenticated) {
		      this.LoadData()
		    }
		b. private LoadData() {
		    this.getUserProfile();
		  }
		c. class App extends react.Component<{}, { isAuthenticated: boolean, user:any }>
		d. this.state = {
		      isAuthenticated: (user !== null),
		      user:{}
		    };
		e. <NavBar isAuthenticated={this.state.isAuthenticated}
		          authButtonMethod={this.state.isAuthenticated ? this.logout.bind(this) : this.login.bind(this)}
		          user={this.state.user} />
		
		f. async getUserProfile() {
		    try {
		      var accessToken = await this.userAgentApplication.acquireTokenSilent({
		        scopes: scopes
		      });
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
		g. npm install @microsoft/microsoft-graph-client
		h. npm install @microsoft/microsoft-graph-types
		i. export async function getUserDetails(accessToken: string) {
		  const client = getAuthenticatedClient(accessToken);
		
		  const user = await client.api('/me').get();
		  user.photo = await GetPhoto('/me', accessToken);
		  return user;
		}
		
		export async function GetPhoto(path: string, accessToken: string) {
		  const client = getAuthenticatedClient(accessToken);
		  const url = window.URL;
		  let hasphoto = await client.api(path + '/photo').get();
		  if (hasphoto)
		    return url.createObjectURL(await client.api(path + '/photo/$value').responseType(ResponseType.BLOB).get());
		
		}
		



