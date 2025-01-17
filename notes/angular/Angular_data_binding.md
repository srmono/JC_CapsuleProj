Data binding in Angular synchronizes data between the application’s **view** (HTML template) and **model** (TypeScript code). Angular provides several forms of data binding to facilitate interaction between the UI and logic.

---

### **Types of Data Binding**

1. **Interpolation** (One-way Binding: Component → Template)
2. **Property Binding** (One-way Binding: Component → Template)
3. **Event Binding** (One-way Binding: Template → Component)
4. **Two-Way Binding** (Template ↔ Component)

---

### **1. Interpolation**
Interpolation uses `{{ }}` to display data from the component in the template.

#### Example
```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Welcome, {{ userName }}!</h1>`,
})
export class AppComponent {
  userName: string = 'John Doe';
}
```

#### Output
```
Welcome, John Doe!
```

---

### **2. Property Binding**
Property binding allows you to bind an element's property to a component's property.

#### Syntax
```html
[elementProperty]="componentProperty"
```

#### Example
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <img [src]="imageUrl" [alt]="altText" />
  `,
})
export class AppComponent {
  imageUrl: string = 'https://angular.io/assets/images/logos/angular/angular.png';
  altText: string = 'Angular Logo';
}
```

#### Output
Displays an image with the given `src` and `alt` attributes.

---

### **3. Event Binding**
Event binding allows you to respond to user actions such as clicks, input changes, and mouse movements.

#### Syntax
```html
(eventName)="eventHandler($event)"
```

#### Example
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <button (click)="onButtonClick()">Click Me</button>
    <p>{{ message }}</p>
  `,
})
export class AppComponent {
  message: string = 'Button not clicked yet';

  onButtonClick() {
    this.message = 'Button clicked!';
  }
}
```

#### Output
- Initially: "Button not clicked yet"
- After button click: "Button clicked!"

---

### **4. Two-Way Binding**
Two-way binding synchronizes data between the component and the template using the `[(ngModel)]` directive. It requires the **FormsModule** to be imported.

#### Syntax
```html
<input [(ngModel)]="property" />
```

#### Example
```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule], // Include FormsModule here
  bootstrap: [AppComponent],
})
export class AppModule {}

// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <input [(ngModel)]="userName" placeholder="Enter your name" />
    <p>Hello, {{ userName }}!</p>
  `,
})
export class AppComponent {
  userName: string = '';
}
```

#### Output
- As you type into the input field, the text updates in real-time:  
  "Hello, [Your Input]!"

---

### **Combination Example**
```typescript
// app.component.ts
@Component({
  selector: 'app-root',
  template: `
    <h2>Angular Data Binding Example</h2>

    <!-- Interpolation -->
    <p>Message: {{ message }}</p>

    <!-- Property Binding -->
    <img [src]="imageUrl" [alt]="altText" />

    <!-- Event Binding -->
    <button (click)="updateMessage()">Update Message</button>

    <!-- Two-Way Binding -->
    <input [(ngModel)]="userInput" placeholder="Type something..." />
    <p>You typed: {{ userInput }}</p>
  `,
})
export class AppComponent {
  message: string = 'Hello Angular!';
  imageUrl: string = 'https://angular.io/assets/images/logos/angular/angular.svg';
  altText: string = 'Angular Logo';
  userInput: string = '';

  updateMessage() {
    this.message = 'Message updated!';
  }
}
```

---

### **Key Points**
1. **Interpolation** and **Property Binding** are used to pass data **from the component to the template**.
2. **Event Binding** sends data **from the template to the component**.
3. **Two-Way Binding** keeps the component and template data in sync.

These forms of data binding help make Angular applications dynamic and responsive. 