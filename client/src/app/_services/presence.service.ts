import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;

  constructor(private toastr: ToastrService) {}

  /**
   * Starts when the application starts with a user logged in, when users login, or register.
   * @param user 
   */
  createHubConnection(user: User) {
    //hub connection creation
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    //start hub connection
    this.hubConnection.start().catch((error) => console.log(error));

    //listen for the server (userIsOnline and userIsOffline)
    // api class PresenceHub
    this.hubConnection.on('UserIsOnline', (username) => {
      this.toastr.info(username + ' has connected');
    });

    this.hubConnection.on('UserIsOffline', (username) => {
      this.toastr.warning(username + ' has disconnected');
    });

  }

  /**
   * Stops hub connection. Should be called on logout or if the application stops
   */
  stopHubConnection() {
    this.hubConnection.stop().catch((error) => console.log(error));
  }
}
