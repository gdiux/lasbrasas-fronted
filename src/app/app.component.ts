import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Las Brasas Parrilla & Sazón';

  public preload: boolean = true;

  onActivate(event:any) {

    this.preload = true;

    let scrollToTop = window.setInterval(() => {
        let pos = window.pageYOffset;
        if (pos > 0) {
            window.scrollTo(0, pos - 50); // how far to scroll on each step
        } else {
            window.clearInterval(scrollToTop);
        }
    

    setTimeout(()=> {

      this.preload = false;

    },1000)

    
  }, 16);
}

}
