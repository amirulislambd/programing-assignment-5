## Below are the answers to five questions.
### 1️⃣ What is the difference between var, let, and const?
#### **Below is the difference between var, let and const**

##### **1.Scope**
- var function scoped:
If it is declared in a function, it is available inside the function, not outside it And if it is declared outside the function, it is available in the any block levels because it is ignore block levels
- const and let are block scoped:
It exists within curly braces and is safe for loops and conditionals.

##### **2.Hosting**
###### JavaScript hosting has a default behavior for passing variables declared in the exist scope.
- var: It is hoisted and initialized as undefined. You can access it before its line of code without a crash, but it will just return undefined
- let & const: They are also hoisted but not initialized. If you try to access them before the declaration line, you get a ReferenceError. This gap is called the Temporal Dead Zone (TDZ).

###### **3.Reassignment vs. Immutability**

- If you declare a variable with var , you can reassert that value in the variable.and declared same names variable.
- If you declare a variable with let , you can reassert that value in the variable.
- If you declare a variable with const, you cannot reassign that value to the variable.
But if the value is an object or array, you can change the property on the object or array.


### 2️⃣ What is the spread operator (...)?
#### Spread operator is a powerful syntax that includes Es6 It is used to spread (unpack) properties of objects or arrays.
### 3️⃣ What is the difference between map(), filter(), and forEach()?

#### think of it this way: forEach() is a worker, map() is a transformer, and filter() is a bouncer.
#### 1. forEach() -> the worker.
- use this when you want to do something with every item but don't need a new array back.
#### 2. map() -> the transformer.
- Use this when you want to change every item in an array and keep this results in a brand-new array of the same length.
#### 3. filter() -> the bouncer.
- Use this when you want to select certain items based on a condition.

### 4️⃣ What is an arrow function?
#### An arrow function is a shorter and modern way to write function in javasCript using => the symbol..
- it is removes the need for function keyword.
- it does not have this context, which makes it very useful inside classes or callback.
- if hte function has only one line , you don't even need to write return.
### 5️⃣ What are template literals?
#### **Template literals**
are modern way to handle string in javascript. The make it much easier ro combine text and variables together.