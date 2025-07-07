import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"

@Component({
  selector: 'app-post-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <header class="text-center pt-10">
        <h1 class="text-xl sm:text-4xl font-bold text-black ">
          Posts Management
        </h1>
        <p class="text-lg text-primary/80 mt-1 sm:mt-2 font-medium">
          Manage your posts with full CRUD operations
        </p>
    </header>
  `,
})
export class PostHeaderComponent { }
