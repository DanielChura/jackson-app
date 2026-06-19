import { Routes } from '@angular/router';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';

export default [
  { path: '', component: InventoryListComponent },
  { path: 'new', component: InventoryFormComponent },
] as Routes;
