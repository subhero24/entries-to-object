# Install

```bash
npm install entries-to-object
```

# Usage

```javascript
import entriesToObject from 'entries-to-object';

let object = entriesToObject(entries);
```

# Example

```javascript
let object = entriesToObject([
	['lastname', 'Doe'],
	['firstname', 'John'],
	['age', 30],
	['hobbies[]', 'hiking'],
	['hobbies[]', 'reading'],
	['hobbies[]', 'playing guitar'],
	['address.city', 'Anytown'],
	['address.street', '123 Main St'],
]);

/*
object = {
	lastname: 'Doe',
	firstanem: 'John,
	age: 30,
	hobbies: ['hiking', 'reading', 'playing guitar'],
	address: {
		city: 'Anytown',
		street: '123 Main St'
	}
}
*/
```

Anything that has an iterator with [key, value] pairs can also be used as entries:

- Map
- Headers
- FormData
- URLSearchParams
