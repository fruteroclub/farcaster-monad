# Documentación de Contratos Inteligentes

## Visión General

Este documento describe los contratos inteligentes utilizados en la aplicación RogersX para mintear chistes como NFTs.

## Contratos Disponibles

### 1. JokeKiosk.sol

Primera versión del contrato para mintear chistes como NFTs.

### 2. JokeKioskV2.sol

Segunda versión con mejoras en la gestión de NFTs.

### 3. JokeKioskV3.sol

Versión actual con las últimas características y optimizaciones.

---

## JokeKiosk (v3) - Especificación Técnica

### Funciones Principales

#### `safeMint`
```solidity
function safeMint(address to, string memory joke) public
```

Mintea un nuevo NFT con un chiste.

**Parámetros:**
- `to`: Dirección del propietario del NFT
- `joke`: Texto del chiste a almacenar en el NFT

**Eventos:**
- `Minted`: Emitido cuando se mintea un nuevo NFT

**Requisitos:**
- El que llama debe tener permisos de minteo
- El texto del chiste no debe estar vacío

---

### Estructura de Datos

#### NFT Metadata
```solidity
struct JokeNFT {
    uint256 id;
    string content;
    address owner;
    uint256 timestamp;
}
```

---

### Eventos

#### Minted
```solidity
event Minted(uint256 indexed tokenId, address indexed owner, string content);
```
Emitido cuando se mintea un nuevo NFT.

---

## Redes Soportadas

- **Sepolia Testnet**: `0x13ad7149af8564b7730e45b7e0a7a9e9132bb463`
- **Optimism Mainnet**: `0x...` (Por implementar)
- **Base Mainnet**: `0x...` (Por implementar)

---

## Seguridad

### Consideraciones de Seguridad

1. **Reentrancy**: Se utiliza el patrón Checks-Effects-Interactions
2. **Overflow/Underflow**: Se utiliza Solidity 0.8.x que incluye protecciones integradas
3. **Control de Acceso**: Funciones protegidas con `onlyOwner` donde es necesario

### Auditorías

- Auditoría inicial completada el 2025-08-15
- No se encontraron vulnerabilidades críticas

---

## Migración

### De v2 a v3

1. Se añadió soporte para múltiples redes
2. Se optimizó el almacenamiento
3. Se mejoró la gestión de metadatos

---

## Uso con Web3.js

```javascript
import { ethers } from 'ethers';
import JokeKioskABI from '../contracts/JokeKioskABI.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = '0x13ad7149af8564b7730e45b7e0a7a9e9132bb463';

const jokeKiosk = new ethers.Contract(
  contractAddress,
  JokeKioskABI,
  signer
);

// Mintear un nuevo chiste
async function mintJoke(jokeText) {
  const tx = await jokeKiosk.safeMint(await signer.getAddress(), jokeText);
  await tx.wait();
  console.log('NFT minteado con éxito');
}
```

---

## Preguntas Frecuentes

### ¿Cómo obtengo el historial de NFTs minteados?

Puedes consultar los eventos `Minted` usando la API de tu proveedor de nodo.

### ¿Puedo transferir mis NFTs?

Sí, los NFTs siguen el estándar ERC-721 y pueden ser transferidos libremente.

### ¿Hay algún costo por mintear?

Actualmente no hay tarifa de minteo, pero el usuario debe pagar las tarifas de gas de la red.
