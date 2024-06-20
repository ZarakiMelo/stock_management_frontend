// src/app/components/item-form/item-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  isEditMode: boolean = false;
  itemId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService
  ) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      size: ['', Validators.required],
      color: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.isEditMode = true;
      this.itemService.getItem(this.itemId).subscribe(item => this.itemForm.patchValue(item));
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const item: Item = this.itemForm.value;
      if (this.isEditMode && this.itemId) {
        this.itemService.updateItem(this.itemId, item).subscribe(() => this.router.navigate(['/']));
      } else {
        this.itemService.addItem(item).subscribe(() => this.router.navigate(['/']));
      }
    }
  }
}
