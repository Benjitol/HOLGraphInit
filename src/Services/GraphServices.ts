import { ResponseType, Client } from '@microsoft/microsoft-graph-client';


function getAuthenticatedClient(accessToken: string) {
    // Initialize Graph client
    const client = Client.init({
        authProvider: (done: any) => {
            done(null, accessToken);
        }
    });

    return client;
}

export async function getUserDetails(accessToken: string) {
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