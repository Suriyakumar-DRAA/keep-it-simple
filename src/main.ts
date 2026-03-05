import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { KeycloakService } from '@shared/service/keycloak.service';
import { environment } from '@env/environment';

KeycloakService.init()
  .then((auth) => {
    if (auth) {
      bootstrapApplication(App, appConfig)
        .catch((err) => console.error(err));
    } else {
      window.location.href = environment.keycloakRootUrl;
    }
  })
  .catch(e => console.log(e));

// bootstrapApplication(App, appConfig)
//   .catch((err) => console.error(err));
