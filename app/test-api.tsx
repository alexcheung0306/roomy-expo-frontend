/**
 * Simple test component to verify API connection
 * You can delete this file after testing
 */

import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';
import { ActivityIndicator } from '@/components/nativewindui/ActivityIndicator';
import { userService, healthCheck } from '@/lib/api';

export default function TestApi() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);

  // Test 1: Check if backend is running
  const testHealth = async () => {
    try {
      setLoading(true);
      const result = await healthCheck();
      Alert.alert('✅ Success!', result.message);
    } catch (error: any) {
      Alert.alert('❌ Error', error.message || 'Could not connect to backend');
    } finally {
      setLoading(false);
    }
  };

  // Test 2: Get all users
  const testGetUsers = async () => {
    try {
      setLoading(true);
      const result = await userService.getAll();
      setUsers(result);
      Alert.alert('✅ Success!', `Found ${result.length} users`);
    } catch (error: any) {
      Alert.alert('❌ Error', error.message || 'Could not fetch users');
    } finally {
      setLoading(false);
    }
  };

  // Test 3: Create a user
  const testCreateUser = async () => {
    try {
      setLoading(true);
      const newUser = await userService.create({
        name: 'Test User',
        email: 'test@example.com',
      });
      Alert.alert('✅ Success!', `Created user: ${newUser.name}`);
      // Refresh users list
      testGetUsers();
    } catch (error: any) {
      Alert.alert('❌ Error', error.message || 'Could not create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 p-4 gap-4">
      <Text variant="title1" className="mb-4">
        API Test
      </Text>

      <Button onPress={testHealth} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text>1. Test Backend Connection</Text>}
      </Button>

      <Button onPress={testGetUsers} disabled={loading} variant="secondary">
        {loading ? <ActivityIndicator /> : <Text>2. Get All Users</Text>}
      </Button>

      <Button onPress={testCreateUser} disabled={loading} variant="tonal">
        {loading ? <ActivityIndicator /> : <Text>3. Create Test User</Text>}
      </Button>

      {users.length > 0 && (
        <View className="mt-4 p-4 bg-muted rounded-lg">
          <Text variant="title3" className="mb-2">
            Users ({users.length}):
          </Text>
          {users.map((user) => (
            <View key={user.id} className="mb-2 p-2 bg-background rounded">
              <Text>ID: {user.id}</Text>
              {user.name && <Text>Name: {user.name}</Text>}
              {user.email && <Text>Email: {user.email}</Text>}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

