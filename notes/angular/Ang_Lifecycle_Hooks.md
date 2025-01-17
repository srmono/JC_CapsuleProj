Angular lifecycle hooks along with examples:

---

### **Lifecycle Hooks in Angular**
Lifecycle hooks allow developers to interact with the component or directive at different stages of its life cycle. Below is an overview of key lifecycle hooks:

1. **`ngOnChanges`**  
   Triggered when the value of an input property changes. Useful for reacting to input changes.

2. **`ngOnInit`**  
   Called once after the component is initialized. Commonly used for initialization logic like fetching data.

3. **`ngDoCheck`**  
   Invoked during every change detection run. Used to implement custom change detection logic.

4. **`ngAfterViewInit`**  
   Called after the component's view and child views have been fully initialized. Ideal for DOM manipulation or working with child components.

5. **`ngAfterViewChecked`**  
   Called after Angular has checked the component’s view and child views.

6. **`ngAfterContentInit`**  
   Invoked after content (like `<ng-content>`) is projected into the component.

7. **`ngAfterContentChecked`**  
   Called after Angular checks the projected content.

8. **`ngOnDestroy`**  
   Called just before the component is destroyed. Use this for cleanup like unsubscribing from observables or removing event listeners.

---

### **Example: Using Lifecycle Hooks in a Component**

```typescript
import { Component, Input, OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-lifecycle-demo',
  template: `
    <h2>Lifecycle Hooks Demo</h2>
    <p>Input Value: {{ inputValue }}</p>
    <p>Counter: {{ counter }}</p>
    <button (click)="incrementCounter()">Increment Counter</button>
  `
})
export class LifecycleDemoComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, OnDestroy {
  @Input() inputValue: string = '';
  counter: number = 0;

  constructor() {
    console.log('Constructor called!');
  }

  ngOnChanges() {
    console.log('ngOnChanges called - Input value changed:', this.inputValue);
  }

  ngOnInit() {
    console.log('ngOnInit called - Component initialized');
    // Example: Fetch initial data
    this.counter = 5; // Setting initial value
  }

  ngDoCheck() {
    console.log('ngDoCheck called - Custom change detection logic');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called - View initialized');
    // Example: Manipulating DOM if necessary
  }

  ngOnDestroy() {
    console.log('ngOnDestroy called - Cleaning up');
    // Example: Unsubscribe from observables
  }

  incrementCounter() {
    this.counter++;
  }
}
```

---

### **Steps to Test the Component**
1. Add the `LifecycleDemoComponent` to your `AppModule`.
2. Use it in a parent component's template and bind an input property:
   ```html
   <app-lifecycle-demo [inputValue]="parentValue"></app-lifecycle-demo>
   <input type="text" [(ngModel)]="parentValue" placeholder="Update inputValue" />
   ```
3. In the parent component, define `parentValue`:
   ```typescript
   parentValue: string = 'Initial Value';
   ```
4. Observe the console to see the lifecycle hooks in action as:
   - The component initializes.
   - The input value changes.
   - The component is destroyed (if removed from the DOM).

---

### **Output Example (Console Logs)**

1. When the component is initialized:
   ```
   Constructor called!
   ngOnInit called - Component initialized
   ```

2. When the `inputValue` changes:
   ```
   ngOnChanges called - Input value changed: New Value
   ```

3. When a button is clicked (`ngDoCheck` runs on every detection cycle):
   ```
   ngDoCheck called - Custom change detection logic
   ```

4. After the view is fully initialized:
   ```
   ngAfterViewInit called - View initialized
   ```

5. When the component is removed from the DOM:
   ```
   ngOnDestroy called - Cleaning up
   ```

This example demonstrates how Angular lifecycle hooks can be used to manage component behavior effectively.