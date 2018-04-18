import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';
import { SearchResult } from '../../models/searchResult';

@Injectable()
export class GithubUsersProvider {
  githubApiUrl = 'https://api.github.com';

  constructor(public http: HttpClient) { }

  // Load all github users
  load(): Observable<User[]> {
    return this.http.get<User[]>(`${this.githubApiUrl}/users`);
  }

  // Get github user by providing login(username)
  loadDetails(login: string): Observable<User> {
    return this.http.get<User>(`${this.githubApiUrl}/users/${login}`);
  }

  // Search for github users  
  searchUsers(searchParam: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.githubApiUrl}/search/users?q=${searchParam}`);
  }

}
