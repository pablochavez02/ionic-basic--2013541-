import { Component } from '@angular/core';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Router } from '@angular/router';
import { AutService } from '../service/aut.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'logout.page.html',
  styleUrls: ['logout.page.scss'],
})
export class LogoutPage {

  isLoged : any = false;

  constructor(
    private authService: AutService,
    private router: Router,
    private storageService: StorageService
  ) {

    onAuthStateChanged(this.authService.getStateAuth(), user=>{
      if(user!=null && user != undefined){
        this.isLoged = true;
      }
    });

  }

  onLogout(){
    signOut(this.authService.getStateAuth()).then(response=>{
      console.log("Logout!");
      this.router.navigateByUrl('/login');
      console.info('Usuario a borrar:'+this.storageService.getValue('usuario'));
      // this.storageService.borrarItem('usuario'); se borraba el storage pero
      // se creaba inmedientemente, por eso daba la impresion de que no servia, ese era el error
      this.storageService.limpiarStorage();
    }).catch(error=>{

    });
  }

}
