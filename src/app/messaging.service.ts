import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var ConversationClient: any;
const GATEWAY_URL = "http://localhost:3000/";

@Injectable()
export class MessagingService {


  constructor(private http: HttpClient) {
    
  }

  initialize() {
    this.client = new ConversationClient(
      {
        debug: false,
        iceServers: {
          urls: 'turn:138.68.169.35:3478?transport=tcp',
          credential: 'bar',
          username: 'foo2'
        }
      }
    )
  }

  public client: any

  public getUserJwt(username: string):Promise<any> {
    return this.http.get(GATEWAY_URL + "jwt/" + username + "?admin=true").toPromise().then((response: any) => response.user_jwt)
  }

  public getUsers():Promise<any> {
    return this.http.get(GATEWAY_URL + "users/").toPromise()
  }

}
