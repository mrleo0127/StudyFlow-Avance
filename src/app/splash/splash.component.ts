import { Component, OnInit } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'

@Component({
  standalone: false,
  selector: 'app-splash',
  templateUrl: './splash.component.html',
})
export class SplashComponent implements OnInit {

  constructor(private routerExtensions: RouterExtensions) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.routerExtensions.navigate(['/tasks'], {
        clearHistory: true,
        transition: {
          name: 'fade',
        },
      })
    }, 2500)
  }
}