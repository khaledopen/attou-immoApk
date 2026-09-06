import { BottomTabBarButtonProps } from 'expo-router/ui';
import { PlatformPressable } from 'expo-router/ui';
import * as Haptics from 'expo-haptics';

export function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          // Ajouter un retour haptique léger lors de l'appui sur les onglets.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
