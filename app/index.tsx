import { useHeaderHeight } from '@react-navigation/elements';
import { FlashList } from '@shopify/flash-list';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Alert,
  Button as RNButton,
  ButtonProps,
  Linking,
  Share,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchBarProps } from 'react-native-screens';

import { useActionSheet } from '@expo/react-native-action-sheet';

import { useNavigation } from '@react-navigation/native';

import * as Haptics from 'expo-haptics';

import { ActivityIndicator } from '@/components/nativewindui/ActivityIndicator';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/nativewindui/Avatar';

import { Button } from '@/components/nativewindui/Button';

import { DatePicker } from '@/components/nativewindui/DatePicker';

import { Icon } from '@/components/nativewindui/Icon';

import { Picker, PickerItem } from '@/components/nativewindui/Picker';

import { ProgressIndicator } from '@/components/nativewindui/ProgressIndicator';

import { Slider } from '@/components/nativewindui/Slider';

import { Text } from '@/components/nativewindui/Text';

import { Toggle } from '@/components/nativewindui/Toggle';

import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';
import { userService } from '@/lib/api';

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

export default function Screen() {
  const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });

  const data = searchValue
    ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
    : COMPONENTS;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={data}
      contentContainerClassName="py-4 android:pb-12"
      extraData={searchValue}
      removeClippedSubviews={false} // used for slecting text on android
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={renderItem}
      ListEmptyComponent={COMPONENTS.length === 0 ? ListEmptyComponent : undefined}
    />
  );
}

function useHeaderSearchBar(props: SearchBarProps = {}) {
  const { colorScheme, colors } = useColorScheme();
  const navigation = useNavigation();
  const [search, setSearch] = React.useState('');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: 'Search...',
        textColor: colors.foreground,
        tintColor: colors.primary,
        headerIconColor: colors.foreground,
        hintTextColor: colors.grey,
        hideWhenScrolling: false,
        onChangeText(ev) {
          setSearch(ev.nativeEvent.text);
        },
        ...props,
      } satisfies SearchBarProps,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, colorScheme]);

  return search;
}

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return (
    <View style={{ height }} className="flex-1 items-center justify-center gap-1 px-12">
      <Icon name="doc.badge.plus" size={42} color={colors.grey} />
      <Text variant="title3" className="pb-1 text-center font-semibold">
        No Components Installed
      </Text>
      <Text color="tertiary" variant="subhead" className="pb-4 text-center">
        You can install any of the free components from the{' '}
        <Text
          onPress={() => Linking.openURL('https://nativewindui.com')}
          variant="subhead"
          className="text-primary">
          NativewindUI
        </Text>
        {' website.'}
      </Text>
    </View>
  );
}

type ComponentItem = { name: string; component: React.FC };

function keyExtractor(item: ComponentItem) {
  return item.name;
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderItem({ item }: { item: ComponentItem }) {
  return (
    <Card title={item.name}>
      <item.component />
    </Card>
  );
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <View className="px-4">
      <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
        <Text className="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
        {children}
      </View>
    </View>
  );
}

