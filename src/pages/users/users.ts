import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';

import { GithubUsersProvider } from '../../providers/github-users/github-users';
import { UserDetailsPage } from '../user-details/user-details';

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: User[];
  originalUsers: User[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsersProvider: GithubUsersProvider
  ) { }

  ionViewDidLoad() {
    this.githubUsersProvider.load().subscribe(users => {
      this.users = users;
      this.originalUsers = users;
    });
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent) {
    let term = searchEvent.target.value;
    // We will only perform the search if we have 3 or more characters
    if (!term || term.trim() === '' || term.trim().length < 3) {
      // Load cached users
      this.users = this.originalUsers;
    } else {
      // Get the searched users from github
      this.githubUsersProvider.searchUsers(term).subscribe(searchResult => {
        this.users = searchResult.items;
      });
    }
  }

}
