import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { bsc } from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'CST Token Sale',
  projectId: 'f6d2ff1bf1571bb0794446c9dd107328', // Get one from https://cloud.walletconnect.com/
  chains: [bsc],
  ssr: true
})
