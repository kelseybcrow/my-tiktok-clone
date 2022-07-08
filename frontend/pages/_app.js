import '../styles/globals.css'
import dynamic from 'next/dynamic'
import '@solana/wallet-adapter-react-ui/styles.css'
import WalletConnectionProvider from './../context/WalletConnectionProvider'

function MyApp({ Component, pageProps }) {
    const WalletConnectionProvider = dynamic(
        () => import('../context/WalletConnectionProvider'),
        { ssr: false }
    )
    return <Component {...pageProps} />
}

export default MyApp
