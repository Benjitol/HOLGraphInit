import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import * as graph from '@microsoft/microsoft-graph-client';
import { ResponseType } from '@microsoft/microsoft-graph-client';
import { AuthResponse } from 'msal';



function getAuthenticatedClient(accessToken: AuthResponse) {
  // Initialize Graph client
  const client = graph.Client.init({
    authProvider: (done: any) => {
      done(null, accessToken.accessToken);
    }
  });

  return client;
}

export async function getUserDetails(accessToken: AuthResponse) {
    const client = getAuthenticatedClient(accessToken);
  
    const user = await client.api('/me').get();
    user.photo = await GetPhoto('/me', accessToken);
    return user;
  }
  
  export async function GetPhoto(path: string, accessToken: AuthResponse) {
    const client = getAuthenticatedClient(accessToken);
    const url = window.URL;//|| window.webkitURL;
    let hasphoto = await client.api(path + '/photo').get();
    if (hasphoto)
      return url.createObjectURL(await client.api(path + '/photo/$value').responseType(ResponseType.BLOB).get());
  
  }