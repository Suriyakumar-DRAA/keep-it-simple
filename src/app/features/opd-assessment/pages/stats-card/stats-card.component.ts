import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.scss'
})
export class StatsCardComponent {
selectedCard: string = "my_queue";

setSelectedCard( selectedCardName: string) {
  this.selectedCard = selectedCardName;
}
}
