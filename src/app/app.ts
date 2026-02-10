import { Component, computed, HostListener, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { HeaderComponent } from './core/layout/header/header.component';
import { SubHeaderComponent } from './core/layout/sub-header/sub-header.component';
import { UserRole } from '@shared/model/role.model';
import { CommonService } from '@shared/service/common.service';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, HeaderComponent, SubHeaderComponent, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  currentDate = 'Oct 11, 2025';
  userRole: UserRole = 'optometrist';

  // Inject services
  private commonService = inject(CommonService);

  today = new Date();

  constructor() {
  }

  ngOnInit() {
    
  }



  
}

