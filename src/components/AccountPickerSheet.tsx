import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppleIcon, GoogleIcon } from '../assets/svgs';

export type AuthProvider = 'google' | 'apple';

export interface AuthAccount {
  id: string;
  name: string;
  email: string;
  color: string;
}

const ACCOUNTS: Record<AuthProvider, AuthAccount[]> = {
  google: [
    {
      id: 'google-1',
      name: 'Riddhesh Keni',
      email: 'riddhesh.keni@gmail.com',
      color: '#4285F4',
    },
    {
      id: 'google-2',
      name: 'Kadva Korp',
      email: 'hello@kadvakorp.com',
      color: '#EA4335',
    },
  ],
  apple: [
    {
      id: 'apple-1',
      name: 'Riddhesh Keni',
      email: 'riddhesh@icloud.com',
      color: '#1C1C1E',
    },
    {
      id: 'apple-2',
      name: 'Riddhesh Keni',
      email: 'riddhesh.keni@privaterelay.appleid.com',
      color: '#34C759',
    },
  ],
};

interface AccountPickerSheetProps {
  visible: boolean;
  provider: AuthProvider;
  onClose: () => void;
  onSelectAccount: (account: AuthAccount) => void;
}

export const AccountPickerSheet: React.FC<AccountPickerSheetProps> = ({
  visible,
  provider,
  onClose,
  onSelectAccount,
}) => {
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setMounted(true);
      progress.setValue(0);
      Animated.spring(progress, {
        toValue: 1,
        damping: 24,
        stiffness: 190,
        mass: 0.9,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: 0,
        duration: 190,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setMounted(false);
        }
      });
    }
  }, [visible, progress]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [440, 0],
  });
  const backdropOpacity = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.45],
  });

  const accounts = ACCOUNTS[provider];

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View
          style={[styles.backdrop, { opacity: backdropOpacity }]}
          pointerEvents="auto">
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            { paddingBottom: Math.max(insets.bottom, 16) + 12, transform: [{ translateY }] },
          ]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View style={styles.providerBadge}>
              {provider === 'google' ? (
                <GoogleIcon width={22} height={22} />
              ) : (
                <AppleIcon width={22} height={22} />
              )}
            </View>
            <View style={styles.headerText}>
              <Text style={styles.headerTitle}>Choose an account</Text>
              <Text style={styles.headerSubtitle}>to continue to UppLink</Text>
            </View>
          </View>

          <View style={styles.accountList}>
            {accounts.map(account => (
              <Pressable
                key={account.id}
                style={({ pressed }) => [
                  styles.accountRow,
                  pressed && styles.rowPressed,
                ]}
                onPress={() => onSelectAccount(account)}>
                <View style={[styles.avatar, { backgroundColor: account.color }]}>
                  <Text style={styles.avatarInitial}>
                    {account.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.accountText}>
                  <Text style={styles.accountName} numberOfLines={1}>
                    {account.name}
                  </Text>
                  <Text style={styles.accountEmail} numberOfLines={1}>
                    {account.email}
                  </Text>
                </View>
              </Pressable>
            ))}

            <View style={styles.divider} />

            <Pressable
              style={({ pressed }) => [
                styles.accountRow,
                pressed && styles.rowPressed,
              ]}
              onPress={onClose}>
              <View style={styles.addAvatar}>
                <Text style={styles.addIcon}>+</Text>
              </View>
              <Text style={styles.useAnotherText}>Use another account</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#000000',
  },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 38,
    height: 4.5,
    borderRadius: 3,
    backgroundColor: '#E3E3E3',
    marginBottom: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
  },
  providerBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 2,
  },
  accountList: {
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    paddingTop: 8,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  rowPressed: {
    backgroundColor: '#F6F6F6',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarInitial: {
    fontSize: 17,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  accountText: {
    flex: 1,
    paddingRight: 8,
  },
  accountName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.2,
  },
  accountEmail: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F2F2F2',
    marginVertical: 8,
    marginHorizontal: 8,
  },
  addAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  addIcon: {
    fontSize: 22,
    fontWeight: '400',
    color: '#8A8A8A',
    marginTop: -2,
  },
  useAnotherText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111111',
    letterSpacing: -0.2,
  },
});
