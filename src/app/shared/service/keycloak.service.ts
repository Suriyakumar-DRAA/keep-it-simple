import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js"
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  constructor(public httpClient: HttpClient) { }
  static auth: any = {};

  static init(): Promise<any> {
    const keycloakAuth: Keycloak = new Keycloak({
      url: environment.keycloakRootUrl,
      realm: 'master',
      clientId: 'ahcl',
    });

    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'login-required', checkLoginIframe: false, flow: 'standard' })
        .then((authenticated) => {
          if (authenticated) {
            sessionStorage.setItem('token', JSON.stringify(keycloakAuth.token));
            KeycloakService.auth.loggedIn = true;
            KeycloakService.auth.authz = keycloakAuth;
            KeycloakService.auth.logoutUrl = keycloakAuth.authServerUrl
              + 'realms/master/protocol/openid-connect/logout?post_logout_redirect_uri='
              + document.baseURI
              + '&id_token_hint='
              + keycloakAuth.idToken
          }
          resolve(authenticated);
        })
        .catch(() => {
          reject();
        });
    });
  }

  logout() {
    KeycloakService.auth.loggedIn = false;
    KeycloakService.auth.authz = null;
    window.location.href = KeycloakService.auth.logoutUrl;
  }

  static getUsername(): string {
    return KeycloakService.auth.authz.tokenParsed.preferred_username;
  }

  static getFullName(): string {
    return KeycloakService.auth.authz.tokenParsed.name;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService?.auth?.authz?.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .then(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .catch(() => {
            reject('Failed to refresh token');
          });
      } else {
        reject('Not logged in');
      }
    });
  }
}
