import { NgModule } from '@angular/core';
import { MatCheckboxModule, MatListModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatChipsModule, MatButtonToggleModule, MatTooltipModule, MatDialogModule, MatProgressBarModule, MatProgressSpinnerModule, MatCardModule, MatGridListModule, MatMenuModule, MatDatepickerModule, MatExpansionModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

const MetrialModules = [
  MatCheckboxModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  DragDropModule,
  MatChipsModule,
  MatButtonToggleModule,
  MatTooltipModule,
  MatDialogModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatGridListModule,
  MatMenuModule,
  MatDatepickerModule,
  MatExpansionModule
]

@NgModule({
  declarations: [],
  imports: [
    MetrialModules
  ],
  exports: [
    MetrialModules
  ]
})
export class CustomMaterialModule { }
