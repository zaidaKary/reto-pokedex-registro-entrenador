# 📖 Pokédex & Registro de Entrenador

Aplicación móvil en React Native (Expo) con Pokédex interactiva basada en PokeAPI y sistema de registro de entrenador.

## 🎯 Características

- **Pokédex Interactiva:** Listado de Pokémon con scroll infinito (carga de 20 en 20), búsqueda en tiempo real, vista detallada con estadísticas y tipos
- **Registro de Entrenador:** Formulario multi-paso (3 pasos), validaciones con Yup, persistencia con AsyncStorage
- **UI Responsiva:** Componentes reutilizables, accesibilidad
- **Performance Optimizado:** Caché de React Query, memoización de componentes, scroll fluido

## 🛠️ Stack Tecnológico

| Área | Librería |
|------|----------|
| Framework | React Native 0.85 (Expo 56) |
| Lenguaje | TypeScript 6.0 |
| Navegación | React Navigation (Tabs + Stack) |
| Data Fetching | React Query (TanStack) |
| Formularios | React Hook Form + Yup |
| Estado Global | Zustand |
| Persistencia | AsyncStorage |
| UI | StyleSheet, Vector Icons (`Ionicons`) |
| Testing | Jest + React Native Testing Library |

## 🚀 Instalación y Uso

```bash
# Clonar e instalar
git clone <repositorio>
cd reto-pokedex-registro-entrenador
pnpm install

# Desarrollo
pnpm start       # Expo Go
pnpm android     # Android
pnpm ios         # iOS
pnpm web         # Web

# Testing
pnpm test              # Ejecutar tests
pnpm test:watch        # Modo watch
pnpm test:coverage     # Con cobertura
```

## 📁 Estructura del Proyecto

```
src/
├── api/          # Consumo de PokeAPI
├── components/   # Componentes UI reutilizables
│   ├── common/   # LoadingView, ErrorView, ScreenContainer, SearchBar, etc
│   ├── pokemon/  # PokemonCard, PokemonHeader, PokemonStatBar, PokemonTypeBadge, etc
│   └── trainer/  # FormInput, FormSelect, StepIndicator, TrainerCard, etc
├── hooks/        # Hooks personalizados
├── navigation/   # Navegadores (Root, Pokedex, Trainer)
├── screens/      # Pantallas (PokemonList, PokemonDetail, Trainer)
├── store/        # Estado global con Zustand
├── schemas/      # Esquemas de validación (Yup)
├── types/        # Tipos TypeScript
├── utils/        # Funciones utilitarias
├── constants/    # Constantes
├── styles/       # Estilos globales
└── lib/          # Configuraciones (queryClient)
```

## 🔐 Validaciones del Formulario

| Campo | Validación |
|-------|-----------|
| Nombre | Obligatorio, mín 3 caracteres, solo letras |
| Edad | Obligatoria, > 10 años |
| Email | Obligatorio, formato válido |
| Distrito | Obligatorio (seleccionar) |
| Tipo Pokémon | Obligatorio (seleccionar) |

## 💾 Persistencia

Los datos del entrenador se guardan automáticamente en AsyncStorage:
```typescript
{
  fullName: string;
  age: number;
  email: string;
  district: string;
  favoriteType: string;
}
```

## 📊 Testing

El proyecto incluye **371 tests** en **31 suites** cubriendo:
- API (PokeAPI)
- Utilidades
- Store de Zustand
- Esquemas de validación
- Hooks personalizados
- Navegadores
- Componentes

**Versión:** 1.0.0 | **Fecha:** 2026-06-30
