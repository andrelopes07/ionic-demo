import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import { GithubUsersProvider } from '../../providers/github-users/github-users';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
  login: string;
  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private githubUsersProvider: GithubUsersProvider
  ) { }

  ionViewDidLoad() {
    this.login = this.navParams.get('login');
    this.githubUsersProvider.loadDetails(this.login).subscribe(user => {
      this.user = user;
    });
  }

}
