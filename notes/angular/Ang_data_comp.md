In Angular, data sharing between components can be achieved through various methods depending on the relationship between the components:

---

### **1. Parent to Child (Input Binding)**
The parent component passes data to the child component using the `@Input()` decorator.

#### Example
**Parent Component**
```typescript
// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <h1>Parent Component</h1>
    <p>Passing message to child:</p>
    <app-child [message]="parentMessage"></app-child>
  `,
})
export class ParentComponent {
  parentMessage: string = 'Hello from Parent!';
}
```

**Child Component**
```typescript
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h2>Child Component</h2>
    <p>Message from Parent: {{ message }}</p>
  `,
})
export class ChildComponent {
  @Input() message: string = '';
}
```

---

### **2. Child to Parent (Output Binding with EventEmitter)**
The child component communicates with the parent using the `@Output()` decorator and `EventEmitter`.

#### Example
**Parent Component**
```typescript
// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <h1>Parent Component</h1>
    <app-child (notify)="onNotify($event)"></app-child>
    <p>Message from Child: {{ childMessage }}</p>
  `,
})
export class ParentComponent {
  childMessage: string = '';

  onNotify(message: string) {
    this.childMessage = message;
  }
}
```

**Child Component**
```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h2>Child Component</h2>
    <button (click)="sendMessage()">Send Message to Parent</button>
  `,
})
export class ChildComponent {
  @Output() notify = new EventEmitter<string>();

  sendMessage() {
    this.notify.emit('Hello from Child!');
  }
}
```

---

### **3. Sharing Data Between Sibling Components**
When two sibling components need to share data, a **shared service** can act as a bridge.

#### Example
**Shared Service**
```typescript
// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private messageSource = new BehaviorSubject<string>('Default Message');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
```

**Sibling Component 1**
```typescript
// sibling1.component.ts
import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-sibling1',
  template: `
    <h2>Sibling 1</h2>
    <input [(ngModel)]="message" placeholder="Enter message" />
    <button (click)="sendMessage()">Send to Sibling 2</button>
  `,
})
export class Sibling1Component {
  message: string = '';

  constructor(private sharedService: SharedService) {}

  sendMessage() {
    this.sharedService.changeMessage(this.message);
  }
}
```

**Sibling Component 2**
```typescript
// sibling2.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-sibling2',
  template: `
    <h2>Sibling 2</h2>
    <p>Message from Sibling 1: {{ message }}</p>
  `,
})
export class Sibling2Component implements OnInit {
  message: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.sharedService.currentMessage.subscribe((message) => {
      this.message = message;
    });
  }
}
```

---

### **4. Sharing Data Between Unrelated Components**
For components that are not parent-child or siblings, you can use a **shared service** with Angular’s **Dependency Injection** mechanism.

#### Example
**Shared Service**
```typescript
// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private data: any;

  setData(value: any) {
    this.data = value;
  }

  getData() {
    return this.data;
  }
}
```

**Component A (Sender)**
```typescript
// component-a.component.ts
import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-component-a',
  template: `
    <h2>Component A</h2>
    <input [(ngModel)]="data" placeholder="Enter data" />
    <button (click)="sendData()">Send Data</button>
  `,
})
export class ComponentA {
  data: string = '';

  constructor(private sharedService: SharedService) {}

  sendData() {
    this.sharedService.setData(this.data);
  }
}
```

**Component B (Receiver)**
```typescript
// component-b.component.ts
import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-component-b',
  template: `
    <h2>Component B</h2>
    <p>Received Data: {{ receivedData }}</p>
  `,
})
export class ComponentB implements OnInit {
  receivedData: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.receivedData = this.sharedService.getData();
  }
}
```

---

### **5. Using Angular’s BehaviorSubject for State Sharing**
Instead of manually managing data, Angular’s **BehaviorSubject** (part of RxJS) is a powerful way to handle state sharing.

#### Example
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {
  private state = new BehaviorSubject<any>(null);
  state$ = this.state.asObservable();

  updateState(value: any) {
    this.state.next(value);
  }
}
```

Both components can subscribe to `state$` and react to changes.

---

### **Conclusion**
- **Parent to Child**: Use `@Input()`.
- **Child to Parent**: Use `@Output()` with `EventEmitter`.
- **Sibling Components**: Use a shared service with `BehaviorSubject` or manual state management.
- **Unrelated Components**: Use a shared service or Angular's Dependency Injection.

