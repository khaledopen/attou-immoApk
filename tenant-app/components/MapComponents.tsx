import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';

let RNMapView: any = null;
let RNMarker: any = null;
let RNPolyline: any = null;

// Chargement sécurisé de react-native-maps
if (Platform.OS !== 'web') {
  try {
    const Maps = require('react-native-maps');
    RNMapView = Maps.default || Maps;
    RNMarker = Maps.Marker;
    RNPolyline = Maps.Polyline;
  } catch (e) {
    console.warn('[MapComponents] react-native-maps non disponible:', e);
  }
}

// Composant MapView sécurisé avec gestion d'erreur
class SafeMapView extends React.Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    console.warn('[MapView] Erreur de rendu:', error?.message || error);
  }

  render() {
    if (this.state.hasError || !RNMapView) {
      return (
        <View style={fallbackStyles.container}>
          <Text style={fallbackStyles.icon}>🗺️</Text>
          <Text style={fallbackStyles.title}>Carte indisponible</Text>
          <Text style={fallbackStyles.subtitle}>
            Veuillez redémarrer l'application.
          </Text>
        </View>
      );
    }
    return <RNMapView {...this.props} />;
  }
}

const SafeMarker = (props: any) => {
  if (!RNMarker) return null;
  return <RNMarker {...props} />;
};

const SafePolyline = (props: any) => {
  if (!RNPolyline) return null;
  return <RNPolyline {...props} />;
};

const fallbackStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 30,
  },
  icon: { fontSize: 60, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700', color: '#0f172a', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 22 },
});

export const MapView = SafeMapView;
export const Marker = SafeMarker;
export const Polyline = SafePolyline;
export default SafeMapView;
