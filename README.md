# RogersX - Miniapp de Chistes NFT

Una aplicación MiniApp de Farcaster que permite a los usuarios crear, compartir y mintear chistes como NFTs en la blockchain.

## 🚀 Características

- Generación de chistes aleatorios
- Compartir chistes en Farcaster
- Mintear chistes como NFTs
- Interfaz intuitiva y responsiva
- Integración con billeteras Web3

## 🛠️ Requisitos Previos

- Node.js 18+
- pnpm 8.x
- Una billetera Web3 (como MetaMask)
- Claves de API de Farcaster

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/rogersx-miniapp.git
   cd rogersx-miniapp
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   Luego, edita el archivo `.env.local` con tus credenciales.

4. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm dev
   ```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_CONTRACT_ADDRESS=0x13ad7149af8564b7730e45b7e0a7a9e9132bb463
# Otras variables necesarias
```

### Redes Soportadas

- Sepolia Testnet
- Optimism Mainnet
- Base Mainnet

## 🤝 Contribución

1. Haz un fork del proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Haz push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## 📧 Contacto

Tu Nombre - [@tuusuario](https://warpcast.com/tuusuario)

Enlace del Proyecto: [https://github.com/tu-usuario/rogersx-miniapp](https://github.com/tu-usuario/rogersx-miniapp)

```bash
cloudflared tunnel --url http://localhost:3000
```

Be sure to specify the correct port for your local server.

#### Set `NEXT_PUBLIC_URL` environment variable in `.env.local` file

```bash
NEXT_PUBLIC_URL=<url-from-cloudflared-or-ngrok>
```

#### Use the provided url

`cloudflared` will generate a random subdomain and print it in the terminal for you to use. Any traffic to this URL will get sent to your local server.

Enter the provided URL in the [Warpcast Embed tool](https://warpcast.com/~/developers/mini-apps/embed).

![embed-tool](https://docs.monad.xyz/img/guides/farcaster-miniapp/1.png)

Let's investigate the various components of the template.

## Customizing the Mini App Embed

Mini App Embed is how the Mini App shows up in the feed or in a chat conversation when the URL of the app is shared.

The Mini App Embed looks like this:

![embed-preview](https://docs.monad.xyz/img/guides/farcaster-miniapp/2.png)

You can customize this by editing the file `app/page.tsx`:

```js
...

const appUrl = env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/images/feed.png`, // Embed image URL (3:2 image ratio)
  button: {
    title: "Template", // Text on the embed button
    action: {
      type: "launch_frame",
      name: "Monad Farcaster MiniApp Template",
      url: appUrl, // URL that is opened when the embed button is tapped or clicked.
      splashImageUrl: `${appUrl}/images/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

...
```

You can either edit the URLs for the images or replace the images in `public/images` folder in the template.

Once you are happy with the changes, click `Refetch` in the Embed tool to get the latest configuration.

> [!NOTE]
> If you are developing locally, ensure that your Next.js app is running locally and the cloudflare tunnel is open. 


## Customizing the Splash Screen

Upon opening the Mini App, the first thing the user will see is the Splash screen:

![splash-screen](https://docs.monad.xyz/img/guides/farcaster-miniapp/3.png)

You can edit the `app/page.tsx` file to customize the Splash screen.

```js
...

const appUrl = env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `${appUrl}/images/feed.png`,
  button: {
    title: "Launch Template",
    action: {
      type: "launch_frame",
      name: "Monad Farcaster MiniApp Template",
      url: appUrl,
      splashImageUrl: `${appUrl}/images/splash.png`, // App icon in the splash screen (200px * 200px)
      splashBackgroundColor: "#f7f7f7", // Splash screen background color
    },
  },
};

...
```

For `splashImageUrl`, you can either change the URL or replace the image in `public/images` folder in the template.

## Modifying the Mini App

Upon opening the template Mini App, you should see a screen like this:

<img width="1512" alt="4" src="https://github.com/user-attachments/assets/259a3dd2-17ee-4afd-8942-ad83a92f6335" />


The code for this screen is in the `components/pages/app.tsx` file:

```tsx
export default function Home() {
  const { context } = useMiniAppContext();
  return (
    // SafeAreaContainer component makes sure that the app margins are rendered properly depending on which client is being used.
    <SafeAreaContainer insets={context?.client.safeAreaInsets}>
      {/* You replace the Demo component with your home component */}
      <Demo />
    </SafeAreaContainer>
  )
}
```

You can remove or edit the code in this file to build your Mini App.

### Accessing User Context

<img width="1130" alt="5" src="https://github.com/user-attachments/assets/4448c141-d159-4538-abda-a175d02330a7" />


Your Mini App receives various information about the user, including `username`, `fid`, `displayName`, `pfpUrl` and other fields.

The template provides a helpful hook `useMiniAppContext` that you can use to access these fields:

```js
export function User() {
    const { context } = useMiniAppContext();
    return <p>{context.user.username}</p>
}
```

The template also provide an example of the same in `components/Home/User.tsx` file.

You can learn more about Context [here](https://miniapps.farcaster.xyz/docs/sdk/context).

### Performing App Actions

![composeCast](https://docs.monad.xyz/img/guides/farcaster-miniapp/composeCast.gif)

Mini Apps have the capability to perform native actions that enhance the user experience!

Actions like:

- `addFrame`: Allows the user to save (bookmark) the app in a dedicated section
- `composeCast`: Allows the MiniApp to prompt the user to cast with prefilled text and media
- `viewProfile`: Presents a profile of a Farcaster user in a client native UI

Learn more about Mini App actions [here](https://miniapps.farcaster.xyz/docs/sdk/actions/add-frame)

The template provides an easy way to access the actions via the `useMiniAppContext` hook!

```js
const { actions } = useMiniAppContext();
```

An example for the same can be found in `components/Home/FarcasterActions.tsx` file.

### Prompting Wallet Actions

<img width="1130" alt="6" src="https://github.com/user-attachments/assets/7dc46f05-bcbb-43b4-a0e6-4f421648dfc6" />

Every user of Warpcast has a Warpcast wallet with Monad Testnet support.

**Mini Apps can prompt the user to perform onchain actions**!

The template provides an example for the same in `components/Home/WalletActions.tsx` file.

```js
export function WalletActions() {
    ...

    async function sendTransactionHandler() {
        sendTransaction({
            to: "0x7f748f154B6D180D35fA12460C7E4C631e28A9d7",
            value: parseEther("1"),
        });
    }

    ...
}
```

> [!WARNING]
> The Warpcast wallet supports multiple networks. It is recommended that you ensure that the right network is connected before prompting wallet actions.

You can use viem's `switchChain` or equivalent to prompt a chain switch.

```js
// Switching to Monad Testnet
switchChain({ chainId: 10143 });
```

The template has an example for the same in the `components/Home/WalletActions.tsx` file.
:::

## Modifying the `farcaster.json` file

When publishing the Mini App you will need to have a `farcaster.json` file that follows the specification.

You can edit the `app/.well-known/farcaster.json/route.ts` file with your app details before publishing the app!

```ts
...

const appUrl = process.env.NEXT_PUBLIC_URL;
const farcasterConfig = {
    // accountAssociation details are required to associated the published app with it's author
    accountAssociation: {
        "header": "",
        "payload": "",
        "signature": ""
    },
    frame: {
        version: "1",
        name: "Monad Farcaster MiniApp Template",
        iconUrl: `${appUrl}/images/icon.png`, // Icon of the app in the app store
        homeUrl: `${appUrl}`, // Default launch URL
        imageUrl: `${appUrl}/images/feed.png`, // Default image to show if shared in a feed.
        screenshotUrls: [], // Visual previews of the app
        tags: ["monad", "farcaster", "miniapp", "template"], // Descriptive tags for search
        primaryCategory: "developer-tools",
        buttonTitle: "Launch Template",
        splashImageUrl: `${appUrl}/images/splash.png`, // URL of image to show on loading screen.	
        splashBackgroundColor: "#ffffff", // Hex color code to use on loading screen.
    }
};

...
```

You can learn more about publishing the Mini App and other manifest properties [here](https://miniapps.farcaster.xyz/docs/guides/publishing).

## Conclusion

In this guide, you explored Farcaster Mini Apps — the simplest way to create engaging, high-retention, and easily monetizable applications!

You also discovered the key capabilities of Mini Apps and how you can use the [Monad Farcaster MiniApp Template](https://github.com/monad-developers/monad-miniapp-template) to build your own.

For more details, check out the official Mini App documentation [here](https://miniapps.farcaster.xyz/).
