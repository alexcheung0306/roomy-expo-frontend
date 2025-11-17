# Simple API Usage Guide

## Just 3 Steps:

### 1. Import the service
```tsx
import { userService } from '@/lib/api';
```

### 2. Call the API
```tsx
// Get all users
const users = await userService.getAll();

// Create a user
const newUser = await userService.create({ 
  name: 'John Doe', 
  email: 'john@example.com' 
});
```

### 3. Use in your component
```tsx
import { userService } from '@/lib/api';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users when component loads
    userService.getAll()
      .then(setUsers)
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <View>
      {users.map(user => (
        <Text key={user.id}>{user.name}</Text>
      ))}
    </View>
  );
}
```

That's it! The API automatically connects to `http://localhost:5000` (or your backend URL).

