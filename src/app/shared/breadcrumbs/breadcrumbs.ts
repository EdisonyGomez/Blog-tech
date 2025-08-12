import { Component, Input } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"

interface BreadcrumbItem {
  label: string
  route?: string
  active?: boolean
}

@Component({
  selector: "app-breadcrumbs",
  imports: [CommonModule, RouterModule],
  templateUrl: "./breadcrumbs.html",
  styleUrl: "./breadcrumbs.css",
  standalone: true,
})
export class Breadcrumbs {
  @Input() items: BreadcrumbItem[] = []
}