const COMPONENTS: ComponentItem[] = [
  {
    name: 'Avatar',
    component: function AvatarExample() {
      const TWITTER_AVATAR_URI =
        'https://pbs.twimg.com/profile_images/1782428433898708992/1voyv4_A_400x400.jpg';
      return (
        <View className="items-center">
          <Avatar alt="NativewindUI Avatar">
            <AvatarImage source={{ uri: TWITTER_AVATAR_URI }} />
            <AvatarFallback>
              <Text>NWUI</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      );
    },
  },

  // {
  //   name: 'Button',
  //   component: function ButtonExample() {
  //     function onPress() {
  //       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  //     }
  //     return (
  //       <View className="items-center justify-center gap-4 p-4">
  //         <Button onPress={onPress}>
  //           <Icon name="play.fill" className="ios:size-4 text-white" />
  //           <Text>Primary</Text>
  //         </Button>
  //         <Button onPress={onPress} variant="secondary">
  //           <Text>Secondary</Text>
  //         </Button>
  //         <Button onPress={onPress} variant="tonal">
  //           <Text>Tonal</Text>
  //         </Button>
  //         <Button onPress={onPress} variant="plain">
  //           <Text>Plain</Text>
  //         </Button>
  //         <Button onPress={onPress} variant="tonal" size="icon">
  //           <Icon name="heart.fill" className="ios:text-primary size-5 text-foreground" />
  //         </Button>
  //       </View>
  //     );
  //   },
  // },

  {
    name: 'Slider',
    component: function SliderExample() {
      const [sliderValue, setSliderValue] = React.useState(0.5);
      return (
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          minimumValue={0}
          maximumValue={1}
        />
      );
    },
  },

  {
    name: 'Activity Indicator',
    component: function ActivityIndicatorExample() {
      return (
        <View className="items-center p-4">
          <ActivityIndicator />
        </View>
      );
    },
  },

  {
    name: 'Action Sheet',
    component: function ActionSheetExample() {
      const { colorScheme, colors } = useColorScheme();
      const { showActionSheetWithOptions } = useActionSheet();

      return (
        <View className="items-center">
          <Button
            variant="secondary"
            onPress={async () => {
              const options = ['Delete', 'Save', 'Cancel'];
              const destructiveButtonIndex = 0;
              const cancelButtonIndex = 2;

              showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex,
                  destructiveButtonIndex,
                  containerStyle: {
                    backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                  },
                  textStyle: {
                    color: colors.foreground,
                  },
                },
                (selectedIndex) => {
                  switch (selectedIndex) {
                    case 1:
                      // Save
                      break;

                    case destructiveButtonIndex:
                      // Delete
                      break;

                    case cancelButtonIndex:
                    // Canceled
                  }
                }
              );
            }}>
            <Text>Open action sheet</Text>
          </Button>
        </View>
      );
    },
  },

  {
    name: 'Progress Indicator',
    component: function ProgressIndicatorExample() {
      const [progress, setProgress] = React.useState(13);

      React.useEffect(() => {
        let id: ReturnType<typeof setInterval> | null = null;
        if (!id) {
          id = setInterval(() => {
            setProgress((prev) => (prev >= 99 ? 0 : prev + 5));
          }, 1000);
        }
        return () => {
          if (id) clearInterval(id);
        };
      }, []);
      return (
        <View className="p-4">
          <ProgressIndicator value={progress} />
        </View>
      );
    },
  },

  {
    name: 'Activity View',
    component: function ActivityViewExample() {
      return (
        <View className="items-center">
          <Button
            variant="tonal"
            onPress={async () => {
              try {
                const result = await Share.share({
                  message: 'NativewindUI | Native feeling UI with TailwindCSS.',
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error: any) {
                Alert.alert(error.message);
              }
            }}>
            <Text>Share a message</Text>
          </Button>
        </View>
      );
    },
  },

  {
    name: 'Date Picker',
    component: function DatePickerExample() {
      const [date, setDate] = React.useState(new Date());
      return (
        <View className="items-center">
          <DatePicker
            value={date}
            mode="datetime"
            onChange={(ev) => {
              setDate(new Date(ev.nativeEvent.timestamp));
            }}
          />
        </View>
      );
    },
  },

  {
    name: 'Picker',
    component: function PickerExample() {
      const { colors } = useColorScheme();
      const [picker, setPicker] = React.useState('blue');

      return (
        <Picker selectedValue={picker} onValueChange={(itemValue) => setPicker(itemValue)}>
          <PickerItem
            label="Red"
            value="red"
            color={colors.foreground}
            style={{
              backgroundColor: colors.root,
            }}
          />
          <PickerItem
            label="Blue"
            value="blue"
            color={colors.foreground}
            style={{
              backgroundColor: colors.root,
            }}
          />
          <PickerItem
            label="Green"
            value="green"
            color={colors.foreground}
            style={{
              backgroundColor: colors.root,
            }}
          />
        </Picker>
      );
    },
  },

  //   {
  //    name: 'Text',
  //     component: function TextExample() {
  //       return (
  //        <View className="gap-2">
  //          <Text variant="largeTitle" className="text-center">
  //            Large Title
  //          </Text>
  //          <Text variant="title1" className="text-center">
  //            Title 1
  //          </Text>
  //          <Text variant="title2" className="text-center">
  //            Title 2
  //          </Text>
  //          <Text variant="title3" className="text-center">
  //            Title 3
  //          </Text>
  //          <Text variant="heading" className="text-center">
  //            Heading
  //          </Text>
  //          <Text variant="body" className="text-center">
  //            Body
  //          </Text>
  //          <Text variant="callout" className="text-center">
  //            Callout
  //          </Text>
  //          <Text variant="subhead" className="text-center">
  //            Subhead
  //          </Text>
  //          <Text variant="footnote" className="text-center">
  //            Footnote
  //          </Text>
  //          <Text variant="caption1" className="text-center">
  //            Caption 1
  //          </Text>
  //          <Text variant="caption2" className="text-center">
  //            Caption 2
  //          </Text>
  //         </View>
  //       );
  //     },
  //   },

  {
    name: 'Toggle',
    component: function ToggleExample() {
      const [switchValue, setSwitchValue] = React.useState(true);
      return (
        <View className="items-center">
          <Toggle value={switchValue} onValueChange={setSwitchValue} className="mx-auto" />
        </View>
      );
    },
  },

  {
    name: 'API Example - Users',
    component: function ApiExample() {
      const [users, setUsers] = React.useState<any[]>([]);
      const [loading, setLoading] = React.useState(false);
      const [error, setError] = React.useState<string | null>(null);

      // Fetch users from backend
      const fetchUsers = async () => {
        try {
          setLoading(true);
          setError(null);
          const data = await userService.getAll();
          setUsers(data);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch users');
          Alert.alert('Error', err.message || 'Could not connect to backend');
        } finally {
          setLoading(false);
        }
      };

      // Create a new user
      const createUser = async () => {
        try {
          setLoading(true);
          setError(null);
          const newUser = await userService.create({
            name: `User ${Date.now()}`,
            email: `user${Date.now()}@example.com`,
          });
          Alert.alert('Success', `Created user: ${newUser.name}`);
          // Refresh the list
          fetchUsers();
        } catch (err: any) {
          setError(err.message || 'Failed to create user');
          Alert.alert('Error', err.message);
        } finally {
          setLoading(false);
        }
      };

      // Load users when component mounts
      React.useEffect(() => {
        fetchUsers();
      }, []);

      return (
        <View className="gap-3">
          <View className="flex-row gap-2">
            <Button onPress={fetchUsers} disabled={loading} variant="secondary" className="flex-1">
              {loading ? <ActivityIndicator /> : <Text>Refresh</Text>}
            </Button>
            <Button onPress={createUser} disabled={loading} className="flex-1">
              {loading ? <ActivityIndicator /> : <Text>Add User</Text>}
            </Button>
          </View>

          {error && (
            <Text className="text-destructive text-center text-sm">{error}</Text>
          )}

          {users.length === 0 && !loading && !error && (
            <Text className="text-muted-foreground text-center text-sm">
              No users found. Click "Add User" to create one!
            </Text>
          )}

          {users.map((user) => (
            <View key={user.id} className="p-3 bg-muted rounded-lg">
              <Text className="font-semibold">ID: {user.id}</Text>
              {user.name && <Text>Name: {user.name}</Text>}
              {user.email && <Text>Email: {user.email}</Text>}
            </View>
          ))}
        </View>
      );
    },
  },
];
